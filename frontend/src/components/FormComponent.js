import React, { useState } from 'react';
import OutputWidget from './OutputWidget';
import SubmitButton from './SubmitButton';

function FormComponent() {

  /* These are the inputs stored as state variables.
  We had to import { useState } to do this.
  */
  const [inputs, setInputs] = useState({
    os: "",
    pathogen: "",
    infectionSiteBlood: "",
    infectionSiteUrine: "",
    infectionSiteCSF: "",
    infectionSitePeritoneal: "",
    infectionSiteSkin: "",
    nec: "",
  });

  /*
  This is the variable 'submitted' stored as a state variable.
   */
  const [submitted, setSubmitted] = useState(false); // Initially false

  /*
  This is the variable 'valid' stored as a state variable,
  which will be used ot make sure all inputs are filled out.
   */
  const [valid, setValid] = useState(false); // Initially false

  /* 
  This is the handler for the onset variable. 
  Since only one radio button can be clicked at a time,
  we only have one toggling state variable for EOS and LOS.

  This handler is setting the 'os' state variable to whatever
  was just clicked (EOS or LOS)
  */
  const handleOS = (event) => {
    setInputs({ ...inputs, os: event.target.value })
  }

  /*
  Handler for the pathogen variable.
  Similar to the onset variable, this one
  toggles the pathogen variable between yes
  and no depending on which radio button is clicked.
  */
  const handlePathogen = (event) => {
    setInputs({ ...inputs, pathogen: event.target.value })
  }

  /*
  Handler for the infectionSite:blood variable.
  Sets 'infectionSiteBlood' state variable to true
  when the box is checked.
  */
  const handleInfectionSiteBlood = (event) => {
    setInputs({ ...inputs, infectionSiteBlood: event.target.checked })
  }

  /*
  Handler for the infectionSite:urine variable.
  Sets 'infectionSiteUrine' state variable to true
  when the box is checked.
  */
  const handleInfectionSiteUrine = (event) => {
    setInputs({ ...inputs, infectionSiteUrine: event.target.checked })
  }

  /*
  Handler for the infectionSite:CSF variable.
  Sets 'infectionSiteCSF' state variable to true
  when the box is checked.
  */
  const handleInfectionSiteCSF = (event) => {
    setInputs({ ...inputs, infectionSiteCSF: event.target.checked })
  }

  /*
  Handler for the infectionSite:peritoneal variable.
  Sets 'infectionSitePeritoneal' state variable to true
  when the box is checked.
  */
  const handleInfectionSitePeritoneal = (event) => {
    setInputs({ ...inputs, infectionSitePeritoneal: event.target.checked })
  }

  /*
  Handler for the infectionSite:skin variable.
  Sets 'infectionSiteSkin' state variable to true
  when the box is checked.
  */
  const handleInfectionSiteSkin = (event) => {
    setInputs({ ...inputs, infectionSiteSkin: event.target.checked })
  }

  /*
  Handler for the NEC variable.
  Similar to the onset and pathogen variables, 
  this one toggles the NEC variable between yes
  and no depending on which radio button is clicked.
  */
  const handleNEC = (event) => {
    setInputs({ ...inputs, nec: event.target.value })
  }

  /*
  Handler for the submit variable.
  First it prevents the automatic refresh so 
  that the user gets visual confirmation of submission.

  Then it checks that every input has been filled out 
  (for the checkbox ones, it makes sure that at least
  one selection has been made). If the form is valid, 
  it sets Valid to true.

  Then it sets Submitted to true and prints the 
  inputs in console log for us to see.
  */

  const [showResults, setResults] = useState(false); // state for displaying the output widget
  const onClick = (event) => {
    event.preventDefault(); // stops refresh
    if (inputs.os && inputs.pathogen && (inputs.infectionSiteBlood || inputs.infectionSiteUrine || inputs.infectionSiteCSF || inputs.infectionSitePeritoneal || inputs.infectionSiteSkin) && inputs.nec) {
      setValid(true)
      setResults(!showResults); // changes to display only if valid input
    }
    setSubmitted(true);
  }


  return (
    <div className="form-container">
      <form className="nicu-form" onSubmit={onClick}>
        {/* If the form has been submitted, and it's Valid, print 'Success!' at the top of the page. */}
        {submitted && valid ? <div className="success-message" style={{color:"green"}}>Success!</div> : null}
        {/* If the form is been submitted but is NOT Valid, print error message instead. */}
        {submitted && !valid ? <div className="failure-message" style={{color:"red"}}>Form is incomplete.</div> : null}

        <h2>Early-onset (EOS) or Late-onset (LOS)</h2>
        <input
          value="EOS"
          onChange={handleOS} // Event handling
          type="radio"
          className="form-field"
          name="os" />
        <label>EOS (less than 72 hours after birth) </label>

        <br />

        <input
          value="LOS"
          onChange={handleOS}
          type="radio"
          className="form-field"
          name="os"
        // Notice that these radio buttons have the same name 
        //so that only one can be selected at a time
        />
        <label>LOS (72 or more hours after birth)</label>
        <br />
        {/* If the form is submitted and the onset input is missing, print this. */}
        {submitted && !inputs.os ? <span  style={{color:"red"}}>Please specify onset conditions.</span> : null}
        <hr />

        <h2>Pathogen Isolation</h2>

        <input
          value="Yes"
          onChange={handlePathogen}
          type="radio"
          className="form-field"
          name="pathogen" />
        <label>Yes</label>

        <br />

        <input
          value="No"
          onChange={handlePathogen}
          type="radio"
          className="form-field"
          name="pathogen" />
        <label>No</label>

        <br />
        {/* If the form is submitted and pathogen isolation isn't specified, print this. */}
        {submitted && !inputs.pathogen ?  <span style={{color:"red"}}>Please specify whether the pathogen was isolated.</span> : null}
        <hr />

        <h2>Site of Infection</h2>

        <input
          value={inputs.infectionSiteBlood}
          onChange={handleInfectionSiteBlood}
          type="checkbox"
          className="form-field"
          name="infectionSiteBlood" />
        <label>Blood</label>

        <br />

        <input
          value={inputs.infectionSiteUrine}
          onChange={handleInfectionSiteUrine}
          type="checkbox"
          className="form-field"
          name="infectionSiteUrine" />
        <label>Urine</label>

        <br />

        <input
          value={inputs.infectionSiteCSF}
          onChange={handleInfectionSiteCSF}
          type="checkbox"
          className="form-field"
          name="infectionSiteCSF" />
        <label>CSF</label>

        <br />

        <input
          value={inputs.infectionSitePeritoneal}
          onChange={handleInfectionSitePeritoneal}
          type="checkbox"
          className="form-field"
          name="infectionSitePeritoneal" />
        <label>Peritoneal</label>

        <br />

        <input
          value={inputs.infectionSiteSkin}
          onChange={handleInfectionSiteSkin}
          type="checkbox"
          className="form-field"
          name="infectionSiteSkin" />
        <label>Skin</label>

        <br />
        {/* If the form is submitted and no infection site is selected, print this. */}
        {submitted && !inputs.infectionSiteBlood && !inputs.infectionSiteUrine && !inputs.infectionSiteCSF && !inputs.infectionSitePeritoneal && !inputs.infectionSiteSkin ? <span style={{color:"red"}}>Please select at least one infection site.</span> : null}
        <hr />

        <h2>NEC Present</h2>
        <input
          value="Yes"
          onChange={handleNEC}
          type="radio"
          className="form-field"
          name="nec" />
        <label>Yes</label>

        <input
          value="No"
          onChange={handleNEC}
          type="radio"
          className="form-field"
          name="nec" />
        <label>No</label>
        <br />
        {/* If the form is submitted and NEC present isn't specified, print this. */}
        {submitted && !inputs.nec ? <span style={{color:"red"}}>Please specify whether NEC is present.</span> : null}
        <br />
        <br />

        <SubmitButton onClick={onClick}/>
        {showResults && <OutputWidget time={inputs.os} 
        path={inputs.pathogen} 
        siteBlood={inputs.infectionSiteBlood} 
        siteUrine={inputs.infectionSiteUrine}
        siteCSF={inputs.infectionSiteCSF}
        sitePeritoneal={inputs.infectionSitePeritoneal}
        siteSkin={inputs.infectionSiteSkin}
        infec={inputs.nec}/>}
      </form>
    </div>
  )
};
export default FormComponent; // Exporting so that we can use in App.js