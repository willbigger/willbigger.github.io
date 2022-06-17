import baby from "./baby.jpeg";

import './FormComponentHeader.css';

function FormComponentHeader() {
  return (
    <header>
      <img className="image" src={baby} alt="" />
      <h1 className="header">Text Area Testing</h1>
    </header>
  )
}

export default FormComponentHeader;