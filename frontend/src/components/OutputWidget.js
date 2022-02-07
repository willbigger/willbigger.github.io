import axios from "axios";
import React, { useState } from 'react';


function OutputWidget({ inputs }) {

  const [outputDisplay, setOutputDisplay] = useState({
    treatment: "n/a",
    treatment1: "n/a",
    treatment2: "n/a",
    treatment3: "n/a",
    treatment4: "n/a",
    duration: "n/a",
    addRecs: "n/a",
  });


  React.useEffect(() => {
    let url = `http://localhost:5000/outputs/?time_sent=${inputs.os}&pathogen_isolated=${inputs.pathogen}&site_of_infection=${inputs.infectionSite}&abdominal_involvement=${inputs.nec}`;
    axios.get(url).then((response) => console.log(response));
  }, [inputs]);
  // axios.get(url)
  //   .then(function (response) {
  //     console.log(response);
  //     setOutputDisplay.treatment = response[0];
  //     setOutputDisplay.treatment1 = response[1];
  //     setOutputDisplay.treatment2 = response[2];
  //     setOutputDisplay.treatment3 = response[3];
  //     setOutputDisplay.treatment4 = response[4];
  //     setOutputDisplay.duration = response[5];
  //     setOutputDisplay.addRecs = response[6];

  //   }, [inputs]);



  return (
    <div className="row">
      <div className="column">
        <hr />
        <hr />
        <h1>Your Submission</h1>
        <h3>Age and Weight</h3>
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
        {inputs.pathogen === "Yes" ? "Pathogen isolated: " + inputs.pathogenDropdownSelection : "No pathogen isolated"}
        <br />
        <h3>Site of Infection</h3>
        {/* Site(s) identified: {inputs.infectionSiteBlood ? <br /> : ""}{inputs.infectionSiteBlood ? "Blood " : ""}{inputs.infectionSiteUrine ? <br /> : ""}{inputs.infectionSiteUrine ? "Urine " : ""}{inputs.infectionSiteCSF ? <br /> : ""}{inputs.infectionSiteCSF ? "CSF " : ""}{inputs.infectionSitePeritoneal ? <br /> : ""}{inputs.infectionSitePeritoneal ? "Peritoneal " : ""}{inputs.infectionSiteSkin ? <br /> : ""}{inputs.infectionSiteSkin ? "Skin with Cellulitis" : ""} */}
      Site identified: {inputs.infectionSite}
        <br />
        <h3>Abdominal Involvement</h3>
        {inputs.nec === "Yes" ? "Abdominal involvement is present: " + inputs.necDropdownSelection : "Abdominal involvement is not present"}

      </div>
      <div className="column">
        <hr />
        <hr />
        <h1> | </h1>
      </div>
      <div className="column" >
        <hr />
        <hr />
        <h1>Recommended Treatment</h1>
        <h3>Antibiotic Treatment</h3>
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
  );
}

export default OutputWidget;