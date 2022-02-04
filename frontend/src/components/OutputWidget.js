import React from "react";

function OutputWidget({ gestAge, postnatAge, birthWght, currWght, time, path, pathDropdown, siteBlood, siteUrine, siteCSF, sitePeritoneal, siteSkin, infec, necDropdown }) {
  const https = require("https");

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
      Gestational Age: {gestAge} weeks
      <br />
      Postnatal Age: {postnatAge} weeks
      <br />
      Birth Weight: {birthWght} grams
      <br />
      Current Weight: {currWght} grams
      <br />
        <h3> Time Cultures Sent</h3>
      Onset: {time === "EOS" ? "Early-Onset Sepsis ≤72h after birth" : "Late-Onset Sepsis ≥72h after birth"}
        <br />
        <h3>Pathogen Isolation</h3>
        {path === "Yes" ? "Pathogen isolated: " + pathDropdown : "No pathogen isolated"}
        <br />
        <h3>Site of Infection</h3>
      Site(s) identified: {siteBlood ? <br /> : ""}{siteBlood ? "Blood " : ""}{siteUrine ? <br /> : ""}{siteUrine ? "Urine " : ""}{siteCSF ? <br /> : ""}{siteCSF ? "CSF " : ""}{sitePeritoneal ? <br /> : ""}{sitePeritoneal ? "Peritoneal " : ""}{siteSkin ? <br /> : ""}{siteSkin ? "Skin with Cellulitis" : ""}
        <br />
        <h3>Abdominal Involvement</h3>
        {infec === "Yes" ? "Abdominal involvement is present: " + necDropdown : "Abdominal involvement is not present"}

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