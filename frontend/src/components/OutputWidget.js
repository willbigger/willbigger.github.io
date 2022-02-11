import React, { useState } from 'react';


function OutputWidget({ inputs, outputDisplay }) {

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
      Site identified: {inputs.infectionSite[0]}
        <br />
        <h3>Abdominal Involvement</h3>
        {inputs.nec === "Yes" ? "Abdominal involvement is present: " + inputs.necDropdownSelection : "Abdominal involvement is not present"}

      </div>
      <div className="column">
        <hr />
        <hr />
        <h1> </h1>
      </div>
      <div className="column" >
        <hr />
        <hr />
        <h1>Recommended Treatment</h1>
        <div>
          <div style={{ visibility: outputDisplay.noMatch ? 'visible' : 'hidden' }}>
            There is no item in our database that matches your input. < br />
        We’re expanding our database daily. Please stay tuned for updates!

        </div>
          <div style={{ visibility: outputDisplay.noMatch ? 'hidden' : 'visible' }}>
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

      </div>
      <div>
        <br />
        <em>
          The contents of this website are intended for informational and educational purposes only and not for the purpose of rendering medical advice. The contents of this website are not intended to substitute for professional medical advice, diagnosis, or treatment. We cannot guarantee that the information on this website reflects the most-up-to-date research. We cannot be held responsible for any damages suffered as a result of using this website.
        </em>
      </div>

    </div>
  );
}

export default OutputWidget;