import React from 'react';
import { useState } from 'react';
import arrow from './arrow.png'
import { Carousel} from 'react-bootstrap';
import aaa from'./aaa.png'
import narrow_b from './narrow_b.png'

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
    <div className="container">
      <div className="row" >
        <div className="col" style={{ border: '1px black solid', padding: '20px', fontSize: "larger" }} >

          {/* Presenting what the user inputted */}
          <h2 style={{ textAlign: 'center', textDecoration: "underline" }}>Your Submission</h2>
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

        <div className="col" style={{ textAlign: 'left', border: '1px black solid', padding: '20px', fontSize: "larger" }}>

          {/* The output we got from the database */}
          <h2 style={{ textDecoration: "underline", textAlign: 'center', minWidth: '400px' }}>Recommended Treatment</h2>
          <div>
            {/* If there was not EXACT match, just put this message. */}
            <div style={{ display: outputDisplay.noMatch ? 'block' : 'none', maxWidth: "500px", textAlign: 'center' }}>
              There is no item in our database that matches your input.
              We’re expanding our database daily. Please stay tuned for updates!
              Consider discussing treatment options with your neonatal, infectious disease or pharmacy teams in the meantime.
            </div>
            {/* If there was an exact match, display them. */}

            <div style={{ display: outputDisplay.noMatch ? 'none' : 'block' }}>
              <div className="container">


                    <div style={{ padding: '10px' }}>
                      <h5 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Antibiotic Treatment (pending culture or susceptibility results)</h5>
                      <p style={slidesStyle2}> {outputDisplay.treatment}</p>

                    </div>

                  <div className="col-4">

                </div>
              </div>
              {/* <div style={{ padding: '10px' }}>
                <h5 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Antibiotic Treatment (pending culture or susceptibility results)</h5>
                {outputDisplay.treatment}
              </div> */}
               <div className="container">
                <img src={narrow_b} style={{  display: "flex", alignSelf:"center"}}/>
              </div>
             
              <div className="container" display="inline-block">
                

                  <Carousel activeIndex={index} onSelect={handleSelect}>
                    <Carousel.Item style={{'height':"500px"}} >
                      <h3 style={slidesStyle1} >Antibiotic Treatment 1st Choice</h3>
                      <p style={slidesStyle2}>{outputDisplay.treatment1}</p>
                      <img src={aaa} style={{ maxHeight: "400px"}}></img>
                      <Carousel.Caption>
                        
                      </Carousel.Caption>
                    </Carousel.Item >
                    <Carousel.Item style={{'height':"500px"}} >
                      <h3 style={slidesStyle1}>Antibiotic Treatment 2nd Choice</h3>
                      <p style={slidesStyle2}>{outputDisplay.treatment2}</p>
                      <img src={aaa} style={{ maxHeight: "400px"}}></img>
                      <Carousel.Caption>
                        
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item style={{'height':"500px"}} >
                      <h3 style={slidesStyle1}>Antibiotic Treatment 3rd Choice</h3>
                      <p style={slidesStyle2}>{outputDisplay.treatment3}</p>
                      <img src={aaa} style={{ maxHeight: "400px"}}></img>
                      <Carousel.Caption>
                        
                      </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item style={{'height':"500px"}} >
                      <h3 style={slidesStyle1}>Antibiotic Treatment 4th Choice</h3>
                      <p style={slidesStyle2}>{outputDisplay.treatment4}</p>
                      <img src={aaa} style={{ maxHeight: "400px"}}></img>
                      <Carousel.Caption>
                        
                      </Carousel.Caption>
                    </Carousel.Item>

                    
                  </Carousel>
                    
                    {/*
                  
                    <div style={{ padding: '10px' }}>
                      <h5 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Antibiotic Treatment 1st Choice (if susceptible) </h5>
                      {outputDisplay.treatment1}
                    </div>


                    <div style={{ padding: '10px' }}>
                      <h5 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Antibiotic Treatment 2nd Choice (if susceptible)</h5>
                      {outputDisplay.treatment2}
                    </div>


                    <div style={{ padding: '10px' }}>
                      <h5 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Antibiotic Treatment 3rd Choice (if susceptible)</h5>
                      {outputDisplay.treatment3}
                    </div>


                    <div style={{ padding: '10px' }}>
                      <h5 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Antibiotic Treatment 4th Choice (if susceptible)</h5>
                      {outputDisplay.treatment4}
                    </div>
                    */}

                  {/*
                  <div className="col-4">
                    <img src={arrow} style={{ maxHeight: "400px"}}></img>
                  </div>
                  */}




              </div>



              <div className="container">

                    <div style={{ padding: '10px' }}>
                      <h5 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Antibiotic Treatment Duration</h5>
                      <p style={slidesStyle2}>{outputDisplay.duration}</p>
                    </div>
                    <div style={{ padding: '10px', display: outputDisplay.addRecs ? 'block' : 'none', maxWidth: "500px" }}>
                      <h5 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Additional Recommendations</h5>
                      {outputDisplay.addRecs}

                  <div className="col-4"> 
                    </div> 
                </div>
              </div>




            </div>

          </div>

        </div>

        <div>
          < hr />


        </div>

      </div>
    </div>

  );
}

export default OutputWidget;