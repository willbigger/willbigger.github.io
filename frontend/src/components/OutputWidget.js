import React, { useState } from 'react';
import axios from "axios"; // for get request for output data

function OutputWidget({ inputs }) {

  /* These are the output we will fetch to be
  stored as state variables.
  */
  const [outputDisplay, setOutputDisplay] = useState({
    treatment: "n/a",
    treatment1: "n/a",
    treatment2: "n/a",
    treatment3: "n/a",
    treatment4: "n/a",
    duration: "n/a",
    addRecs: "n/a",
    noMatch: false, // a toggle for whether we had an output match or not
  });

   /*
  Function to retrieve the correct output from the database.
  */
  React.useEffect(() => {
    // let url = `https://dashboard.heroku.com/apps/nicu-backend-development/outputs/?time_sent=${inputs.os}&pathogen_isolated=${inputs.pathogen}&site_of_infection=${inputs.infectionSite}&abdominal_involvement=${inputs.nec}`;
   
    // TODO: WHEN THE INFECTION SITE LOGIC CHANGES, MAKE SURE THIS URL IS USING THE RIGHT INFECTION SITE
    const base_url = process.env.REACT_APP_API_LOCATION || "http://localhost:5000";
    const infectionSiteOrder = ["Peritoneal", "CSF", "Blood", "Urine", "Skin"];
        let infectionSite = "No";
        for (let i = 0; i < infectionSiteOrder.length; i++){
          if (inputs.infectionSite.includes(infectionSiteOrder[i])){
            infectionSite = infectionSiteOrder[i];
            break;
          }
        }
    let url = `${base_url}/outputs?time_sent=${inputs.os}&pathogen_isolated=${inputs.pathogen}&site_of_infection=${inputs.infectionSite}&abdominal_involvement=${inputs.nec}`;
    if (inputs.pathogen == "Yes") {
      if (inputs.nec === "Yes") {
        
        url = `${base_url}/outputs?time_sent=${inputs.os}&pathogen_isolated=${inputs.pathogenDropdownSelection}&site_of_infection=${infectionSite}&abdominal_involvement=${inputs.necDropdownSelection}`;
      } else {
        url = `${base_url}/outputs?time_sent=${inputs.os}&pathogen_isolated=${inputs.pathogenDropdownSelection}&site_of_infection=${infectionSite}&abdominal_involvement=${inputs.nec}`;
      }
    }
    axios.get(url).then((response) => {
      // console.log(response)
      if (response.data.length == 1) {
        setOutputDisplay({
          treatment: response.data[0].antibiotic_treatment,
          treatment1: response.data[0].antibiotic_treatment_1,
          treatment2: response.data[0].antibiotic_treatment_2,
          treatment3: response.data[0].antibiotic_treatment_3,
          treatment4: response.data[0].antibiotic_treatment_4,
          duration: response.data[0].antibiotic_duration,
          addRecs: response.data[0].additional_recommendations,
        });
      } else {
        setOutputDisplay({
          ...outputDisplay,
          noMatch: true,
        });

      }

    })
}, [inputs]);

  return (
    <div className="row">
      <div className="column">
        <hr />
        <hr />
        {/* Presenting what the user inputted */}
        <h1>Your Submission</h1>
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
        <h3> Time Cultures Sent</h3>
      Onset: {inputs.os === "EOS" ? "Early-Onset Sepsis ≤72h after birth" : "Late-Onset Sepsis ≥72h after birth"}
        <br />
        <h3>Pathogen Isolation</h3>
        {inputs.pathogen === "Yes" ? "Pathogen isolated: " + 
        inputs.pathogenDropdownSelection : "No pathogen isolated"}
        <br />
        <h3>Site of Infection</h3>
        {/* 
        
        TODO: 
        
        RIGHT NOW WE'RE JUST PRINTING THE FIRST SITE THAT WAS SELECTED
        WHEN THE INFECTION ISTE LOGIC IS IMPLEMENTED, CHANGE THIS


        */}
      Site identified: {inputs.infectionSite[0]}
        <br />
        <h3>Abdominal Involvement</h3>
        {inputs.nec === "Yes" ? "Abdominal involvement is present: " + 
        inputs.necDropdownSelection : "Abdominal involvement is not present"}

      </div>
      <div className="column">
        <hr />
        <hr />
        <h1> </h1>
      </div>
      <div className="column" >
        <hr />
        <hr />
        {/* The output we got from the database */}
        <h1>Recommended Treatment</h1>
        <div>
          {/* If there was not EXACT match, just put this message. */}
          <div style={{ visibility: outputDisplay.noMatch ? 'visible' : 'hidden' }}>
            There is no item in our database that matches your input. < br />
        We’re expanding our database daily. Please stay tuned for updates!

        </div>
        {/* If there was an exact match, display them. */}
        {/* 
        
        TODO:

          Fix this output so that if one the outDisplay variables is blank, 
          don't even show the header?

         */}
          <div style={{ visibility: outputDisplay.noMatch ? 'hidden' : 'visible' }}>
            <h3>Antibiotic Treatment (pending susceptibility results)</h3>
            {outputDisplay.treatment}

            <h3>Antibiotic Treatment Alternative Option 1</h3>
            {outputDisplay.treatment1}

            <h3>Antibiotic Treatment Alternative Option 2</h3>
            {outputDisplay.treatment2}

            <h3>Antibiotic Treatment Alternative Option 3</h3>
            {outputDisplay.treatment3}

            <h3>Antibiotic Treatment Alternative Option 4</h3>
            {outputDisplay.treatment4}

            <h3>Antibiotic Treatment Duration</h3>
            {outputDisplay.duration}

            <h3>Additional Recommendations</h3>
            {outputDisplay.addRecs}
          </div>
        </div>

      </div>
      <div>
        {/* No-liability statement */}
        <em>
          The contents of this website are intended for informational and educational purposes only and not for the purpose of rendering medical advice. The contents of this website are not intended to substitute for professional medical advice, diagnosis, or treatment. We cannot guarantee that the information on this website reflects the most-up-to-date research. We cannot be held responsible for any damages suffered as a result of using this website.
        </em>
      </div>

    </div>
  );
}

export default OutputWidget;