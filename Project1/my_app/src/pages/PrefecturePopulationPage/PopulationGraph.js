import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

function createOptions(series) {
  return {
    title: {
      text: "人口推移（都道府県別）",
    },
    subtitle: {
      text: "1965-2045年 (5年毎)",
    },
    xAxis: {
      title: {
        text: "年度",
      },
      categories: [
        1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015,
        2020, 2025, 2030, 2035, 2040, 2045,
      ],
      gridLineWidth: 1,
      tickInterval: 3,
      crosshair: true,
    },
    yAxis: {
      title: {
        text: "人口数（万人）",
      },
      labels: {
        formatter() {
          return `${this.value / 10000}`;
        },
      },
    },
    legend: {
      layout: "proximate",
      align: "right",
      verticalAlign: "middle",
      itemStyle: {
        cursor: "default",
        fontWeight: "normal",
      },
      itemHoverStyle: {
        fontWeight: "bold",
      },
      itemMarginBottom: 4,
    },
    series: series,
  };
}

function createSeries(checkedPrefs, populations) {
  let series = [];

  if (checkedPrefs.length === 0) {
    return series;
  }
  checkedPrefs.forEach((pref) => {
    let popu_data = [];
    const cur_pref = populations[pref.prefCode];
    for (let i = 0; i < cur_pref.popuData.length; i++) {
      popu_data.push(cur_pref.popuData[i].value);
    }
    series.push({ name: pref.prefName, data: popu_data });
  });

  return series;
}

export default function PopulationGraph({ checkedPrefs, populations }) {
  const series = createSeries(checkedPrefs, populations);
  const options = createOptions(series);

  return (
    <>
      <div>
        <br></br>
        <br></br>
        <br></br>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  );
}

// function iterPopu(population) {
//   const data = [];
//   population.popuData.map((popu) => {
//     data.push(popu.value);
//   });
//   return data;
// }

// const population = [
//   {
//     prefName: "福島県",
//     prefCode: 7,
//     popuData: [
//       { year: 1960, value: 2051137 },
//       { year: 1965, value: 1983754 },
//       { year: 1970, value: 1946077 },
//       { year: 1975, value: 1970616 },
//       { year: 1980, value: 2035272 },
//       { year: 1985, value: 2080304 },
//       { year: 1990, value: 2104058 },
//       { year: 1995, value: 2133592 },
//       { year: 2000, value: 2126935 },
//       { year: 2005, value: 2091319 },
//       { year: 2010, value: 2029064 },
//       { year: 2015, value: 1914039 },
//       { year: 2020, value: 1827632 },
//       { year: 2025, value: 1733103 },
//       { year: 2030, value: 1635235 },
//       { year: 2035, value: 1533521 },
//       { year: 2040, value: 1426392 },
//       { year: 2045, value: 1314903 },
//     ],
//   },
//   {
//     prefName: "神奈川県",
//     prefCode: 14,
//     popuData: [
//       { year: 1960, value: 3443176 },
//       { year: 1965, value: 4430743 },
//       { year: 1970, value: 5472247 },
//       { year: 1975, value: 6397748 },
//       { year: 1980, value: 6924348 },
//       { year: 1985, value: 7431974 },
//       { year: 1990, value: 7980391 },
//       { year: 1995, value: 8245900 },
//       { year: 2000, value: 8489974 },
//       { year: 2005, value: 8791597 },
//       { year: 2010, value: 9048331 },
//       { year: 2015, value: 9126214 },
//       { year: 2020, value: 9141394 },
//       { year: 2025, value: 9069562 },
//       { year: 2030, value: 8933474 },
//       { year: 2035, value: 8750958 },
//       { year: 2040, value: 8541016 },
//       { year: 2045, value: 8312524 },
//     ],
//   },
// ];
