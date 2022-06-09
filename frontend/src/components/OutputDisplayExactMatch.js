import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import Toggle from './Toggle';
import OutputScale from './OutputScale';
import TreatmentInfo from './TreatmentInfo';

import './OutputScale.css';

function OutputDisplayExactMatch({ inputs, outputDisplay, setOutputInputs, carouselIndex, setCarouselIndex }) {
  /* If there was an exact match, display them. */

  const handleSelect = (selectedIndex) => {
    setCarouselIndex(selectedIndex);
  };

  const susceptibilityKnown = (inputs.susceptible === "Known");

  return (
    <div>
      <Toggle
        checked={susceptibilityKnown}
        onChecked="Culture and susceptibility results known"
        onUnchecked="Pending culture or susceptibility results"
        handleChange={(checked) => {
          console.log(React.version);
          setOutputInputs({...inputs, susceptible: susceptibilityKnown ? "Pending" : "Known"});
        }}
      />

      {/* pending culture or susceptibility results */}
      <section className={susceptibilityKnown ? "d-none" : ""}>
        <h3>Antibiotic Treatment</h3>
        <p>{outputDisplay.treatment}</p>
        <TreatmentInfo treatment={outputDisplay.treatment} />
      </section>          
      
      {/* culture or susceptibility results known */}
      <section className={susceptibilityKnown ? "" : "d-none"}>
        <Carousel
          activeIndex={carouselIndex}
          controls={false}
          slide={false}
          fade={true}
          indicators={false}
          interval={null}
          wrap={false}
        >
          <Carousel.Item>
            <h3 className="choice-1">Antibiotic Treatment 1st Choice</h3>
            <p>{outputDisplay.treatment1}</p>
            <TreatmentInfo treatment={outputDisplay.treatment} />
          </Carousel.Item >
          <Carousel.Item>
            <h3 className="choice-2">Antibiotic Treatment 2nd Choice</h3>
            <p>{outputDisplay.treatment2}</p>
            <TreatmentInfo treatment={outputDisplay.treatment} />
          </Carousel.Item>
          <Carousel.Item>
            <h3 className="choice-3">Antibiotic Treatment 3rd Choice</h3>
            <p>{outputDisplay.treatment3}</p>
            <TreatmentInfo treatment={outputDisplay.treatment} />
          </Carousel.Item>
          <Carousel.Item>
            <h3 className="choice-4">Antibiotic Treatment 4th Choice</h3>
            <p>{outputDisplay.treatment4}</p>
            <TreatmentInfo treatment={outputDisplay.treatment} />
          </Carousel.Item>
        </Carousel>
        <OutputScale activeIndex={carouselIndex} onSelect={handleSelect} />
      </section>

      <section>
        <h3>Antibiotic Treatment Duration</h3>
        <p>{outputDisplay.duration}</p>
      </section>

      {outputDisplay.addRecs &&
        <section>
          <h3>Additional Recommendations</h3>
          <p>{outputDisplay.addRecs}</p>
        </section>
      }
    </div>
  )
}

export default OutputDisplayExactMatch;