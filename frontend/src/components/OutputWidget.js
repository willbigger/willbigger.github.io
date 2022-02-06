import React from "react";
import axios from "axios";

function OutputWidget({ inputs }) {
  const https = require("https");

  React.useEffect(() => {
    let url = `http://localhost:5000/outputs/?time_sent${inputs.os}&pathogen_isolated=${inputs.pathogen}&site_of_infection=${inputs.infectionSiteBlood}&abdominal_involvement=${inputs.nec}`;
    axios.get(url).then((response) => console.log(response));
    
  }, [inputs])
  // const url =
  //   "https://localhost:5000/outputs/?time_sent=" + {time} + "&pathogen_isolated=" + {path} + "&site_of_infection=" + {siteBlood} + "site&abdominal_involvement=" + {infec}
  
  //   fetch(url)
  //   .then(res => res.json())
  //   .then(data => {
  //     // do something with data
  //     console.log(data)
  //   })
  //   .catch(rejected => {
  //       console.log(rejected);
  //   });
  
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
      Site(s) identified: {inputs.infectionSiteBlood ? <br /> : ""}{inputs.infectionSiteBlood ? "Blood " : ""}{inputs.infectionSiteUrine ? <br /> : ""}{inputs.infectionSiteUrine ? "Urine " : ""}{inputs.infectionSiteCSF ? <br /> : ""}{inputs.infectionSiteCSF ? "CSF " : ""}{inputs.infectionSitePeritoneal ? <br /> : ""}{inputs.infectionSitePeritoneal ? "Peritoneal " : ""}{inputs.infectionSiteSkin ? <br /> : ""}{inputs.infectionSiteSkin ? "Skin with Cellulitis" : ""}
        <br />
        <h3>Abdominal Involvement</h3>
        {inputs.nec === "Yes" ? "Abdominal involvement is present: " + inputs.necDropdownSelection : "Abdominal involvement is not present"}

      </div>
      <div className="column" >
        <hr />
        <hr />
        <h1>Recommended Treatment</h1>
        <h3>blah blah</h3>
      </div>
    </div>
  );
}

export default OutputWidget;