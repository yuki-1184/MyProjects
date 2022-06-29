import React from "react";
import "./CheckBox.css";

export default function Prefecture({ prefecture, togglePref }) {
  console.log("hello");
  function handleChange() {
    togglePref(prefecture.prefCode);
  }
  return (
    <div className="Prefecture">
      <input
        type="checkbox"
        onChange={handleChange}
        checked={prefecture.checked}
      />
      {prefecture.prefName}
    </div>
  );
}
