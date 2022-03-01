import React, { useState } from 'react';

function OutputWidget({ inputs, outputDisplay }) {

 /* New variables for inputs in case there were underscores
  */
 const [inputsWithSpaces, setInputsWithSpaces] = useState({
  pathDropdown: "",
  necDropdown: "",
});
  
  const fixSpaces = () => {
    if(inputs.pathogenDropdownSelection === "E_Coli") {
      setInputsWithSpaces({...inputsWithSpaces, pathDropdown: "E Coli"})
    } else if(inputs.pathogenDropdownSelection === "Group_B_Streptococcus_(GBS)") {
      setInputsWithSpaces({...inputsWithSpaces, pathDropdown: "Group B Streptococcus (GBS)"})
    } else (
      setInputsWithSpaces({...inputsWithSpaces, pathDropdown: inputs.pathogenDropdownSelection})
    )

    if(inputs.necDropdownSelection === "Medical_NEC") {
      setInputsWithSpaces({...inputsWithSpaces, necDropdown: "Medical NEC"})
    } else if(inputs.necDropdownSelection === "Surgical_NEC") {
      setInputsWithSpaces({...inputsWithSpaces, necDropdown: "Surgical NEC"})
    } else (
      setInputsWithSpaces({...inputsWithSpaces, necDropdown: inputs.necDropdownSelection})
    )
  }
  



  return (
    <div className="container" style={{ textAlign: 'center', margin: 'auto' }}>
      <div className="row" >
        <div className="column" style={{ display: 'inline-block', textAlign: 'left', border: '1px black solid', padding: '20px' }} >

          {/* Presenting what the user inputted */}
          <h1>Your Submission</h1>
          <div style={{ border: '1px solid black', padding: '10px' }}>
            <h3>Age and Weight</h3>
            {/* inputs were sent from FormComponent */}
        Gestational Age: {inputs.gestationalAge} weeks
        <br />
        Postnatal Age: {inputs.postnatalAge} weeks
        <br />
        Birth Weight: {inputs.birthWeight} grams
        <br />
        Current Weight: {inputs.currentWeight} grams
        <br />
          </div>
          <div style={{ border: '1px solid black', padding: '10px' }}>

            <h3> Time Cultures Sent</h3>
            Onset: {inputs.os === "EOS" ? "Early-Onset Sepsis ≤72h after birth" : "Late-Onset Sepsis ≥72h after birth"}
            <br />
          </div>
          <div style={{ border: '1px solid black', padding: '10px' }}>

            <h3>Pathogen Isolation</h3>
            {inputs.pathogen === "Yes" ? "Pathogen isolated: " +
              inputs.pathogenDropdownSelection : "No pathogen isolated"}
            <br />
          </div>
          <div style={{ border: '1px solid black', padding: '10px' }}>

            <h3>Site of Infection</h3>
            Site identified: {inputs.infectionSite}
            <br />
          </div>
          <div style={{ border: '1px solid black', padding: '10px' }}>

            <h3>Abdominal Involvement</h3>
            {inputs.nec === "Yes" ? "Abdominal involvement is present: " +
              inputs.necDropdownSelection : "Abdominal involvement is not present"}
          </div>
        </div>

        <div className="column" style={{ display: 'inline-block', textAlign: 'right', border: '1px black solid', padding: '20px' }}>

          {/* The output we got from the database */}
          <h1>Recommended Treatment</h1>
          <div>
            {/* If there was not EXACT match, just put this message. */}
            <div style={{ display: outputDisplay.noMatch ? 'block' : 'none' }}>
              There is no item in our database that matches your input. < br />
              We’re expanding our database daily. Please stay tuned for updates!
        </div>
            {/* If there was an exact match, display them. */}

            <div style={{ display: outputDisplay.noMatch ? 'none' : 'block' }}>

              <div style={{ border: '1px solid black', padding: '10px' }}>
                <h3>Antibiotic Treatment (pending susceptibility results):</h3>
                {outputDisplay.treatment}
              </div>


              <div style={{ border: '1px solid black', padding: '10px' }}>
                <h3>Antibiotic Treatment Alternative Option 1:</h3>
                {outputDisplay.treatment1}
              </div>


              <div style={{ border: '1px solid black', padding: '10px' }}>
                <h3>Antibiotic Treatment Alternative Option 2:</h3>
                {outputDisplay.treatment2}
              </div>


              <div style={{ border: '1px solid black', padding: '10px' }}>
                <h3>Antibiotic Treatment Alternative Option 3:</h3>
                {outputDisplay.treatment3}
              </div>


              <div style={{ border: '1px solid black', padding: '10px' }}>
                <h3>Antibiotic Treatment Alternative Option 4:</h3>
                {outputDisplay.treatment4}
              </div>


              <div style={{ border: '1px solid black', padding: '10px' }}>
                <h3>Antibiotic Treatment Duration:</h3>
                {outputDisplay.duration}
              </div>


              <div style={{ border: '1px solid black', padding: '10px' }}>
                <h3>Additional Recommendations:</h3>
                {outputDisplay.addRecs}
              </div>

            </div>
          </div>

        </div>
        <div>
          < hr />
          {/* No-liability statement */}
          <em>
            The contents of this website are intended for informational and educational purposes only and not for the purpose of rendering medical advice. The contents of this website are not intended to substitute for professional medical advice, diagnosis, or treatment. We cannot guarantee that the information on this website reflects the most-up-to-date research. We cannot be held responsible for any damages suffered as a result of using this website.
        </em>

        </div>

      </div>
    </div>

  );
}

export default OutputWidget;