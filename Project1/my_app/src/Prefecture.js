import React from 'react'

export default function Prefecture({ prefecture, togglePref }) {
    console.log("hello")
    function handleChange() {
        togglePref(prefecture.prefCode)
    }
    return (
        <div>
            <input type="checkbox" onChange={handleChange} checked={prefecture.checked} />
            {prefecture.prefName}
        </div>
    )
}