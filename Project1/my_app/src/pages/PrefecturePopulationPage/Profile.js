import React, { useState, useEffect } from "react";
import ShowPrefectures from "./ShowPrefectures";
import PopulationGraph from "./PopulationGraph";

const LOCAL_STORAGE_KEY = "pref.prefData";
const LOCAL_STORAGE_KEY2 = "popu.populationData";
const RESAS_ENDPOINT = "https://opendata.resas-portal.go.jp";

function Profile() {
  const [prefectures, setPrefectures] = useState([]);
  const [populations, setPopulations] = useState({});
  const [checkedPrefs, setCheckedPrefs] = useState([]);

  useEffect(() => {
    const storedPrefectures = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    );
    const storedPopulations = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY2)
    );
    if (storedPrefectures) {
      setPrefectures(storedPrefectures);
    }
    if (storedPopulations) {
      setPopulations(storedPopulations);
    } else {
      fetchPrefecture().then((prefData) => {
        setPrefectures(
          prefData.map((prefecture) => {
            return {
              prefName: prefecture.prefName,
              prefCode: prefecture.prefCode,
              checked: false,
            };
          })
        );
        let promises = [];
        prefData.forEach((pref) => {
          promises.push(fetchPopulation(pref.prefCode));
        });
        Promise.all(promises).then((popuData) => {
          let populations = {};
          for (let i = 0; i < prefData.length; i++) {
            populations[prefData[i].prefCode] = {
              prefName: prefData[i].prefName,
              popuData: popuData[i],
            };
          }
          setPopulations(populations);
        });
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(prefectures));
  }, [prefectures]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY2, JSON.stringify(populations));
  }, [populations]);

  useEffect(() => {
    const checkedPrefectures = prefectures.filter(
      (prefecture) => prefecture.checked
    );
    setCheckedPrefs(checkedPrefectures);
  }, [prefectures]);

  function togglePref(prefCode) {
    const newPrefectures = [...prefectures];
    const prefecture = newPrefectures.find(
      (prefecture) => prefecture.prefCode === prefCode
    );
    prefecture.checked = !prefecture.checked;
    setPrefectures(newPrefectures);
  }

  return (
    <div>
      <h1>都道府県</h1>
      <ShowPrefectures prefectures={prefectures} togglePref={togglePref} />
      <PopulationGraph checkedPrefs={checkedPrefs} populations={populations} />
    </div>
  );
}

function fetchPrefecture() {
  const url = `${RESAS_ENDPOINT}/api/v1/prefectures`;
  const request = new Request(url, {
    method: "GET",
    headers: { "X-API-KEY": "F6uHbU8bg4XP9sJBiZVGg3KL3vroy4Lyj8XLOHUE" },
  });
  return fetch(request)
    .then((response) => response.json())
    .then((data) => data.result);
}

async function fetchPopulation(prefCode) {
  const code = prefCode.toString();
  const url = `${RESAS_ENDPOINT}/api/v1/population/composition/perYear?prefCode=${code}`;
  const request = new Request(url, {
    method: "GET",
    headers: { "X-API-KEY": "F6uHbU8bg4XP9sJBiZVGg3KL3vroy4Lyj8XLOHUE" },
  });
  const response = await fetch(request);
  if (!response.ok) {
    throw new Error(`RESAS API response was not ok. status=${response.status}`);
  }
  const json = await response.json();
  if (!json.result) {
    throw new Error(
      `RESAS API result was not ok. json=${JSON.stringify(json)}`
    );
  }
  // console.log(json.result.data[0].data)
  return json.result.data[0].data;
}

export default Profile;
