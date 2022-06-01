import React, { useState } from 'react';
import OutputWidget from './OutputWidget';
import { DropdownButton, Dropdown } from 'react-bootstrap';

// import Waiting from './Waiting';
import SubmitButton from './SubmitButton';
import ClearButton from './ClearButton';
import axios from "axios"; // for get request for output data
import loading from './wait'

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
    susceptible: "",
    infectionSite: new Set(),
    bloodDropdownSelection: "",
    nec: "",
  });

  /* These are the inputs stored as state variables.
  These are stored separately so that the output widget
  displays the inputs as of when the form was submitted.
  */
  const [outputInputs, setOutputInputs] = useState({
    gestationalAge: "",
    postnatalAge: "",
    birthWeight: "",
    currentWeight: "",
    os: "",
    pathogen: "",
    susceptible: "",
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

  /*
  Terms and conditions accepted toggle
   */
  const [termsAccepted, setTermsAccepted] = useState(false);

  /*
  Handler for the pathogen variable.
  Similar to the onset variable, it
  toggles the pathogen variable between yes
  and no depending on which radio button is clicked.
  */
  const handlePathogen = (event) => {
    setInputs({ ...inputs, pathogen: event.target.value })
  }

  const handlePathogenToggle = (event) => {
    if (event.target.value === "Yes") {
      setPathogenToggle(true)
    }
    else {
      setPathogenToggle(false)
      // reset susceptibility
      setInputs({ ...inputs, susceptible: '' })
      document.querySelectorAll('input[name="susceptible"]').forEach(el => el.checked = false);
    }
  }

  /*
  Handler for the susceptible variable.
  Similar to the pathogen variable, it
  toggles the susceptible variable between yes
  and no depending on which radio button is clicked.
  */
  const handleSusceptible = (event) => {
    setInputs({ ...inputs, susceptible: event.target.value })
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
    } else {
      inputs.infectionSite.delete(event.target.value)
      if (event.target.value === "Blood") {
        setBloodToggle(false)
      }
    }
  }

  /*
   Handler for the blood dropdown selection visibility.
   */
  const handleBloodSelection = (event) => {
    setInputs({ ...inputs, bloodDropdownSelection: event })
  }

  /*
  Handler for the NEC variable.
  Toggles the NEC variable between yes
  and no depending on which radio button is clicked.
  */
  const handleNEC = (event) => {
    setInputs({ ...inputs, nec: event.target.value })
    /*
    if (event.target.value === "Yes") {
      setnecToggle(true)
    }
    else {
      setnecToggle(false)
    }
    */
  }

  const handleNECToggle = (event) => {
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

  const onSubmit = (event) => {
    console.log(inputs);
    let validAge = true
    let validWeight = true
    if(inputs.os == "EOS") {
      if (parseFloat(inputs.postnatalAge) >= 4) {
        validAge = false
      }
    } else if (inputs.os == "LOS") {
      if (parseFloat(inputs.postnatalAge) < 3) {
        validAge = false
      }
    }
    if(parseFloat(inputs.gestationalAge) < 20 || parseFloat(inputs.gestationalAge) > 45) {
      validAge = false
    }
    if(parseFloat(inputs.birthWeight) < 200 || parseFloat(inputs.currentWeight) < 200) {
      validWeight = false
    }
    if ((inputs.infectionSite.has("Blood") ? inputs.bloodDropdownSelection != "" : true ) && inputs.gestationalAge && inputs.postnatalAge && validAge && inputs.birthWeight && inputs.currentWeight && validWeight && inputs.os && (inputs.pathogen !== "Yes" && inputs.pathogen) && (inputs.pathogen === "No" || inputs.susceptible) && (inputs.infectionSite.size !== 0) && inputs.nec !== "Yes" && inputs.nec) {
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
      if (infectionSite === "Blood") {
        if (inputs.bloodDropdownSelection === "CSF Negative") {
          url = `${base_url}/outputs?time_sent=${inputs.os}&pathogen_isolated=${inputs.pathogen}&site_of_infection=Blood&abdominal_involvement=${inputs.nec}`;
        } else if (inputs.bloodDropdownSelection === "CSF Pending") {
          url = `${base_url}/outputs?time_sent=${inputs.os}&pathogen_isolated=${inputs.pathogen}&site_of_infection=CSF&abdominal_involvement=${inputs.nec}`;
        }
      }

      console.log("final url", url)
      setStatus('loading')

      axios.get(url).then((response) => {
        if (response.data.length === 1) {
          setStatus('loaded')
          setOutputInputs(inputs);
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
          setOutputInputs(inputs);
          setOutputDisplay({
            ...outputDisplay,
            noMatch: true,
          });
        }
        const post_url = `${base_url}/create-input`;
        console.log(JSON.stringify({...inputs, infectionSite: infectionSite, output_available: response.data.length === 1}))
        axios.post(post_url, {...inputs, infectionSite: infectionSite, output_available: response.data.length === 1}).then((response) => console.log(response));
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
    event.preventDefault(); // stops refresh
    setStatus('initial')
    setPathogenToggle(false);
    setnecToggle(false);
    setBloodToggle(false);
    setTermsAccepted(false);
    document.getElementById("input-form").reset();
    inputs.infectionSite.clear()
    document.querySelectorAll('input[type="checkbox"]')
      .forEach(el => el.checked = false);

    setInputs({
      ...inputs,
      gestationalAge: "",
      postnatalAge: "",
      antibiotic_duration: "",
      birthWeight: "",
      currentWeight: "",
      os: "",
      pathogen: "",
      susceptible: "",
      bloodDropdownSelection: "",
      nec: ""
    })

    setOutputDisplay({
      treatment: "",
      treatment1: "",
      treatment2: "",
      treatment3: "",
      treatment4: "",
      duration: "",
      addRecs: "",
      noMatch: false
    })

  }


  return (
    <div className="form-container container d-flex flex-column min-vh-100 align-items-center" style={{ justifyContent: 'center', display: 'flex', marginBottom: "100px", fontSize: "larger" }}>

      <form className="nicu-form" id="input-form" onSubmit={onSubmit} style={{ fontSize: "smaller" }}>
        <h2 style={{ textAlign: "center" }}>Age and Weight</h2>
        <label className="form-field" htmlFor="gestationalAge">Gestational Age (in weeks)</label>

        <br />
        {/* Gestational Age input */}
        <input
          textAlign={'center'}
          value={inputs.gestationalAge}
          onInput={(event) => setInputs({ ...inputs, gestationalAge: event.target.value })}
          type="text"
          className="form-field"
          id="gestationalAge"
          name="gestationalAge"
        />
        <br />
        {/* Providing an error message if the user tries to submit 
        while the Gestational Age input is empty */}
        {(status === 'invalid') && !inputs.gestationalAge ?
          <span style={{ color: "red" }}> Please fill in this field. </span> : null}
        {(status === 'invalid') && (inputs.gestationalAge < 20 || inputs.gestationalAge > 45)  ?
          <span style={{ color: "red" }}> Gestational age must be between 20 and 45 weeks. </span> : null}

        <br />
        <label className="form-field" htmlFor="postnatalAge">Postnatal Age (in days, at time of culture sent)</label>

        <br />
        {/* Postnatal Age input */}
        <input
          value={inputs.postnatalAge}
          onInput={(event) => setInputs({ ...inputs, postnatalAge: event.target.value })}
          type="text"
          className="form-field"
          id="postnatalAge"
          name="postnatalAge"
        />
        
        < br />
        {/* Providing an error message if the user tries to submit 
        while the Postnatal Age input is empty */}
        {(status === 'invalid') && !inputs.postnatalAge ?
          <span style={{ color: "red" }}>Please fill in this field.</span> : null}
        {(status === 'invalid') && (inputs.os === "EOS" && parseFloat(inputs.postnatalAge) > 3) ?
          <span style={{ color: "red" }}>Postnatal age must be ≤ 3 days for EOS.</span> : null }
        {(status === 'invalid') && (inputs.os === "LOS" && parseFloat(inputs.postnatalAge) < 3) ?
          <span style={{ color: "red" }}>Postnatal age must be ≥ 3 days for LOS.</span> : null }
        <br />
        <label className="form-field" htmlFor="birthWeight">Birth Weight (in grams)</label>
        <br />
        {/* Birth Weight input */}
        <input
          value={inputs.birthWeight}
          onInput={(event) => setInputs({ ...inputs, birthWeight: event.target.value })}
          type="text"
          className="form-field"
          id="birthWeight"
          name="birthWeight"
        />
        <br />
        {/* Providing an error message if the user tries to submit 
        while the Birth Weight input is empty */}
        {(status === 'invalid') && !inputs.birthWeight ?
          <span style={{ color: "red" }}>Please fill in this field.</span> : null}
        {(status === 'invalid') && parseFloat(inputs.birthWeight) < 200 ?
          <span style={{ color: "red" }}>Birth weight must be at least 200 grams. </span> : null}

        <br />
        <label className="form-field" htmlFor="currentWeight">Current Weight (in grams, at time of form completion)</label>

        <br />
        {/* Current Weight input */}
        <input
          value={inputs.currentWeight}
          onInput={(event) => setInputs({ ...inputs, currentWeight: event.target.value })}
          type="text"
          className="form-field"
          id="currentWeight"
          name="currentWeight"
        />
        <br />
        {/* Providing an error message if the user tries to submit 
        while the Current Weight input is empty */}
        {(status === 'invalid') && !inputs.currentWeight ?
          <span style={{ color: "red" }}>Please fill in this field.</span> : null}
        {(status === 'invalid') && parseFloat(inputs.currentWeight) < 200 ?
          <span style={{ color: "red" }}>Current weight must be at least 200 grams.</span> : null}

        <hr />

        <h2 style={{ textAlign: "center" }}>Early-Onset (EOS) or Late-Onset (LOS) Sepsis</h2>
        {/* EOS/LOS input option 1: EOS */}
        <input
          value="EOS"
          onInput={(event) => setInputs({ ...inputs, os: event.target.value })}
          type="radio"
          className="form-field"
          id="os-EOS"
          name="os" />
        {' '}<label className="form-field" htmlFor="os-EOS">EOS (less than 72 hours after birth) </label>

        <br />

        {/* EOS/LOS input option 2: LOS */}
        <input
          value="LOS"
          onInput={(event) => setInputs({ ...inputs, os: event.target.value })}
          type="radio"
          className="form-field"
          id="os-LOS"
          name="os"
        // Notice that these radio buttons have the same name 
        //so that only one can be selected at a time
        />
        {' '}<label className="form-field" htmlFor="os-LOS">LOS (72 or more hours after birth)</label>
        <br />
        {/* If the form is submitted and the onset input is missing, print this. */}
        {(status === 'invalid') && !inputs.os ?
          <span style={{ color: "red" }}>Please fill in this field.</span> : null}
        <hr />

        <h2 style={{ textAlign: "center" }}>Pathogen Isolated</h2>
        <h6 style={{ textAlign: "center" }}>(can enter Gram stain or specific species)</h6>
        {/* Pathogen input */}
        <div className="container">
          <div className="row">
            <div className="col">
              {/* pathogen input option 1: Yes */}
              <input
                value="Yes"
                onInput={handlePathogen}
                onClick={handlePathogenToggle}
                type="radio"
                className="form-field"
                id="pathogen-Yes"
                name="pathogen" />
              {' '}<label className="form-field" htmlFor="pathogen-Yes">Yes</label>

              {/* If yes is selected for the pathogen input, show this dropdown */}
              <DropdownButton
                alignRight
                title={(inputs.pathogen === "No" || inputs.pathogen === "Yes") ? "Select..." : inputs.pathogen.replaceAll('_', ' ')}
                id="dropdown-menu-align-right"
                variant="secondary-light"
                onSelect={(event) => setInputs({ ...inputs, pathogen: event.replaceAll(' ', '_') })}
                style={{ display: pathogenToggle ? 'block' : 'none' }}
              >

                <Dropdown.Item eventKey="E Coli">E Coli</Dropdown.Item>
                <Dropdown.Item eventKey="Klebsiella">Klebsiella</Dropdown.Item>
                <Dropdown.Item eventKey="CoNS">CoNS</Dropdown.Item>
                <Dropdown.Item eventKey="Group B Streptococcus (GBS)">Group B Streptococcus (GBS)</Dropdown.Item>
                <Dropdown.Item eventKey="MSSA">MSSA</Dropdown.Item>
                <Dropdown.Item eventKey="MRSA">MRSA</Dropdown.Item>
                <Dropdown.Item eventKey="Pseudomonas">Pseudomonas</Dropdown.Item>
                <Dropdown.Item eventKey="Enterobacter">Enterobacter</Dropdown.Item>
                <Dropdown.Item eventKey="Enterococcus">Enterococcus</Dropdown.Item>

                <Dropdown.Item eventKey="Candida Albicans">Candida Albicans</Dropdown.Item>
                <Dropdown.Item eventKey="Candida Parasilosis">Candida Parasilosis</Dropdown.Item>
                <Dropdown.Item eventKey="Gram Positive">Gram Positive</Dropdown.Item>
                <Dropdown.Item eventKey="Gram Negative Rods">Gram Negative Rods</Dropdown.Item>
                <Dropdown.Item eventKey="Aspergillus">Aspergillus</Dropdown.Item>
                <Dropdown.Item eventKey="Rhizopus">Rhizopus</Dropdown.Item>
                <Dropdown.Item eventKey="Non Candida Albicans">Non Candida Albicans</Dropdown.Item>
                <Dropdown.Item eventKey="Listeria">Listeria</Dropdown.Item>

              </DropdownButton>

            </div>
          </div>
        </div>
        {/* If the user selects Yes but doesn't specify
        something from the dropdown, provide this error. */}
        {(status === 'invalid') && (inputs.pathogen === "Yes") ?
          <span style={{ color: "red" }}>Please fill in this field.</span> : null}

        <br />

        <div className="container">
          <div className="row">
            <div className="col">
              {/* pathogen input option 2: No */}
              <input
                value="No"
                onInput={handlePathogen}
                onClick={handlePathogenToggle}
                type="radio"
                className="form-field"
                id="pathogen-No"
                name="pathogen" />
              {' '}<label className="form-field" htmlFor="pathogen-No">No</label>
            </div>
          </div>
        </div>
        <br />
        {/* If the form is submitted and pathogen isolation isn't specified, print this. */}
        {(status === 'invalid') && !inputs.pathogen ?
          <span style={{ color: "red" }}>Please fill in this field.</span> : null}
        <hr />


        <h2 style={{ textAlign: "center", display: pathogenToggle ? 'block' : 'none' }}>Susceptibility Results</h2>
        {/* Susceptible input */}
        <div className="container" style={{ display: pathogenToggle ? 'block' : 'none' }}>
          <div className="row">
            <div className="col">
              {/* susceptible input option 1: Pending */}
              <input
                value="Pending"
                onInput={handleSusceptible}
                type="radio"
                className="form-field"
                id="susceptible-Pending"
                name="susceptible" />
              {' '}<label className="form-field" htmlFor="susceptible-Pending">Pending</label>
            </div>
          </div>
        </div>

        <br style={{ display: pathogenToggle ? 'inline' : 'none' }} />

        <div className="container" style={{ display: pathogenToggle ? 'block' : 'none' }}>
          <div className="row">
            <div className="col">
              {/* susceptible input option 2: Known */}
              <input
                value="Known"
                onInput={handleSusceptible}
                type="radio"
                className="form-field"
                id="susceptible-Known"
                name="susceptible" />
              {' '}<label className="form-field" htmlFor="susceptible-Known">Known</label>
            </div>
          </div>
        </div>
        <br style={{ display: pathogenToggle ? 'inline' : 'none' }} />
        {/* If the form is submitted and pathogen isolation isn't specified, print this. */}
        {(status === 'invalid') && pathogenToggle && !inputs.susceptible ?
          <span style={{ color: "red" }}>Please fill in this field.</span> : null}
        <hr style={{ display: pathogenToggle ? 'block' : 'none' }}/>


        <h2 style={{ textAlign: "center" }}>Site of Infection</h2>

        <h6 style={{ textAlign: "center" }}>(check all that apply)</h6>
        {/* Inputs for infection sites - can select more than one */}
        <div className="container">
          <div className="row">
            <div className="col">
              <input
                value="No"
                onInput={handleInfectionSite}
                type="checkbox"
                className="form-field"
                id="infectionSite-No"
                name="infectionSite" />
              {' '}<label className="form-field" htmlFor="infectionSite-No">None OR Culture Results Pending</label>

              <br />
              <input
                value="Blood"
                onInput={handleInfectionSite}
                type="checkbox"
                className="form-field"
                id="infectionSite-Blood"
                name="infectionSite" />
              {' '}<label className="form-field" htmlFor="infectionSite-Blood">Blood</label>

              <DropdownButton
                alignRight
                title={inputs.bloodDropdownSelection === "" ? "Select..." : inputs.bloodDropdownSelection}
                id="dropdown-menu-align-right1"
                variant="secondary-light"
                onSelect={handleBloodSelection}
                style={{ display: bloodToggle ? 'block' : 'none' }}
              >
                <Dropdown.Item eventKey="CSF Negative">CSF Negative</Dropdown.Item>
                <Dropdown.Item eventKey="CSF Pending">CSF Pending</Dropdown.Item>
              </DropdownButton>
              <br />

              <input
                value="Urine"
                onInput={handleInfectionSite}
                type="checkbox"
                className="form-field"
                id="infectionSite-Urine"
                name="infectionSite" />
              {' '}<label className="form-field" htmlFor="infectionSite-Urine">Urine</label>

              <br />

              <input
                value="CSF"
                onInput={handleInfectionSite}
                type="checkbox"
                className="form-field"
                id="infectionSite-CSF"
                name="infectionSite" />
              {' '}<label className="form-field" htmlFor="infectionSite-CSF">CSF</label>

              <br />

              <input
                value="Peritoneal"
                onInput={handleInfectionSite}
                type="checkbox"
                className="form-field"
                id="infectionSite-Peritoneal"
                name="infectionSite" />
              {' '}<label className="form-field" htmlFor="infectionSite-Peritoneal">Peritoneal</label>

              <br />

              <input
                value="Skin_with_Cellulitis"
                onInput={handleInfectionSite}
                type="checkbox"
                className="form-field"
                id="infectionSite-Skin_with_Cellulitis"
                name="infectionSite" />
              {' '}<label className="form-field" htmlFor="infectionSite-Skin_with_Cellulitis">Skin with Cellulitis</label>

              <br />
            </div>
          </div>
        </div>

        {/* If the form is submitted and no infection site 
        is selected, print this. */}
        {(status === 'invalid') && ((inputs.infectionSite.size === 0) || (inputs.infectionSite.has("Blood") && inputs.bloodDropdownSelection == "")) ?
          <span style={{ color: "red" }}>Please fill in this field.</span> : null}
        {(status === 'invalid') && inputs.infectionSite.has("Blood") && inputs.bloodDropdownSelection == "" ?
          <p style={{ color: "red" }}>Blood needs CSF</p> : null}

        <hr />
        <h2 style={{ textAlign: "center" }}>Abdominal Involvement Present?</h2>
        {/* Abdominal involvement inputs */}
        <div className="container">
          <div className="row">
            <div className="col">
              <input
                value="Yes"
                onInput={handleNEC}
                onClick={handleNECToggle}
                type="radio"
                className="form-field"
                id="nec-Yes"
                name="nec" />
              {' '}<label className="form-field" htmlFor="nec-Yes">Yes</label>

              <DropdownButton
                alignRight
                title={(inputs.nec === "No" || inputs.nec === "Yes") ? "Select..." : inputs.nec.replaceAll('_', ' ')}
                id="dropdown-menu-align-right"
                variant="secondary-light"
                onSelect={(event) => setInputs({ ...inputs, nec: event.replaceAll(' ', '_') })}
                style={{ display: necToggle ? 'block' : 'none' }}
              >
                <Dropdown.Item eventKey="Medical NEC">Medical NEC</Dropdown.Item>
                <Dropdown.Item eventKey="Surgical NEC">Surgical NEC</Dropdown.Item>
                <Dropdown.Item eventKey="SIP">SIP</Dropdown.Item>
              </DropdownButton>
            </div>

          </div>
        </div>

        {/* If the user selects yes without selecting something
        from the dropdown, give an error message. */}
        {
          (status === 'invalid') && (inputs.nec === "Yes") ?
            <span style={{ color: "red" }}>Please fill in this field.</span> : null
        }

        <br />
        <div className="container">
          <div className="row">
            <div className="col">
              <input
                value="No"
                onInput={handleNEC}
                onClick={handleNECToggle}
                type="radio"
                className="form-field"
                id="nec-No"
                name="nec" />
              {' '}<label className="form-field" htmlFor="nec-No">No</label>
              <br />
            </div>
          </div>
        </div>

        {/* If the form is submitted and NEC present isn't specified, print this. */}
        {
          (status === 'invalid') && !inputs.nec ?
            <span style={{ color: "red" }}>Please fill in this field.</span> : null
        }
        <br />

        <hr/>

        {/* Terms and Conditions */}
        <input
          value="I have read and accepted the terms and conditions"
          onClick={(event) => setTermsAccepted(event.target.checked)}
          type="checkbox"
          id="terms-and-conditions"
          className="form-field"/>
        {' '}<label className="form-field" htmlFor="terms-and-conditions">I have read and accepted the <a href="/terms">terms and conditions</a> </label>
        <br/>
        
        {/* If the form is submitted and the "terms and conditions" box isn't checked, print this. */}
        {
        (status === 'invalid') && !termsAccepted ?
          <span style={{ color: "red" }}>Please accept the terms and conditions.</span> : null
        }

        <div className="btn-toolbar" style={{ justifyContent: 'center', display: 'flex' }}>
          <div className="btn-group mr-2" style={{ fontSize: 'xxx-large' }}>
            <SubmitButton onClick={onSubmit} className="form-button" />
          </div>
          <div className="btn-group mr-2" style={{ fontSize: 'xxx-large' }}>
            <ClearButton onClear={onClear} className="form-button" />
          </div>
        </div>
        {/* If the form is valid, submitted, and loading, show a loading gif */}
        {(status === 'loading') ? 
        <div className="success-message" style={{textAlign:"center", justifyContent:"center"}}>
        <img src={loading} style={{width:50}}/>
        </div> : null }


        {/* If the form has successfully 'loaded', print 'Success!' */}
        {(status === 'loaded') ? <div className="success-message" style={{ color: "green", textAlign: 'center', fontSize: 'larger' }}>Success!</div> : null}
        {/* If the form is been submitted but is NOT Valid, print error message instead. */}
        {(status === 'invalid') ? <div className="failure-message" style={{ color: "red", textAlign: 'center' }}>Form is incomplete.</div> : null}
        <div style={{ justifyContent: 'center' }}>
          {(status === "loaded") && <OutputWidget inputs={outputInputs} outputDisplay={outputDisplay} style={{ display: 'block' }} />}

        </div>

      </form >
      <br />
    </div >
  )
};
export default FormComponent; // Exporting so that we can use in App.js