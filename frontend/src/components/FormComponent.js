import React, { useState } from 'react';
import OutputWidget from './OutputWidget';
// import Waiting from './Waiting';
import SubmitButton from './SubmitButton';
import ClearButton from './ClearButton';
import axios from "axios"; // for get request for output data

import './FormComponent.css';


function FormComponent() {

  /* These are the inputs stored as state variables.
  We had to import { useState } to do this.
  */
  const [inputs, setInputs] = useState({
    gestationalAge: "",
    postnatalAge: "",
    birthWeight: "",
    currentWeight: "",
    os: "",
    pathogen: "",
    infectionSite: new Set(),
    bloodDropdownSelection: "",
    nec: "",
  });

  /* These are the output we will fetch to be
stored as state variables.
*/
  const [outputDisplay, setOutputDisplay] = useState({
    treatment: "",
    treatment1: "",
    treatment2: "",
    treatment3: "",
    treatment4: "",
    duration: "",
    addRecs: "",
    noMatch: false, // a toggle for whether we had an output match or not
  });

  /* State variable to specify validity and submission
  status of the form
  */
  const [status, setStatus] = useState('initial');
  /*
  This is the variable 'submitted' stored as a state variable.
   */
  // const [submitted, setSubmitted] = useState(false); // Initially false

  /*
  This is a toggle for the pathogen input to determine whether to display the dropdown.
   */
  const [pathogenToggle, setPathogenToggle] = useState(false); // Initially false

  /*
  This is a toggle for the blood site of infection input to determine whether to display the dropdown.
   */
  const [bloodToggle, setBloodToggle] = useState(false); // Initially false

  /*
  This is a toggle for the abdominal involvement input to determine whether to display the dropdown.
   */
  const [necToggle, setnecToggle] = useState(false); // Initially false

  // /*
  // This is the variable 'valid' stored as a state variable,
  // which will be used to make sure all inputs are filled out.
  //  */
  // const [valid, setValid] = useState(false); // Initially false

  /*
  Handler for the pathogen variable.
  Similar to the onset variable, it
  toggles the pathogen variable between yes
  and no depending on which radio button is clicked.
  */
  const handlePathogen = (event) => {
    setInputs({ ...inputs, pathogen: event.target.value })
    if (event.target.value === "Yes") {
      setPathogenToggle(true)
    }
    else {
      setPathogenToggle(false)
    }
  }

  /*
  Handler for the infectionSite array. If the checked
  item isn't already in the array, it gets pushed on.
  */
  const handleInfectionSite = (event) => {
    if (event.target.checked) {
      inputs.infectionSite.add(event.target.value)
      if (event.target.value === "Blood") {
        setBloodToggle(true)
      }
    }
  }

  /*
   Handler for the blood dropdown selection visibility.
   */
  const handleBloodSelection = (event) => {
    setInputs({ ...inputs, bloodDropdownSelection: event.target.value })
  }

  /*
  Handler for the NEC variable.
  Toggles the NEC variable between yes
  and no depending on which radio button is clicked.
  */
  const handleNEC = (event) => {
    setInputs({ ...inputs, nec: event.target.value })
    if (event.target.value === "Yes") {
      setnecToggle(true)
    }
    else {
      setnecToggle(false)
    }
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
  // const [showResults, setShowResults] = useState(false); // state for displaying the output widget
  // const [showWaiting, setShowWaiting] = useState(false); // waiting state

  const onClick = (event) => {

    if (inputs.gestationalAge && inputs.postnatalAge && inputs.birthWeight && inputs.currentWeight && inputs.os && (inputs.pathogen != "Yes" && inputs.pathogen) && (inputs.infectionSite.size !== 0) && inputs.nec != "Yes" && inputs.nec) {
      event.preventDefault(); // stops refresh

      // creating the right URL to go to
      const base_url = process.env.REACT_APP_API_LOCATION || "http://localhost:5000";
      const infectionSiteOrder = ["Peritoneal", "CSF", "Blood", "Urine", "Skin_with_Cellulitis"];
      let infectionSite = "No";
      for (let i = 0; i < infectionSiteOrder.length; i++) {
        if (inputs.infectionSite.has(infectionSiteOrder[i])) {
          infectionSite = infectionSiteOrder[i];
          break;
        }
      }
      let url = `${base_url}/outputs?time_sent=${inputs.os}&pathogen_isolated=${inputs.pathogen}&site_of_infection=${infectionSite}&abdominal_involvement=${inputs.nec}`;


      const object = {
        ['gestational_age']: inputs.gestationalAge,
        ['postnatal_age']: inputs.postnatalAge,
        ['birth_weight']: inputs.birthWeight,
        ['current_weight']: inputs.currentWeight,
        ['time_sent']: inputs.os,
        ['pathogen_isolated']: inputs.pathogen,
        ['site_of_infection']: infectionSite,
        ['abdominal_involvement']: inputs.nec,
      };

      if (infectionSite === "Blood") {
        if (inputs.bloodDropdownSelection === "CSF Negative") {
          url = `${base_url}/outputs?time_sent=EOS&pathogen_isolated=E_Coli&site_of_infection=Blood&abdominal_involvement=No`;

          const object = {
            ['gestational_age']: inputs.gestationalAge,
            ['postnatal_age']: inputs.postnatalAge,
            ['birth_weight']: inputs.birthWeight,
            ['current_weight']: inputs.currentWeight,
            ['time_sent']: "EOS",
            ['pathogen_isolated']: "E_Coli",
            ['site_of_infection']: "Blood",
            ['abdominal_involvement']: "No",
          };

        } else if (inputs.bloodDropdownSelection === "CSF Pending") {
          url = `${base_url}/outputs?time_sent=${inputs.os}&pathogen_isolated=${inputs.pathogen}&site_of_infection=CSF&abdominal_involvement=No`;

          const object = {
            ['gestational_age']: inputs.gestationalAge,
            ['postnatal_age']: inputs.postnatalAge,
            ['birth_weight']: inputs.birthWeight,
            ['current_weight']: inputs.currentWeight,
            ['time_sent']: "EOS",
            ['pathogen_isolated']: "E_Coli",
            ['site_of_infection']: "CSF",
            ['abdominal_involvement']: "No",
          };
        }
      }

      console.log("final url", url)

      // setValid(true)
      // setShowWaiting(true)
      setStatus('loading')

      const post_url = `${base_url}/create-output`;
      axios.post(post_url, object).then((response) => console.log(response));

      axios.get(url).then((response) => {
        if (response.data.length == 1) {
          // setShowWaiting(false)
          setStatus('loaded')
          // setShowResults(true); // changes to display only if valid input
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
          setStatus('loaded')
          setOutputDisplay({
            ...outputDisplay,
            noMatch: true,
          });
        }

      })
    } else {
      setStatus('invalid')
    }

  }


  /*
  Handler for clicking the Clear button.
  First it prevents the automatic refresh so 
  that the user gets visual confirmation of submission.
   
  Then it resets Valid, Results, and Submitted and resets
  the form. It also sets all the inputs back to empty
  strings/arrays.
  */
  const onClear = (event) => {
    // event.preventDefault(); // stops refresh
    // setValid(false);
    // setShowResults(false);
    // setShowWaiting(false);
    // setSubmitted(false);
    setStatus('initial')
    setPathogenToggle(false);
    setnecToggle(false);
    document.getElementById("input-form").reset();
    inputs.infectionSite.clear()
    document.querySelectorAll('input[type="checkbox"]')
      .forEach(el => el.checked = false);

    
    inputs.gestationalAge = ""
    inputs.postnatalAge = ""
    inputs.antibiotic_duration = ""
    inputs.birthWeight = ""
    inputs.currentWeight = ""
    inputs.os = ""
    inputs.pathogen = ""
    inputs.bloodDropdownSelection = ""
    inputs.nec = ""
    

    outputDisplay.treatment = ""
    outputDisplay.treatment1 = ""
    outputDisplay.treatment2 = ""
    outputDisplay.treatment3 = "" 
    outputDisplay.treatment4 = ""
    outputDisplay.duration = ""
    outputDisplay.addRecs = ""
    outputDisplay.noMatch = false
    
    console.log('inputs and outputs after clear', inputs, outputDisplay)

  }


  return (
    <div className="form-container container d-flex flex-column min-vh-100 align-items-center" style={{ justifyContent: 'center', display: 'flex', marginBottom: "100px" }}>

      <form className="nicu-form" id="input-form" onSubmit={onClick} style={{ fontSize: "smaller" }}>
        <h4 style={{ textAlign: "center" }}>Age and Weight</h4>
        <label className="form-field">Gestational Age (in weeks)</label>

        <br />
        {/* Gestational Age input */}
        <input
          textAlign={'center'}
          value={inputs.gestationalAge}
          onChange={(event) => setInputs({ ...inputs, gestationalAge: event.target.value })}
          type="text"
          className="form-field"
          name="gestationalAge"
        />
        <br />
        {/* Providing an error message if the user tries to submit 
        while the Gestational Age input is empty */}
        {(status === 'invalid') && !inputs.gestationalAge ?
          <span style={{ color: "red" }}> Please fill in this field. </span> : null}

        <br />
        <label className="form-field">Postnatal Age (in days)</label>

        <br />
        {/* Postnatal Age input */}
        <input
          value={inputs.postnatalAge}
          onChange={(event) => setInputs({ ...inputs, postnatalAge: event.target.value })}
          type="text"
          className="form-field"
          name="postnatalAge"
        />
        < br />
        {/* Providing an error message if the user tries to submit 
        while the Postnatal Age input is empty */}
        {(status === 'invalid') && !inputs.postnatalAge ?
          <span style={{ color: "red" }}>Please fill in this field.</span> : null}

        <br />
        <label className="form-field">Birth Weight (in grams)</label>
        <br />
        {/* Birth Weight input */}
        <input
          value={inputs.birthWeight}
          onChange={(event) => setInputs({ ...inputs, birthWeight: event.target.value })}
          type="text"
          className="form-field"
          name="birthWeight"
        />
        <br />
        {/* Providing an error message if the user tries to submit 
        while the Birth Weight input is empty */}
        {(status === 'invalid') && !inputs.birthWeight ?
          <span style={{ color: "red" }}>Please fill in this field.</span> : null}

        <br />
        <label className="form-field">Current Weight (in grams)</label>

        <br />
        {/* Current Weight input */}
        <input
          value={inputs.currentWeight}
          onChange={(event) => setInputs({ ...inputs, currentWeight: event.target.value })}
          type="text"
          className="form-field"
          name="currentWeight"
        />
        <br />
        {/* Providing an error message if the user tries to submit 
        while the Current Weight input is empty */}
        {(status === 'invalid')  && !inputs.currentWeight ?
          <span style={{ color: "red" }}>Please fill in this field.</span> : null}

        <hr />

        <h4 style={{ textAlign: "center" }}>Early-Onset (EOS) or Late-Onset (LOS) Sepsis</h4>
        {/* EOS/LOS input option 1: EOS */}
        <input
          value="EOS"
          onChange={(event) => setInputs({ ...inputs, os: event.target.value })}
          type="radio"
          className="form-field"
          name="os" />
        {' '}<label className="form-field">EOS (less than 72 hours after birth) </label>

        <br />

        {/* EOS/LOS input option 2: LOS */}
        <input
          value="LOS"
          onChange={(event) => setInputs({ ...inputs, os: event.target.value })}
          type="radio"
          className="form-field"
          name="os"
        // Notice that these radio buttons have the same name 
        //so that only one can be selected at a time
        />
        {' '}<label className="form-field">LOS (72 or more hours after birth)</label>
        <br />
        {/* If the form is submitted and the onset input is missing, print this. */}
        {(status === 'invalid')  && !inputs.os ?
          <span style={{ color: "red" }}>Please fill in this field.</span> : null}
        <hr />

        <h4 style={{ textAlign: "center" }}>Pathogen Isolated</h4>
        <h6 style={{ textAlign: "center" }}>(can enter Gram stain or specific species)</h6>
        {/* Pathogen input */}
        <div className="container">
          <div className="row">
            <div className="col">
              {/* pathogen input option 1: Yes */}
              <input
                value="Yes"
                onChange={handlePathogen}
                type="radio"
                className="form-field"
                name="pathogen" />
              {' '}<label className="form-field">Yes</label>
            </div>
            <div className="col">
              {/* If yes is selected for the pathogen input, show this dropdown */}
              <input
                className="form-control"
                list="datalistOptions" id="form-control"
                placeholder="Type to search..."
                onChange={(event) => setInputs({ ...inputs, pathogen: event.target.value.replaceAll(' ', '_') })}
                style={{ display: pathogenToggle ? 'block' : 'none' }} />
              <datalist id="datalistOptions">
                <option value=""></option>
                <option value="E Coli">E Coli</option>
                <option value="Klebsiella">Klebsiella</option>
                <option value="CoNS">CoNS</option>
                <option value="Group B Streptococcus (GBS)">Group B Streptococcus (GBS)</option>
                <option value="GBS">GBS</option>
                <option value="MSSA">MSSA</option>
                <option value="MRSA">MRSA</option>
                <option value="Pseudomonas">Pseudomonas</option>
                <option value="Enterobacter">Enterobacter</option>
                <option value="Enterococcus">Enterococcus</option>
              </datalist>
            </div>
          </div>
        </div>
        {/* If the user selects Yes but doesn't specify
        something from the dropdown, provide this error. */}
        {(status === 'invalid')  && (inputs.pathogen === "Yes") ?
          <span style={{ color: "red" }}>Please fill in this field.</span> : null}

        <br />

        <div className="container">
          <div className="row">
            <div className="col">
              {/* pathogen input option 2: No */}
              <input
                value="No"
                onChange={handlePathogen}
                type="radio"
                className="form-field"
                name="pathogen" />
              {' '}<label className="form-field">No</label>
            </div>
          </div>
        </div>
        <br />
        {/* If the form is submitted and pathogen isolation isn't specified, print this. */}
        {(status === 'invalid')  && !inputs.pathogen ?
          <span style={{ color: "red" }}>Please fill in this field.</span> : null}
        <hr />


        <h4 style={{ textAlign: "center" }}>Site of Infection</h4>

        <h6 style={{ textAlign: "center" }}>(check all that apply)</h6>
        {/* Inputs for infection sites - can select more than one */}
        <div className="container">
          <div className="row">
            <div className="col">
              <input
                value="No"
                onChange={handleInfectionSite}
                type="checkbox"
                className="form-field"
                name="infectionSite" />
              {/* All of these inputs have the same name 
          so that they relate to each other?

          ?? not sure if they need the same name or not
          actually since they have the same handler??
           */}
              {' '}<label className="form-field">None OR Pending Susceptibility Testing</label>

              <br />
              <input
                value="Blood"
                onChange={handleInfectionSite}
                type="checkbox"
                className="form-field"
                name="infectionSite" />
              {' '}<label className="form-field">Blood</label>

              <br />

              <input
                value="Urine"
                onChange={handleInfectionSite}
                type="checkbox"
                className="form-field"
                name="infectionSite" />
              {' '}<label className="form-field">Urine</label>

              <br />

              <input
                value="CSF"
                onChange={handleInfectionSite}
                type="checkbox"
                className="form-field"
                name="infectionSite" />
              {' '}<label className="form-field">CSF</label>

              <br />

              <input
                value="Peritoneal"
                onChange={handleInfectionSite}
                type="checkbox"
                className="form-field"
                name="infectionSite" />
              {' '}<label className="form-field">Peritoneal</label>

              <br />

              <input
                value="Skin_with_Cellulitis"
                onChange={handleInfectionSite}
                type="checkbox"
                className="form-field"
                name="infectionSite" />
              {' '}<label className="form-field">Skin with Cellulitis</label>

              <br />
            </div>
            <div className="col">
              <input className="form-control" list="datalistOptions1" id="bloodDataList" placeholder="Type to search..." onChange={handleBloodSelection} style={{ display: bloodToggle ? 'block' : 'none' }} />
              <datalist id="datalistOptions1">
                <option value="CSF Negative">CSF Negative</option>
                <option value="CSF Pending">CSF Pending</option>
              </datalist>

            </div>
          </div>
        </div>

        {/* If the form is submitted and no infection site 
        is selected, print this. */}
        {(status === 'invalid')  && (inputs.infectionSite.size === 0) ?
          <span style={{ color: "red" }}>Please fill in this field.</span> : null}

        <hr />
        <h4 style={{ textAlign: "center" }}>Abdominal Involvement Present?</h4>
        {/* Abdominal involvement inputs */}
        <div className="container">
          <div className="row">
            <div className="col">
              <input
                value="Yes"
                onChange={handleNEC}
                type="radio"
                className="form-field"
                name="nec" />
              {' '}<label className="form-field">Yes</label>

            </div>


            <div className="col">
              <input
                className="form-control"
                list="datalistOptions2" id="form-control"
                placeholder="Type to search..." 
                onChange={(event) => setInputs({ ...inputs, nec: event.target.value.replaceAll(' ', '_') })}
                style={{ display: necToggle ? 'block' : 'none' }} />
              <datalist id="datalistOptions2">
                <option value=""></option>
                <option value="Medical NEC">Medical NEC</option>
                <option value="Surgical NEC">Surgical NEC</option>
                <option value="SIP">SIP</option>
              </datalist>

            </div>
          </div>
        </div>

        {/* If the user selects yes without selecting something
        from the dropdown, give an error message. */}
        {(status === 'invalid')  && (inputs.nec === "Yes") ?
          <span style={{ color: "red" }}>Please fill in this field.</span> : null}

        <br />
        <div className="container">
          <div className="row">
            <div className="col">
              <input
                value="No"
                onChange={handleNEC}
                type="radio"
                className="form-field"
                name="nec" />
              {' '}<label className="form-field">No</label>
              <br />
            </div>
          </div>
        </div>

        {/* If the form is submitted and NEC present isn't specified, print this. */}
        {(status === 'invalid')  && !inputs.nec ?
          <span style={{ color: "red" }}>Please fill in this field.</span> : null}
        <br />
        <br />

        <div className="btn-toolbar" style={{ justifyContent: 'center', display: 'flex' }}>
          <div className="btn-group mr-2" style={{ fontSize: 'xxx-large' }}>
            <SubmitButton onClick={onClick} className="form-button" />
          </div>
          <div className="btn-group mr-2" style={{ fontSize: 'xxx-large' }}>
            <ClearButton onClear={onClear} className="form-button" />
          </div>
        </div>
        {/* If the form is valid, submitted, and loading, printed 'Loading' */}
        {(status === 'loading')  ? <div className="success-message" style={{ color: "green", textAlign: 'center' }}>Loading</div> : null}
        {/* If the form has successfully 'loaded', print 'Success!' */}
        {(status === 'loaded') ? <div className="success-message" style={{color:"green", textAlign:'center'}}>Success!</div> : null}
        {/* If the form is been submitted but is NOT Valid, print error message instead. */}
        {(status === 'invalid') ? <div className="failure-message" style={{ color: "red", textAlign: 'center' }}>Form is incomplete.</div> : null}
        <div style={{ justifyContent: 'center' }}>
          {(status === "loaded") && <OutputWidget inputs={inputs} outputDisplay={outputDisplay} style={{ display: 'block' }} />}

        </div>

      </form>
      <br />
    </div>
  )
};
export default FormComponent; // Exporting so that we can use in App.js