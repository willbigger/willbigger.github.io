import React, { useState, useEffect } from 'react';
import { DropdownButton, Dropdown, ListGroup, ListGroupItem } from 'react-bootstrap';
import axios from "axios"; // for get request for output data

import FormComponentHeader from './FormComponentHeader';
import OutputWidget from './OutputWidget';
import SubmitButton from './SubmitButton';
import ClearButton from './ClearButton';
import loading from './wait.gif'

import './FormComponent.css';


function FormComponent() {
  /*
  This state stores whether the page has been initialized
  */
  const [initialized, setInitialized] = useState(false);

  /* These are the inputs stored as state variables.
  We had to import { useState } to do this.
  */
  const [inputs, setInputs] = useState({
    gestationalAgeWeeks: "",
    gestationalAgeDays: "",
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
  This state stores the most recently viewed antibiotic treatment
  */
  const [carouselIndex, setCarouselIndex] = useState(0);

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

  const formValid = () => {
    console.log(inputs);
    if (
      // All fields are filled
      !inputs.gestationalAgeWeeks || !inputs.postnatalAge || !inputs.birthWeight || !inputs.currentWeight
      || !inputs.os || !inputs.pathogen || (pathogenToggle && !inputs.susceptible) || (inputs.infectionSite.size === 0) || !inputs.nec
      // Must select an option from any dropdowns
      || (inputs.pathogen === "Yes")
      || (inputs.infectionSite.has("Blood") && inputs.bloodDropdownSelection === "")
      || (inputs.nec === "Yes")
      // Postnatal age must be ≤ 3 days for EOS
      || (inputs.os === "EOS" && parseFloat(inputs.postnatalAge) >= 4)
      // Postnatal age must be ≥ 3 days for LOS
      || (inputs.os === "LOS" && parseFloat(inputs.postnatalAge) < 3)
      // Gestational age must be between 20 and 45 weeks
      || (parseFloat(inputs.gestationalAgeWeeks) * 7 + parseFloat(inputs.gestationalAgeDays) < 20 * 7
      || parseFloat(inputs.gestationalAgeWeeks) * 7 + parseFloat(inputs.gestationalAgeDays) > 45 * 7)
      // Birth weight must be at least 200 grams
      || (parseFloat(inputs.birthWeight) < 200)
      // Current weight must be at least 200 grams
      || (parseFloat(inputs.currentWeight) < 200)
      // If the user selects a pathogen, the user cannot answer None as the site of infection
      || (inputs.pathogen !== "No" && inputs.infectionSite.has("No"))
    ) {
      return false;
    } else {
      return true;
    }
  }

  const onSubmit = (event) => {
    if (formValid()) {
      event.preventDefault(); // stops refresh

      // creating the right URL to go to
      const base_url = process.env.REACT_APP_API_LOCATION || "http://localhost:8000";
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
          setStatus('loaded');
          setCarouselIndex(0);
          setOutputInputs({
            ...inputs,
            gestationalAge: parseFloat(inputs.gestationalAgeWeeks) + parseFloat(inputs.gestationalAgeDays) / 7,
          });
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
          setStatus('loaded');
          setCarouselIndex(0);
          setOutputInputs({
            ...inputs,
            gestationalAge: parseFloat(inputs.gestationalAgeWeeks) + parseFloat(inputs.gestationalAgeDays) / 7,
          });
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
      gestationalAgeWeeks: "",
      gestationalAgeDays: "",
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

  /*
  Since browsers preserve form fields after using the back/forward buttons,
  the form fields can become inconsistent with the FormComponent states.
  To fix this, we store all states to the browser history so that we can
  restore them if the user navigates back to the form.
  */
  useEffect(
    () => {
      if (initialized) {
        // page has already been initialized, update state in browser history
        window.history.replaceState({
          state: {
            inputs: inputs,
            outputInputs: outputInputs,
            outputDisplay: outputDisplay,
            status: status,
            pathogenToggle: pathogenToggle,
            bloodToggle: bloodToggle,
            necToggle: necToggle,
            termsAccepted: termsAccepted,
            carouselIndex: carouselIndex,
          }
        }, '');
        // console.log('Saved page state', window.history.state);
      }
      else if (window.history.state !== null && window.performance.getEntriesByType('navigation').some((entry) => entry.type === "back_forward")) {
        // if the state is not null and the user used the back/forward button to get here, restore the state from the browser history
        let state = window.history.state.state;
        setInitialized(true);
        setInputs(state.inputs);
        setOutputInputs(state.outputInputs);
        setOutputDisplay(state.outputDisplay);
        setStatus(state.status);
        setPathogenToggle(state.pathogenToggle);
        setBloodToggle(state.bloodToggle);
        setnecToggle(state.necToggle);
        setTermsAccepted(state.termsAccepted);
        setCarouselIndex(state.carouselIndex);
        // console.log('Reloaded previous page state', window.history.state);
      }
      else {
        // user clicked a link here or refreshed, so leave forms blank and mark as initialized
        setInitialized(true);
      }
    },
    [initialized, inputs, outputInputs, outputDisplay, status, pathogenToggle, bloodToggle, necToggle, termsAccepted, carouselIndex] // states to monitor
  );

  return (

    <div className="form-container container d-flex flex-column min-vh-100 align-items-center" style={{ justifyContent: 'center', display: 'flex', fontSize: "larger" }}>
      <FormComponentHeader />

      <ListGroup>
      <form className="nicu-form" id="input-form" onSubmit={onSubmit} style={{ fontSize: "smaller" }}>
      <ListGroup.Item>
        <h2 style={{ textAlign: "center" }}>Age and Weight</h2>
        <label className="form-field" htmlFor="gestationalAgeWeeks">Gestational Age</label>

        <br />
        {/* Gestational Age input */}
        <input
          value={inputs.gestationalAgeWeeks}
          onInput={(event) => setInputs({
            ...inputs,
            gestationalAgeWeeks: event.target.value,
            gestationalAgeDays: inputs.gestationalAgeDays === "" ? 0 : inputs.gestationalAgeDays,
          })}
          onBlur={(event) => {
            if (!Number.isNaN(parseFloat(inputs.gestationalAgeWeeks)) && !Number.isNaN(parseFloat(inputs.gestationalAgeDays))) {
              setInputs({
                ...inputs,
                gestationalAgeWeeks: Math.trunc(parseFloat(inputs.gestationalAgeWeeks) + parseFloat(inputs.gestationalAgeDays) / 7),
                gestationalAgeDays: Math.trunc(parseFloat(inputs.gestationalAgeWeeks) * 7 + parseFloat(inputs.gestationalAgeDays)) % 7,
              });
            }
          }}
          type="text"
          inputmode="decimal"
          className="form-field"
          id="gestationalAgeWeeks"
          name="gestationalAgeWeeks"
        /><span className="form-field">&nbsp;weeks  </span>
        <input
          value={inputs.gestationalAgeDays}
          onInput={(event) => setInputs({
            ...inputs,
            gestationalAgeWeeks: inputs.gestationalAgeWeeks === "" ? 0 : inputs.gestationalAgeWeeks,
            gestationalAgeDays: event.target.value
          })}
          onBlur={(event) => {
            if (!Number.isNaN(parseFloat(inputs.gestationalAgeWeeks)) && !Number.isNaN(parseFloat(inputs.gestationalAgeDays))) {
              setInputs({
                ...inputs,
                gestationalAgeWeeks: Math.trunc(parseFloat(inputs.gestationalAgeWeeks) + parseFloat(inputs.gestationalAgeDays) / 7),
                gestationalAgeDays: Math.trunc(parseFloat(inputs.gestationalAgeWeeks) * 7 + parseFloat(inputs.gestationalAgeDays)) % 7,
              });
            }
          }}
          type="text"
          inputmode="decimal"
          className="form-field"
          id="gestationalAgeDays"
          name="gestationalAgeDays"
        /><span className="form-field">&nbsp;days</span>

        <br />
        {/* Providing an error message if the user tries to submit
        while the Gestational Age input is empty */}
        {(status === 'invalid') && !inputs.gestationalAgeWeeks ?
          <span className="error"> Please fill in this field. </span> : null}
        {(status === 'invalid') && (parseFloat(inputs.gestationalAgeWeeks) + parseFloat(inputs.gestationalAgeDays) / 7 < 20 || parseFloat(inputs.gestationalAgeWeeks) + parseFloat(inputs.gestationalAgeDays) / 7 > 45)  ?
          <span className="error"> Gestational age must be between 20 and 45 weeks. </span> : null}

        <br />
        <label className="form-field" htmlFor="postnatalAge">Postnatal Age (at time of culture sent)</label>

        <br />
        {/* Postnatal Age input */}
        <input
          value={inputs.postnatalAge}
          onInput={(event) => setInputs({ ...inputs, postnatalAge: event.target.value })}
          type="text"
          inputmode="decimal"
          className="form-field"
          id="postnatalAge"
          name="postnatalAge"
        /><span className="form-field">&nbsp;days</span>

        < br />
        {/* Providing an error message if the user tries to submit
        while the Postnatal Age input is empty */}
        {(status === 'invalid') && !inputs.postnatalAge ?
          <span className="error">Please fill in this field.</span> : null}
        {(status === 'invalid') && (inputs.os === "EOS" && parseFloat(inputs.postnatalAge) > 3) ?
          <span className="error">Postnatal age must be ≤ 3 days for EOS.</span> : null }
        {(status === 'invalid') && (inputs.os === "LOS" && parseFloat(inputs.postnatalAge) < 3) ?
          <span className="error">Postnatal age must be ≥ 3 days for LOS.</span> : null }
        <br />
        <label className="form-field" htmlFor="birthWeight">Birth Weight</label>
        <br />
        {/* Birth Weight input */}
        <input
          value={inputs.birthWeight}
          onInput={(event) => setInputs({ ...inputs, birthWeight: event.target.value })}
          type="text"
          inputmode="decimal"
          className="form-field"
          id="birthWeight"
          name="birthWeight"
        /><span className="form-field">&nbsp;grams</span>
        <br />
        {/* Providing an error message if the user tries to submit
        while the Birth Weight input is empty */}
        {(status === 'invalid') && !inputs.birthWeight ?
          <span className="error">Please fill in this field.</span> : null}
        {(status === 'invalid') && parseFloat(inputs.birthWeight) < 200 ?
          <span className="error">Birth weight must be at least 200 grams. </span> : null}

        <br />
        <label className="form-field" htmlFor="currentWeight">Current Weight (at time of form completion)</label>

        <br />
        {/* Current Weight input */}
        <input
          value={inputs.currentWeight}
          onInput={(event) => setInputs({ ...inputs, currentWeight: event.target.value })}
          type="text"
          inputmode="decimal"
          className="form-field"
          id="currentWeight"
          name="currentWeight"
        /><span className="form-field">&nbsp;grams</span>
        <br />
        {/* Providing an error message if the user tries to submit
        while the Current Weight input is empty */}
        {(status === 'invalid') && !inputs.currentWeight ?
          <span className="error">Please fill in this field.</span> : null}
        {(status === 'invalid') && parseFloat(inputs.currentWeight) < 200 ?
          <span className="error">Current weight must be at least 200 grams.</span> : null}
        <br/>
        </ListGroup.Item>
        <br/>
        <br />
        <ListGroup.Item>
        <br />
        <h2 style={{ textAlign: "center" }}>Early-Onset (EOS) or Late-Onset (LOS) Sepsis</h2>
        <br />
        {/* EOS/LOS input option 1: EOS */}
        <div className="container">
          <div className="row">
            <div className="col">
              <input
                value="EOS"
                onInput={(event) => setInputs({ ...inputs, os: event.target.value })}
                type="radio"
                className="form-field"
                id="os-EOS"
                name="os" />
              {' '}<label className="form-field" htmlFor="os-EOS">EOS (less than 72 hours after birth) </label>
            </div>
          </div>
        </div>

        <br />

        {/* EOS/LOS input option 2: LOS */}
        <div className="container">
          <div className="row">
            <div className="col">
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
            </div>
          </div>
        </div>
        <br />


        {/* If the form is submitted and the onset input is missing, print this. */}
        {(status === 'invalid') && !inputs.os ?
          <span className="error">Please fill in this field.</span> : null}
        </ListGroup.Item>
        <br />
        <br />
        <ListGroup.Item>
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


                <Dropdown.Header style={{fontWeight: 'bold', fontSize: '1.5rem', color: 'black'}}>Gram-positive organisms</Dropdown.Header>


                <Dropdown.Item eventKey="Gram Positive">Gram-positive cocci</Dropdown.Item>
                <Dropdown.Item eventKey="CoNS">CoNS (coagulase-negative Staphylococcus) species</Dropdown.Item>
                <Dropdown.Item eventKey="Group B Streptococcus (GBS)">GBS (group B streptococci)</Dropdown.Item>
                <Dropdown.Item eventKey="MSSA">Staphylococcus aureus (MSSA)</Dropdown.Item>
                <Dropdown.Item eventKey="MRSA">Staphylococcus aureus (MRSA)</Dropdown.Item>
                <Dropdown.Item eventKey="Enterococcus">Enterococcus</Dropdown.Item>
                <Dropdown.Item eventKey="Gram Positive Rods">Gram-positive rod</Dropdown.Item>
                <Dropdown.Item eventKey="Listeria">Listeria</Dropdown.Item>

                <Dropdown.Divider />


                <Dropdown.Header style={{fontWeight: 'bold', fontSize: '1.5rem', color: 'black'}}>Gram-negative organisms</Dropdown.Header>

                <Dropdown.Item eventKey="Gram Negative Rods">Gram-negative rod</Dropdown.Item>
                <Dropdown.Item eventKey="E Coli">Escherichia coli</Dropdown.Item>
                <Dropdown.Item eventKey="Klebsiella">Klebsiella</Dropdown.Item>
                <Dropdown.Item eventKey="Enterobacter">Enterobacter species</Dropdown.Item>
                <Dropdown.Item eventKey="Pseudomonas">Pseudomonas species</Dropdown.Item>

                <Dropdown.Divider />


                <Dropdown.Header style={{fontWeight: 'bold', fontSize: '1.5rem', color: 'black'}}>Fungi-Candida species</Dropdown.Header>


                <Dropdown.Item eventKey="Candida Albicans">Candida albicans</Dropdown.Item>
                <Dropdown.Item eventKey="Candida Parasilosis">Candida parasilosis</Dropdown.Item>
                <Dropdown.Item eventKey="Non Candida Albicans">Non-candida albicans</Dropdown.Item>

                <Dropdown.Divider />

                <Dropdown.Header style={{fontWeight: 'bold', fontSize: '1.5rem', color: 'black'}}>Molds</Dropdown.Header>


                <Dropdown.Item eventKey="Aspergillus">Aspergillus species</Dropdown.Item>
                <Dropdown.Item eventKey="Rhizopus">Rhizopus species</Dropdown.Item>

              </DropdownButton>

            </div>
          </div>
        </div>
        {/* If the user selects Yes but doesn't specify
        something from the dropdown, provide this error. */}
        {(status === 'invalid') && (inputs.pathogen === "Yes") ?
          <span className="error">Please fill in this field.</span> : null}

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
        {/* If the form is submitted and pathogen isolation isn't specified, print this. */}
        {(status === 'invalid') && !inputs.pathogen ?
          <span className="error">Please fill in this field.</span> : null}

        </ListGroup.Item>
        <br />

        <br style={{ display: pathogenToggle ? 'inline' : 'none' }} />
        <ListGroup.Item style={{ display: pathogenToggle ? 'block' : 'none' }}>
        <h2 style={{ textAlign: "center" }}>Susceptibility Results</h2>
        {/* Susceptible input */}
        <div className="container">
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

        <br />

        <div className="container">
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

        <br />
        {/* If the form is submitted and pathogen susceptibility isn't specified, print this. */}
        {(status === 'invalid') && pathogenToggle && !inputs.susceptible ?
          <span className="error">Please fill in this field.</span> : null}

        </ListGroup.Item>
        <br style={{ display: pathogenToggle ? 'inline' : 'none' }} />

        <br />
        <ListGroupItem>
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
        {(status === 'invalid') && ((inputs.infectionSite.size === 0)) ?
          <span className="error">Please fill in this field.</span> : null}
        {(status === 'invalid') && inputs.infectionSite.has("Blood") && inputs.bloodDropdownSelection === "" ?
          <span className="error">Please fill in this field.<br />Blood needs CSF</span> : null}
        {(status === 'invalid') && (inputs.pathogen !== "No" && inputs.infectionSite.has("No")) ?
          <span className="error">Infection site must be specified when pathogen is isolated.</span> : null}
        </ListGroupItem>
        <br/>
      <br/>
        <ListGroupItem>
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
            <span className="error">Please fill in this field.</span> : null
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
            <span className="error">Please fill in this field.</span> : null
        }
        <br />
        </ListGroupItem>
        <br/>
        <br/>
        <ListGroupItem>
        {/* Terms and Conditions */}
        <input
          value="I have read and accepted the terms and conditions"
          onClick={(event) => setTermsAccepted(event.target.checked)}
          type="checkbox"
          id="terms-and-conditions"
          className="form-field"/>
        {' '}<label className="form-field" htmlFor="terms-and-conditions" alignItems="center">I have read and accepted the <a href="/terms">terms and conditions</a> </label>
        <br/>

        {/* If the form is submitted and the "terms and conditions" box isn't checked, print this. */}
        {
        (status === 'invalid') && !termsAccepted ?
          <span className="error">Please accept the terms and conditions.</span> : null
        }
        </ListGroupItem>
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
        <img src={loading} style={{width:50}} alt="Loading"/>
        </div> : null }


        {/* If the form has successfully 'loaded', print 'Success!' */}
        {(status === 'loaded') ? <div className="success-message" style={{ color: "green", textAlign: 'center', fontSize: 'larger' }}>Success!</div> : null}
        {/* If the form is been submitted but is NOT Valid, print error message instead. */}
        {(status === 'invalid') ? <div className="failure-message" style={{ color: "red", textAlign: 'center' }}>Form is incomplete.</div> : null}
        <div style={{ justifyContent: 'center' }}>
          {(status === "loaded") && <OutputWidget inputs={outputInputs} setOutputInputs={setOutputInputs} outputDisplay={outputDisplay} carouselIndex={carouselIndex} setCarouselIndex={setCarouselIndex} />}

        </div>
      </form >

      <br />
      </ListGroup>
    </div >

  )
};
export default FormComponent; // Exporting so that we can use in App.js
