import React from 'react';
import OutputDisplayNoMatch from './OutputDisplayNoMatch';
import OutputDisplayEOSSpecialCase from './OutputDisplayEOSSpecialCase';
import OutputDisplayLOSSpecialCase from './OutputDisplayLOSSpecialCase';
import OutputDisplayExactMatch from './OutputDisplayExactMatch';

function OutputDisplay({ inputs, outputDisplay, setOutputInputs, carouselIndex, setCarouselIndex }) {
  if (outputDisplay.noMatch) {
    return <OutputDisplayNoMatch />
  }
  else if (inputs.os === "EOS" && inputs.pathogen === "No" && (inputs.infectionSite.size === 1 && inputs.infectionSite.has("No")) && inputs.nec === "No") {
    return <OutputDisplayEOSSpecialCase />
  }
  else if (inputs.os === "LOS" && inputs.pathogen === "No" && (inputs.infectionSite.size === 1 && inputs.infectionSite.has("No")) && inputs.nec === "No") {
    return <OutputDisplayLOSSpecialCase inputs={inputs} />
  }
  else {
    return <OutputDisplayExactMatch inputs={inputs} outputDisplay={outputDisplay} setOutputInputs={setOutputInputs} carouselIndex={carouselIndex} setCarouselIndex={setCarouselIndex} />
  }
}

export default OutputDisplay;