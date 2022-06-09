import React from 'react';
import OutputDisplay from './OutputDisplay';

import './OutputWidget.css';

function OutputWidget({ inputs, outputDisplay, setOutputInputs, carouselIndex, setCarouselIndex }) {
  function fixSpaces(word) {
    let newWord = ""
    if (typeof (word) === "string") {
      newWord = word.replaceAll('_', ' ')
    } else {
      word.forEach(function (value) {
        if (value === "No") {
          newWord += "None"
        } else {
          newWord += value.replaceAll('_', ' ') + ", "
        }
      })
    }
    newWord = newWord.replace(/,\s*$/, "");
    return newWord
  }

  return (
    <div id="output-widget" className="container">
      {/* Presenting what the user inputted */}
      <div className="row" >
        <div className="col" >
          <h2 style={{ textAlign: 'center', textDecoration: "underline" }}>Your Submission</h2>
        </div>
      </div>
      
      <div className="row" >
        <div className="col" >
          <section>
            <h3>Age and Weight</h3>
            {/* inputs were sent from FormComponent */}
            <ul>
              <li>Gestational Age: {inputs.gestationalAge} weeks</li>
              <li>Postnatal Age: {inputs.postnatalAge} days</li>
              <li>Birth Weight: {inputs.birthWeight} grams</li>
              <li>Current Weight: {inputs.currentWeight} grams</li>
            </ul>
          </section>
          <section>
            <h3>Time Cultures Sent</h3>
            <ul>
              <li>Onset: {inputs.os === "EOS" ? "EOS ≤ 72h after birth" : "LOS ≥ 72h after birth"}</li>
            </ul>
          </section>
        </div>

        <div className="col" >
          <section>
            <h3>Pathogen Isolation</h3>
            <ul>
              <li>{inputs.pathogen !== "No" ? "Pathogen isolated: " + fixSpaces(inputs.pathogen) : "No pathogen isolated"}</li>
              <li>Susceptibility results: {inputs.susceptible === '' ? 'Pending' : fixSpaces(inputs.susceptible)}</li>
            </ul>
          </section>
          <section>
            <h3>Site of Infection</h3>
            <ul>
              <li>Site(s) identified: {fixSpaces(inputs.infectionSite)}</li>
            </ul>
          </section>
          <section>
            <h3>Abdominal Involvement</h3>
            <ul>
              <li>Abdominal involvement is {inputs.nec !== "No" ? "present: " + fixSpaces(inputs.nec) : "not present"}</li>
            </ul>
          </section>
        </div>
      </div>

      < hr />
    
      <div className="row" >
        <div className="col">
          <h2>Recommended Treatment</h2>
          <OutputDisplay inputs={inputs} outputDisplay={outputDisplay} setOutputInputs={setOutputInputs} carouselIndex={carouselIndex} setCarouselIndex={setCarouselIndex} />
        </div>
      </div>
    </div>
  );
}

export default OutputWidget;