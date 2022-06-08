import React from 'react';
import OutputDisplayNoMatch from './OutputDisplayNoMatch';
import OutputDisplayEOSSpecialCase from './OutputDisplayEOSSpecialCase';
import OutputDisplayLOSSpecialCase from './OutputDisplayLOSSpecialCase';
import OutputDisplayExactMatch from './OutputDisplayExactMatch';

function OutputDisplay({ inputs, outputDisplay, setOutputInputs }) {
  let display;
  if (outputDisplay.noMatch) {
    display = <OutputDisplayNoMatch />
  }
  else if (inputs.os === "EOS" && inputs.pathogen === "No" && (inputs.infectionSite.size === 1 && inputs.infectionSite.has("No")) && inputs.nec === "No") {
    display = <OutputDisplayEOSSpecialCase />
  }
  else if (inputs.os === "LOS" && inputs.pathogen === "No" && (inputs.infectionSite.size === 1 && inputs.infectionSite.has("No")) && inputs.nec === "No") {
    display = <OutputDisplayLOSSpecialCase inputs={inputs} />
  }
  else {
    display = <OutputDisplayExactMatch inputs={inputs} outputDisplay={outputDisplay} setOutputInputs={setOutputInputs} />
  }

  return (
    <div className="row" >
      <div className="col" style={{ textAlign: 'left' }}>
        <h2 style={{ textDecoration: "underline", textAlign: 'center', minWidth: '400px' }}>Recommended Treatment</h2>
          {display}
      </div>
    </div>
  );
}

export default OutputDisplay;