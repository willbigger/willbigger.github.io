import React from "react";
import Switch from "react-switch";

function Toggle ({ checked, onChecked, onUnchecked, handleChange }) {
  return (
    <div style={{display: 'flex', justifyContent: 'flex-end', gap: '0.5em'}}>
      <label htmlFor="toggle">{checked ? onChecked : onUnchecked}</label>
      <Switch onChange={handleChange} checked={checked} />
    </div>
  );
}

export default Toggle;