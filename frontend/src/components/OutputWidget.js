import React from 'react';
import { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import narrow_b from './narrow_b.png'
import TreatmentInfo from './TreatmentInfo';

function OutputWidget({ inputs, outputDisplay }) {

  const slidesStyle1 ={
    fontSize: 20,
    color: "black",
    textAlign: "center",
    backgroundColor: 'lightgray'
  }
  const slidesStyle2 ={
    fontSize: 20,
    color: "black",
    textAlign: "center",

  }
  const [index, setIndex] = useState(0);
  
  
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };


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

      <div className="row" >
        <div className="col" style={{ textAlign: 'left' }}>

          {/* The output we got from the database */}
          <h2 style={{ textDecoration: "underline", textAlign: 'center', minWidth: '400px' }}>Recommended Treatment</h2>
          <div>
            {/* If there was not EXACT match, just put this message. */}
            <div style={{ display: outputDisplay.noMatch ? 'block' : 'none', textAlign: 'center' }}>
              There is no item in our database that matches your input.
              We’re expanding our database daily. Please stay tuned for updates!
              Consider discussing treatment options with your neonatal, infectious disease or pharmacy teams in the meantime.
            </div>
            {/* If there was an exact match, display them. */}

            <div style={{ display: outputDisplay.noMatch ? 'none' : 'block' }}>
              {/* pending culture or susceptibility results */}
              <div className="container" style={{ display: inputs.susceptible === 'Known' ? 'none' : 'block' }}>
                <div style={{ padding: '10px' }}>
                  <h5 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Antibiotic Treatment</h5>
                  <p style={slidesStyle2}> {outputDisplay.treatment}</p>
                  <TreatmentInfo />
                </div>
              </div>          
              
              {/* susceptibility results known */}
              <div className="container" style={{ display: inputs.susceptible === 'Known' ? 'inline-block' : 'none' }}>
                <img src={narrow_b} style={{ maxWidth: "100%", margin: "auto" }}/>
              </div>

              <div className="container" style={{ display: inputs.susceptible === 'Known' ? 'inline-block' : 'none' }}>
                <Carousel activeIndex={index} onSelect={handleSelect}>
                  <Carousel.Item style={{paddingBottom: "10px"}} >
                    <h3 style={slidesStyle1} >Antibiotic Treatment 1st Choice</h3>
                    <p style={slidesStyle2}>{outputDisplay.treatment1}</p>
                    <TreatmentInfo />
                    <Carousel.Caption>
                      
                    </Carousel.Caption>
                  </Carousel.Item >
                  <Carousel.Item style={{paddingBottom: "10px"}} >
                    <h3 style={slidesStyle1}>Antibiotic Treatment 2nd Choice</h3>
                    <p style={slidesStyle2}>{outputDisplay.treatment2}</p>
                    <TreatmentInfo />
                    <Carousel.Caption>
                      
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item style={{paddingBottom: "10px"}} >
                    <h3 style={slidesStyle1}>Antibiotic Treatment 3rd Choice</h3>
                    <p style={slidesStyle2}>{outputDisplay.treatment3}</p>
                    <TreatmentInfo />
                    <Carousel.Caption>
                      
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item style={{paddingBottom: "10px"}} >
                    <h3 style={slidesStyle1}>Antibiotic Treatment 4th Choice</h3>
                    <p style={slidesStyle2}>{outputDisplay.treatment4}</p>
                    <TreatmentInfo />
                    <Carousel.Caption>
                      
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </div>
              <div className="container">
                <div style={{ padding: '10px' }}>
                  <h5 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Antibiotic Treatment Duration</h5>
                  <p style={slidesStyle2}>{outputDisplay.duration}</p>
                </div>
                <div style={{ padding: '10px', display: outputDisplay.addRecs ? 'block' : 'none'}}>
                  <h5 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Additional Recommendations</h5>
                  {outputDisplay.addRecs}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>

  );
}

export default OutputWidget;