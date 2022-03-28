import React, { useState } from 'react';
import arrow from './arrow.png'

function OutputWidget({ inputs, outputDisplay }) {

  /* New variables for inputs in case there were underscores
   */
  const [inputsWithSpaces, setInputsWithSpaces] = useState({
    pathDropdown: "",
    necDropdown: "",
  });

  function fixSpaces(word) {
    let newWord = ""
    console.log("word length", word.length)
    if (typeof(word) === "string") {
      console.log(word, "is a string")
      for (let i = 0; i < word.length; i++) {
        if (word[i] === "_") {
          newWord += " "
        } else {
          newWord += word[i]
        }
      }
    } else {
      for(let i = 0; i < word.length; i++){
        let wordInArray = ""
        for(let letter = 0; letter < word[i].length; letter++) {
          if (word[i][letter] === "_" ) {
            wordInArray += " "
          } else {
            wordInArray += word[i][letter]
          }
        }
        newWord += wordInArray + ", "
      }
      newWord = newWord.replace(/,\s*$/, "");
    }
    if (word[0] === "No") {
      newWord = "None"
    }
    // console.log("old word", word, "new word:", newWord)
    return newWord
  }



  return (
    //  class="d-flex flex-column min-vh-100 align-items-center"
    // style={{ display: "block", margin: 'auto', marginBottom: "25px" }}
    <div className="container">
      <div className="row" >
        <div className="col" style={{ border: '1px black solid', padding: '20px' }} >

          {/* Presenting what the user inputted */}
          <h4 style={{ textAlign: 'center', textDecoration: "underline" }}>Your Submission</h4>
          <div style={{ padding: '10px', textAlign: "left" }}>
            <h6 style={{ backgroundColor: 'lightgray', textAlign: "center" }}>Age and Weight</h6>
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
          <div style={{ padding: '10px', textAlign: "left" }}>

            <h6 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}> Time Cultures Sent</h6>
            Onset: {inputs.os === "EOS" ? "Early-Onset Sepsis ≤72h after birth" : "Late-Onset Sepsis ≥72h after birth"}
            <br />
          </div>
          <div style={{ padding: '10px', textAlign: "left" }}>

            <h6 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Pathogen Isolation</h6>
            {inputs.pathogen === "Yes" ? "Pathogen isolated: " +
              fixSpaces(inputs.pathogenDropdownSelection) : "No pathogen isolated"}
            <br />
          </div>
          <div style={{ padding: '10px', textAlign: "left" }}>

            <h6 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Site of Infection</h6>
            Site(s) identified: {fixSpaces(inputs.infectionSite)}
            <br />
          </div>
          <div style={{ padding: '10px', textAlign: "left" }}>

            <h6 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Abdominal Involvement</h6>
            {inputs.nec === "Yes" ? "Abdominal involvement is present: " +
              fixSpaces(inputs.necDropdownSelection) : "Abdominal involvement is not present"}
          </div>
        </div>

        <div className="col" style={{ textAlign: 'left', border: '1px black solid', padding: '20px' }}>

          {/* The output we got from the database */}
          <h4 style={{ textDecoration: "underline", textAlign: 'center' }}>Recommended Treatment</h4>
          <div>
            {/* If there was not EXACT match, just put this message. */}
            <div style={{ display: outputDisplay.noMatch ? 'block' : 'none', maxWidth: "500px", textAlign: 'center' }}>
              There is no item in our database that matches your input.
              We’re expanding our database daily. Please stay tuned for updates!
              Consider discussing treatment options with infectious disease or pharmacy teams in the meantime.
            </div>
            {/* If there was an exact match, display them. */}

            <div style={{ display: outputDisplay.noMatch ? 'none' : 'block' }}>

              <div style={{ padding: '10px' }}>
                <h6 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Antibiotic Treatment (pending susceptibility results)</h6>
                {outputDisplay.treatment}
              </div>
              <div className="container" dispaly="inline-block">
                <div className="row">
                  <div className="col">
                    <div style={{ padding: '10px' }}>
                      <h6 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Antibiotic Treatment Option 1</h6>
                      {outputDisplay.treatment1}
                    </div>


                    <div style={{ padding: '10px' }}>
                      <h6 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Antibiotic Treatment Option 2</h6>
                      {outputDisplay.treatment2}
                    </div>


                    <div style={{ padding: '10px' }}>
                      <h6 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Antibiotic Treatment Option 3</h6>
                      {outputDisplay.treatment3}
                    </div>


                    <div style={{ padding: '10px' }}>
                      <h6 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Antibiotic Treatment Option 4</h6>
                      {outputDisplay.treatment4}
                    </div>


                    <div style={{ padding: '10px' }}>
                      <h6 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Antibiotic Treatment Duration</h6>
                      {outputDisplay.duration}
                    </div>
                  </div>
                  <div className="col">
                    <img src={arrow} style={{ height: "375px", width: "auto" }}></img>
                  </div>

                </div>
              </div>




              <div style={{ padding: '10px', display: outputDisplay.addRecs ? 'block' : 'none', maxWidth: "500px" }}>
                <h6 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Additional Recommendations</h6>
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