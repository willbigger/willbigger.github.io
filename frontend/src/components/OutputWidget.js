import React from 'react';
import OutputDisplay from './OutputDisplay';

function OutputWidget({ inputs, outputDisplay, setOutputInputs }) {
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
    <div className="container" style={{ border: '1px black solid', padding: '20px', fontSize: "larger" }}>
      {/* Presenting what the user inputted */}
      <div className="row" >
        <div className="col" >
          <h2 style={{ textAlign: 'center', textDecoration: "underline" }}>Your Submission</h2>
        </div>
      </div>
      
      <div className="row" >
        <div className="col" >
          <div style={{ padding: '10px', textAlign: "left" }}>
            <h5 style={{ backgroundColor: 'lightgray', textAlign: "center" }}>Age and Weight</h5>
            {/* inputs were sent from FormComponent */}
            Gestational Age: {inputs.gestationalAge} weeks
            <br />
            Postnatal Age: {inputs.postnatalAge} days
            <br />
            Birth Weight: {inputs.birthWeight} grams
            <br />
            Current Weight: {inputs.currentWeight} grams
            <br />
          </div>
          <div style={{ padding: '10px', textAlign: "left" }}>

            <h5 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}> Time Cultures Sent</h5>
            Onset: {inputs.os === "EOS" ? "EOS ≤ 72h after birth" : "LOS ≥ 72h after birth"}
            <br />
          </div>
        </div>

        <div className="col" >
          <div style={{ padding: '10px', textAlign: "left" }}>

            <h5 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Pathogen Isolation</h5>
            {inputs.pathogen !== "No" ? "Pathogen isolated: " +
              fixSpaces(inputs.pathogen) : "No pathogen isolated"}
            <br />
            Susceptibility results: {inputs.susceptible === '' ? 'Pending' : fixSpaces(inputs.susceptible)}
            <br />
          </div>
          <div style={{ padding: '10px', textAlign: "left" }}>

            <h5 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Site of Infection</h5>
            Site(s) identified: {fixSpaces(inputs.infectionSite)}
            <br />
          </div>
          <div style={{ padding: '10px', textAlign: "left" }}>

            <h5 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Abdominal Involvement</h5>
            {inputs.nec !== "No" ? "Abdominal involvement is present: " +
              fixSpaces(inputs.nec) : "Abdominal involvement is not present"}
          </div>
        </div>
      </div>

      <div>
        < hr />
      </div>

      <OutputDisplay inputs={inputs} outputDisplay={outputDisplay} setOutputInputs={setOutputInputs} />

    </div>

  );
}

export default OutputWidget;