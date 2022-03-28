import React, { useState } from 'react';
import OutputWidget from './OutputWidget';
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
    pathogenDropdownSelection: "",
    infectionSite: [],
    nec: "",
    necDropdownSelection: "",
  });

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
  This is the variable 'submitted' stored as a state variable.
   */
  const [submitted, setSubmitted] = useState(false); // Initially false

  /*
  This is a toggle for the pathogen input to determine whether to display the dropdown.
   */
  const [pathogenToggle, setPathogenToggle] = useState(false); // Initially false

  /*
  This is a toggle for the abdominal involvement input to determine whether to display the dropdown.
   */
  const [necToggle, setnecToggle] = useState(false); // Initially false

  /*
  This is the variable 'valid' stored as a state variable,
  which will be used to make sure all inputs are filled out.
   */
  const [valid, setValid] = useState(false); // Initially false

  /* 
  This is the handler for the gestationalAge variable, setting
  the variable to whatever text was inputted.
  */
  const handleGestationalAge = (event) => {
    setInputs({ ...inputs, gestationalAge: event.target.value })
  }

  /* 
 This is the handler for the postnatalAge variable, setting
 the variable to whatever text was inputted.
 */
  const handlePostnatalAge = (event) => {
    setInputs({ ...inputs, postnatalAge: event.target.value })
  }
  /* 
 
   This is the handler for the birthWeiht variable, setting
   the variable to whatever text was inputted.
   */
  const handleBirthWeight = (event) => {
    setInputs({ ...inputs, birthWeight: event.target.value })
  }

  /* 
 This is the handler for the currentWeight variable, setting
 the variable to whatever text was inputted.
 */
  const handleCurrentWeight = (event) => {
    setInputs({ ...inputs, currentWeight: event.target.value })
  }

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
  Handler for the pathogenDropdownSelection variable,
  setting it to whatever is selected from the dropdown.
  */
  const handleSelection = (event) => {
    if (event.target.value === "E Coli") {
      setInputs({ ...inputs, pathogenDropdownSelection: "E_Coli" })
    } else if (event.target.value === "Group B Streptococcus (GBS)") {
      setInputs({ ...inputs, pathogenDropdownSelection: "Group_B_Streptococcus_(GBS)" })
    } else {
      setInputs({ ...inputs, pathogenDropdownSelection: event.target.value })
    }
  }

  /*
  Handler for the necDropdownSelection variable,
  setting it to whatever is selected from the dropdown.
  */
  const handleSelection2 = (event) => {
    if (event.target.value === "Medical NEC") {
      setInputs({ ...inputs, necDropdownSelection: "Medical_NEC" })
    } else if (event.target.value === "Surgical NEC") {
      setInputs({ ...inputs, necDropdownSelection: "Surgical_NEC" })
    } else {
      setInputs({ ...inputs, necDropdownSelection: event.target.value })
    }
  }

  /*
  Handler for the infectionSite array. If the checked
  item isn't already in the array, it gets pushed on.
  */
  const handleInfectionSite = (event) => {
    if (event.target.checked) {
      if (!inputs.infectionSite.includes(event.target.value)) {
        inputs.infectionSite.push(event.target.value)
      }
    } else {
      if (inputs.infectionSite.includes(event.target.value)) {
        let temp = inputs.infectionSite.indexOf(event.target.value)
        delete inputs.infectionSite[temp]
        inputs.infectionSite.length -= 1;
      }
    }
    console.log(inputs.infectionSite)
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
  const [showResults, setShowResults] = useState(false); // state for displaying the output widget
  const onClick = (event) => {
    event.preventDefault(); // stops refresh

    // creating the right URL to go to
    const base_url = process.env.REACT_APP_API_LOCATION || "http://localhost:5000";
    const infectionSiteOrder = ["Peritoneal", "CSF", "Blood", "Urine", "Skin_with_Cellulitis"];
    let infectionSite = "No";
    for (let i = 0; i < infectionSiteOrder.length; i++) {
      if (inputs.infectionSite.includes(infectionSiteOrder[i])) {
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
      ['abdominal_involvement']: inputs.necDropdownSelection,
    };
    if (inputs.pathogen == "Yes") {
      if (inputs.nec === "Yes") {
        url = `${base_url}/outputs?time_sent=${inputs.os}&pathogen_isolated=${inputs.pathogenDropdownSelection}&site_of_infection=${infectionSite}&abdominal_involvement=${inputs.necDropdownSelection}`;
        
        const object = {
          ['gestational_age']: inputs.gestationalAge,
          ['postnatal_age']: inputs.postnatalAge,
          ['birth_weight']: inputs.birthWeight,
          ['current_weight']: inputs.currentWeight,
          ['time_sent']: inputs.os,
          ['pathogen_isolated']: inputs.pathogenDropdownSelection,
          ['site_of_infection']: infectionSite,
          ['abdominal_involvement']: inputs.necDropdownSelection,
        };
      } else {
        url = `${base_url}/outputs?time_sent=${inputs.os}&pathogen_isolated=${inputs.pathogenDropdownSelection}&site_of_infection=${infectionSite}&abdominal_involvement=${inputs.nec}`;
        
        const object = {
          ['gestational_age']: inputs.gestationalAge,
          ['postnatal_age']: inputs.postnatalAge,
          ['birth_weight']: inputs.birthWeight,
          ['current_weight']: inputs.currentWeight,
          ['time_sent']: inputs.os,
          ['pathogen_isolated']: inputs.pathogenDropdownSelection,
          ['site_of_infection']: infectionSite,
          ['abdominal_involvement']: inputs.nec,
        };
      }
    }

    if (inputs.gestationalAge && inputs.postnatalAge && inputs.birthWeight && inputs.currentWeight && inputs.os && ((inputs.pathogen === "Yes" && inputs.pathogenDropdownSelection) || (inputs.pathogen === "No")) && (inputs.infectionSite.length !== 0) && ((inputs.nec === "Yes" && inputs.necDropdownSelection) || (inputs.nec === "No"))) {
      setValid(true)
      setShowResults(true); // changes to display only if valid input
      console.log(url)

      const post_url = `${base_url}/create-output`;
      axios.post(post_url, object).then((response) => console.log(response));

      axios.get(url).then((response) => {
        console.log(response)
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
          // TRYING TO GET POST REQUEST WORKING
          // let pathogenOrNo = "No"
          // if (inputs.pathogen === "Yes") {
          //   pathogenOrNo = inputs.pathogenDropdownSelection
          // }
          // let necOrNo = "No"
          // if (inputs.nec === "Yes") {
          //   necOrNo = inputs.necDropdownSelection
          // }
          // const newOutput = {
          //   time_sent: inputs.os,
          //   pathogen_isolated: pathogenOrNo,
          //   site_of_infection: infectionSite,
          //   abdominal_involvement: necOrNo,
          //   antibiotic_treatment: "[INPUT NEEDED]",
          //   antibiotic_treatment_1: "[INPUT NEEDED]",
          //   antibiotic_treatment_2: "[INPUT NEEDED]",
          //   antibiotic_treatment_3: "[INPUT NEEDED]",
          //   antibiotic_treatment_4: "[INPUT NEEDED]",
          //   antibiotic_duration: "[INPUT NEEDED]",
          //   additional_recommendations: "",
          // }

          // axios.post({
          //   url: url,
          //   data: newOutput,
          // })
          // console.log('should be posted to', url)
        }

      })
    }
    setSubmitted(true);


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
    setValid(false);
    setShowResults(false);
    setSubmitted(false);
    setPathogenToggle(false);
    setnecToggle(false);
    document.getElementById("input-form").reset();
    for (let i = 0; i < inputs.infectionSite.length; i++) {
      delete inputs.infectionSite[i];
    }
    inputs.infectionSite.length = 0;
    document.querySelectorAll('input[type="checkbox"]')
    .forEach(el => el.checked = false);

    setInputs({
      ...inputs,
      gestationalAge: "",
      postnatalAge: "",
      birthWeight: "",
      currentWeight: "",
    })
    setOutputDisplay({
      treatment: "n/a",
      treatment1: "n/a",
      treatment2: "n/a",
      treatment3: "n/a",
      treatment4: "n/a",
      duration: "n/a",
      addRecs: "n/a",
      noMatch: false, 
    })
  }


  return (
    <div className="form-container" style={{ backgroundColor: '#F1F1EF', justifyContent: 'center', display: 'flex', marginBottom:"75px" }}>

      <form className="nicu-form" id="input-form" onSubmit={onClick}>
        {/* If the form has been submitted, and it's Valid, print 'Success!' at the top of the page. */}
        {submitted && valid ? <div className="success-message" style={{ color: "green" }}>Success!</div> : null}
        {/* If the form is been submitted but is NOT Valid, print error message instead. */}
        {submitted && !valid ? <div className="failure-message" style={{ color: "red" }}>Form is incomplete.</div> : null}

        <h2 style={{ textAlign: "center" }}>Age and Weight</h2>
        <label className="form-field">Gestational Age (in weeks)</label>

        <br />
        {/* Gestational Age input */}
        <input
          textAlign={'center'}
          value={inputs.gestationalAge}
          onChange={handleGestationalAge}
          type="text"
          className="form-field"
          name="gestationalAge"
        />
        <br />
        {/* Providing an error message if the user tries to submit 
        while the Gestational Age input is empty */}
        {submitted && !inputs.gestationalAge ?
          <span style={{ color: "red" }}> Please fill in this field. </span> : null}

        <br />
        <label className="form-field">Postnatal Age (in days)</label>

        <br />
        {/* Postnatal Age input */}
        <input
          value={inputs.postnatalAge}
          onChange={handlePostnatalAge}
          type="text"
          className="form-field"
          name="postnatalAge"
        />
        < br />
        {/* Providing an error message if the user tries to submit 
        while the Postnatal Age input is empty */}
        {submitted && !inputs.postnatalAge ?
          <span style={{ color: "red" }}>Please fill in this field.</span> : null}

        <br />
        <label className="form-field">Birth Weight (in grams)</label>
        <br />
        {/* Birth Weight input */}
        <input
          value={inputs.birthWeight}
          onChange={handleBirthWeight}
          type="text"
          className="form-field"
          name="birthWeight"
        />
        <br />
        {/* Providing an error message if the user tries to submit 
        while the Birth Weight input is empty */}
        {submitted && !inputs.birthWeight ?
          <span style={{ color: "red" }}>Please fill in this field.</span> : null}

        <br />
        <label className="form-field">Current Weight (in grams)</label>

        <br />
        {/* Current Weight input */}
        <input
          value={inputs.currentWeight}
          onChange={handleCurrentWeight}
          type="text"
          className="form-field"
          name="currentWeight"
        />
        <br />
        {/* Providing an error message if the user tries to submit 
        while the Current Weight input is empty */}
        {submitted && !inputs.currentWeight ?
          <span style={{ color: "red" }}>Please fill in this field.</span> : null}

        <hr />

        <h2 style={{ textAlign: "center" }}>Early-Onset (EOS) or Late-Onset (LOS) Sepsis</h2>
        {/* EOS/LOS input option 1: EOS */}
        <input
          value="EOS"
          onChange={handleOS} // Event handling
          type="radio"
          className="form-field"
          name="os" />
        {' '}<label className="form-field">EOS (less than 72 hours after birth) </label>

        <br />

        {/* EOS/LOS input option 2: LOS */}
        <input
          value="LOS"
          onChange={handleOS}
          type="radio"
          className="form-field"
          name="os"
        // Notice that these radio buttons have the same name 
        //so that only one can be selected at a time
        />
        {' '}<label className="form-field">LOS (72 or more hours after birth)</label>
        <br />
        {/* If the form is submitted and the onset input is missing, print this. */}
        {submitted && !inputs.os ?
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
                onChange={handlePathogen}
                type="radio"
                className="form-field"
                name="pathogen" />
              {' '}<label className="form-field">Yes</label>
            </div>
            <div className="col">
              {/* If yes is selected for the pathogen input, show this dropdown */}
              <input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." onChange={handleSelection} style={{ display: pathogenToggle ? 'block' : 'none' }} />
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


                {/* OLD PATHOGEN DROPDOWN: */}

                {/* <option value="Acinetobacter species">Acinetobacter species</option>
                <option value="Bacteroides species">Bacteroides species</option>
                <option value="Burkholderia species">Burkholderia species</option>
                <option value="Campylobacter species">Campylobacter species</option>
                <option value="Citrobacter species">Citrobacter species</option>
                <option value="E coli">E coli</option>  
                <option value="Enterobacter species">Enterobacter species</option>
                <option value="Enterococcus species">Enterococcus species</option>
                <option value="GBS">GBS</option>
                <option value="Haemophilus species">Haemophilus species</option>
                <option value="Klebsiella species">Klebsiella species</option>
                <option value="Listeria monocytogenes">Listeria monocytogenes</option>
                <option value="Moraxella species">Moraxella species</option>
                <option value="Morganella morganii">Morganella morganii</option>
                <option value="Neisseria species">Neisseria species</option>
                <option value="Pantoea species">Pantoea species</option>
                <option value="Proteus species">Proteus species</option>
                <option value="Pseudomonas species">Pseudomonas species</option>
                <option value="Serratia species">Serratia species</option>
                <option value="Staphylococcus Aureus (MRSA)">Staphylococcus Aureus (MRSA)</option>
                <option value="Staphylococcus Aureus (MSSA)">Staphylococcus Aureus (MSSA)</option>
                <option value="Streptococcus anginosus">Streptococcus anginosus</option>
                <option value="Streptococcus pneumoniae">Streptococcus pneumoniae</option>
                <option value="Streptococcus pyogenes">Streptococcus pyogenes</option> */}
              </datalist>
            </div>
          </div>
        </div>
        {/* If the user selects Yes but doesn't specify
        soemthing from the dropdown, provide this error. */}
        {submitted && (inputs.pathogen === "Yes") && !inputs.pathogenDropdownSelection ?
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
        {submitted && !inputs.pathogen ?
          <span style={{ color: "red" }}>Please fill in this field.</span> : null}
        <hr />


        <h2 style={{ textAlign: "center" }}>Site of Infection</h2>

        <h6 style={{ textAlign: "center" }}>(check all that apply)</h6>
        {/* Inputs for infection sites - can select more than one */}
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
        {/* If the form is submitted and no infection site 
        is selected, print this. */}
        {submitted && (inputs.infectionSite.length === 0) ?
          <span style={{ color: "red" }}>Please fill in this field.</span> : null}

        <hr />
        <h2 style={{ textAlign: "center" }}>Abdominal Involvement Present?</h2>
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
              <input className="form-control" list="datalistOptions2" id="exampleDataList2"
                placeholder="Type to search..." onChange={handleSelection2}
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
        {submitted && (inputs.nec === "Yes") && !inputs.necDropdownSelection ?
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
        {submitted && !inputs.nec ?
          <span style={{ color: "red" }}>Please fill in this field.</span> : null}
        <br />
        <br />

        <div className="btn-toolbar" style={{ justifyContent: 'center', display: 'flex'  }}>
          <div className="btn-group mr-2" style={{ fontSize: 'xxx-large' }}>
            <SubmitButton onClick={onClick} className="form-button" />
          </div>
          <div className="btn-group mr-2" style={{ fontSize: 'xxx-large' }}>
            <ClearButton onClear={onClear} className="form-button" />
          </div>
        </div>
        <div style={{ justifyContent: 'center', display: 'flex'  }}>
        {showResults && <OutputWidget inputs={inputs} outputDisplay={outputDisplay} style={{ display: 'block'}} />}

        </div>

      </form>
      <br />
    </div>
  )
};
export default FormComponent; // Exporting so that we can use in App.js