import React from "react";
import Prefecture from "./Prefecture";

export default function ShowPrefectures({ prefectures, togglePref }) {
  return prefectures.map((prefecture) => {
    return (
      <Prefecture
        key={prefecture.prefName}
        prefecture={prefecture}
        togglePref={togglePref}
      />
    );
  });
}
