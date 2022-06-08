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

  return display;
}

export default OutputDisplay;