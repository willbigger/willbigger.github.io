import React, { useState } from 'react';

function FormComponent() {

  /* These are the inputs stored as state variables.
  We had to import { useState } to do this.
  */
  const [inputs, setInputs] = useState({
    os: "",
    datetime: "",
    cultureSentBlood: "",
    cultureSentUrine: "",
    cultureSentCSF: "",
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
  Handler for the datetime variable.
  Sets 'datetime' state variable to what was inputted 
  by the user.
  */
  const handleDateTime = (event) => {
    setInputs({ ...inputs, datetime: event.target.value })
  }

  /*
  Handler for the cultureSent:blood variable.
  Sets 'cultureSentBlood' state variable to true
  when the box is checked.
  */
  const handleCultureSentBlood = (event) => {
    setInputs({ ...inputs, cultureSentBlood: event.target.checked })
  }

  /*
  Handler for the cultureSent:urine variable.
  Sets 'cultureSentUrine' state variable to true
  when the box is checked.
  */
  const handleCultureSentUrine = (event) => {
    setInputs({ ...inputs, cultureSentUrine: event.target.checked })
  }

  /*
  Handler for the cultureSent:CSF variable.
  Sets 'cultureSentCSF' state variable to true
  when the box is checked.
  */
  const handleCultureSentCSF = (event) => {
    setInputs({ ...inputs, cultureSentCSF: event.target.checked })
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
  const handleSubmit = (event) => {
    event.preventDefault(); // stops refresh
    if (inputs.os && inputs.datetime && (inputs.cultureSentBlood || inputs.cultureSentUrine || inputs.infectionSiteCSF) && inputs.pathogen && (inputs.infectionSiteBlood || inputs.infectionSiteUrine || inputs.infectionSiteCSF || inputs.infectionSitePeritoneal || inputs.infectionSiteSkin) && inputs.nec) {
      setValid(true)
    }
    setSubmitted(true);
    console.log(inputs)
  }



  return (
    <div className="form-container">
      <h1>Evaluation Criteria</h1>

      <form className="nicu-form" onSubmit={handleSubmit}>
        {/* If the form has been submitted, and it's Valid, print 'Success!' at the top of the page. */}
        {submitted && valid ? <div className="success-message">Success!</div> : null}
        {/* If the form is been submitted but is NOT Valid, print error message instead. */}
        {submitted && !valid ? <div className="failure-message">Form is incomplete.</div> : null}

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
        {submitted && !inputs.os ? <span>Please specify onset conditions.</span> : null}
        <hr />

        <h2>Date and Time of Culture</h2>

        <input
          value={inputs.datetime}
          onChange={handleDateTime}
          type="datetime-local"
          className="form-field"
          name="datetime" />
        <br />
        {/* If the form is submitted and the datetime input is missing, print this. */}
        {submitted && !inputs.datetime ? <span>Please provide the date and time when the cultures were sent.</span> : null}
        <hr />

        <h2>Cultures Sent</h2>

        <input
          value={inputs.cultureSentBlood}
          onChange={handleCultureSentBlood}
          type="checkbox"
          className="form-field"
          name="cultureSentBlood" />
        <label>Blood</label>

        <br />

        <input
          value={inputs.cultureSentUrine}
          onChange={handleCultureSentUrine}
          type="checkbox"
          className="form-field"
          name="cultureSentUrine" />
        <label>Urine</label>

        <br />

        <input
          value={inputs.cultureSentCSF}
          onChange={handleCultureSentCSF}
          type="checkbox"
          className="form-field"
          name="cultureSentCSF" />
        <label>CSF</label>

        <br />
        {/* If the form is submitted and no culture type is selected, print this. */}
        {submitted && !inputs.cultureSentBlood && !inputs.cultureSentUrine && !inputs.cultureSentCSF ? <span>Please select at least one type of culture.</span> : null}
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
        {submitted && !inputs.pathogen ? <span>Please specify whether the pathogen was isolated.</span> : null}
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
        {submitted && !inputs.infectionSiteBlood && !inputs.infectionSiteUrine && !inputs.infectionSiteCSF && !inputs.infectionSitePeritoneal && !inputs.infectionSiteSkin ? <span>Please select at least one infection site.</span> : null}
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
        {submitted && !inputs.nec ? <span>Please specify whether NEC is present.</span> : null}
        <br />
        <br />

        <input
          value={inputs.submit}
          onChange={handleSubmit}
          type="submit"
          className="form-field"
          name="submit"
        />
      </form>
    </div>
  )
};
export default FormComponent; // Exporting so that we can use in App.js