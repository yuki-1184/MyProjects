import React, { useState, useEffect } from 'react'
import ShowPrefectures from './ShowPrefectures';

const LOCAL_STORAGE_KEY = "pref.prefData"

function App() {
  const [prefectures, setPrefectures] = useState([])
  const [status, setStatus] = useState({ status_title: "idle", prefectures: null })

  useEffect(() => {
    const storedPrefectures = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedPrefectures) {
      setPrefectures(storedPrefectures)
    } else {
      fetchAPI().then(
        prefData => (
          setPrefectures(prefData.map(prefecture => {
            return {
              prefName: prefecture.prefName,
              prefCode: prefecture.prefCode,
              checked: false
            }
          }
          ))
        )
      )
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(prefectures))
  }, [prefectures])

  // useEffect(() => {
  //   fetchAPI().then(
  //     prefData => (
  //       setPrefectures(prefData.map(prefecture => {
  //         return {
  //           prefName: prefecture.prefName,
  //           prefCode: prefecture.prefCode,
  //           checked: false
  //         }
  //       }
  //       ))
  //     )
  //   )
  // }, [])

  function togglePref(prefCode) {
    const newPrefectures = [...prefectures]
    const prefecture = newPrefectures.find(prefecture => prefecture.prefCode === prefCode)
    prefecture.checked = !prefecture.checked
    setPrefectures(newPrefectures)
  }

  return (
    <div>
      <h1>都道府県</h1>
      <ShowPrefectures prefectures={prefectures} togglePref={togglePref} />
      {prefectures.prefName}
    </div>
  )
}

function fetchAPI() {
  const url = "https://opendata.resas-portal.go.jp/api/v1/prefectures";
  const request = new Request(url, {
    method: 'GET',
    headers: { "X-API-KEY": "F6uHbU8bg4XP9sJBiZVGg3KL3vroy4Lyj8XLOHUE" }
  })
  return fetch(request)
    .then(response => response.json())
    .then(data => data.result)
}

export default App;