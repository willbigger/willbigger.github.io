import React, { useState } from 'react';
import OutputWidget from './OutputWidget';
import SubmitButton from './SubmitButton';
import ClearButton from './ClearButton';
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
    infectionSiteBlood: "",
    infectionSiteUrine: "",
    infectionSiteCSF: "",
    infectionSitePeritoneal: "",
    infectionSiteSkin: "",
    nec: "",
    necDropdownSelection: "",
  });

  /*
  This is the variable 'submitted' stored as a state variable.
   */
  const [submitted, setSubmitted] = useState(false); // Initially false

  const [pathogenToggle, setPathogenToggle] = useState(false); // Initially false

  const [necToggle, setnecToggle] = useState(false); // Initially false

  /*
  This is the variable 'valid' stored as a state variable,
  which will be used ot make sure all inputs are filled out.
   */
  const [valid, setValid] = useState(false); // Initially false

  const handleGestationalAge = (event) => {
    setInputs({ ...inputs, gestationalAge: event.target.value })
  }

  const handlePostnatalAge = (event) => {
    setInputs({ ...inputs, postnatalAge: event.target.value })
  }

  const handleBirthWeight = (event) => {
    setInputs({ ...inputs, birthWeight: event.target.value })
  }

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
  Similar to the onset variable, this one
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

  const handleSelection = (event) => {
    setInputs({ ...inputs, pathogenDropdownSelection: event.target.value })
  }
  const handleSelection2 = (event) => {
    setInputs({ ...inputs, necDropdownSelection: event.target.value })
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

  const [showResults, setResults] = useState(false); // state for displaying the output widget
  const onClick = (event) => {
    event.preventDefault(); // stops refresh
    if (inputs.gestationalAge && inputs.postnatalAge && inputs.birthWeight && inputs.currentWeight && inputs.os && ((inputs.pathogen === "Yes" && inputs.pathogenDropdownSelection) || (inputs.pathogen === "No")) && (inputs.infectionSiteBlood || inputs.infectionSiteUrine || inputs.infectionSiteCSF || inputs.infectionSitePeritoneal || inputs.infectionSiteSkin) && ((inputs.nec === "Yes" && inputs.necDropdownSelection) || (inputs.nec === "No"))) {
      setValid(true)
      setResults(true); // changes to display only if valid input
    }
    setSubmitted(true);
  }



  const onClear = (event) => {
    event.preventDefault(); // stops refresh
    setValid(false);
    setResults(false);
    setSubmitted(false);
    document.getElementById("input-form").reset();

    setInputs({ ...inputs,
      gestationalAge: "",
      postnatalAge: "",
      birthWeight: "",
      currentWeight: "",
    })
  }


  return (
    <div className="form-container" style={{ backgroundColor: '#F1F1EF', justifyContent: 'center', display: 'flex' }}>

      <form className="nicu-form" id="input-form" onSubmit={onClick}>
        {/* If the form has been submitted, and it's Valid, print 'Success!' at the top of the page. */}
        {submitted && valid ? <div className="success-message" style={{ color: "green" }}>Success!</div> : null}
        {/* If the form is been submitted but is NOT Valid, print error message instead. */}
        {submitted && !valid ? <div className="failure-message" style={{ color: "red" }}>Form is incomplete.</div> : null}

        <h2 style={{ textAlign: "center" }}>Age and Weight</h2>
        <label className="form-field">Gestational Age (in weeks)</label>

        <br />
        <input
          textAlign={'center'}
          value={inputs.gestationalAge}
          onChange={handleGestationalAge}
          type="text"
          className="form-field"
          name="gestationalAge"
        />
        <br />
        {submitted && !inputs.gestationalAge ? <span style={{ color: "red" }}> Please fill in this field.</span> : null}

        <br />
        <label className="form-field">Postnatal Age (in days)</label>

        <br />
        <input
          value={inputs.postnatalAge}
          onChange={handlePostnatalAge}
          type="text"
          className="form-field"
          name="postnatalAge"
        />
        < br />
        {submitted && !inputs.postnatalAge ? <span style={{ color: "red" }}>Please fill in this field.</span> : null}

        <br />
        <label className="form-field">Birth Weight (in grams)</label>
        <br />

        <input
          value={inputs.birthWeight}
          onChange={handleBirthWeight}
          type="text"
          className="form-field"
          name="birthWeight"
        />
        <br />
        {submitted && !inputs.birthWeight ? <span style={{ color: "red" }}>Please fill in this field.</span> : null}

        <br />
        <label className="form-field">Current Weight (in grams)</label>

        <br />
        <input
          value={inputs.currentWeight}
          onChange={handleCurrentWeight}
          type="text"
          className="form-field"
          name="currentWeight"
        />
        <br />
        {submitted && !inputs.currentWeight ? <span style={{ color: "red" }}>Please fill in this field.</span> : null}

        <hr />

        <h2 style={{ textAlign: "center" }}>Early-Onset (EOS) or Late-Onset (LOS) Sepsis</h2>
        <input
          value="EOS"
          onChange={handleOS} // Event handling
          type="radio"
          className="form-field"
          name="os" />
        {' '}<label className="form-field">EOS (less than 72 hours after birth) </label>

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
        {' '}<label className="form-field">LOS (72 or more hours after birth)</label>
        <br />
        {/* If the form is submitted and the onset input is missing, print this. */}
        {submitted && !inputs.os ? <span style={{ color: "red" }}>Please fill in this field.</span> : null}
        <hr />

        <h2 style={{ textAlign: "center" }}>Pathogen Isolated</h2>
        <h6 style={{ textAlign: "center" }}>(can enter gram stain or specific species)</h6>

        <div class="container">
          <div class="row">
            <div class="col">
              <input
                value="Yes"
                onChange={handlePathogen}
                type="radio"
                className="form-field"
                name="pathogen" />
              {' '}<label className="form-field">Yes</label>
            </div>
            <div class="col">
              {/* <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." onChange={handleSelection} /> */}
              {/* Uncomment this line to toggle visibilty*/}
              <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." onChange={handleSelection} style={{ visibility: pathogenToggle ? 'visible' : 'hidden' }} />
              <datalist id="datalistOptions">
                <option value=""></option>
                <option value="Acinetobacter species">Acinetobacter species</option>
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
                <option value="Streptococcus pyogenes">Streptococcus pyogenes</option>
              </datalist>
            </div>
          </div>
        </div>
        {submitted && (inputs.pathogen === "Yes") && !inputs.pathogenDropdownSelection ? <span style={{ color: "red" }}>Please fill in this field.</span> : null}

        <br />

        <div class="container">
          <div class="row">
            <div class="col">
              <input
                value="No"
                onChange={handlePathogen}
                type="radio"
                className="form-field"
                name="pathogen" />
              {' '}<label className="form-field">No</label>
            </div>
            <div class="col">
              <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." onChange={handleSelection} style={{ visibility: 'hidden' }} />
              <datalist id="datalistOptions">
              </datalist>
            </div>
          </div>
        </div>
        <br />
        {/* If the form is submitted and pathogen isolation isn't specified, print this. */}
        {submitted && !inputs.pathogen ? <span style={{ color: "red" }}>Please fill in this field.</span> : null}
        <hr />


        <h2 style={{ textAlign: "center" }}>Site of Infection</h2>
        <h6 style={{ textAlign: "center" }}>(check all that apply)</h6>

        <input
          value={inputs.infectionSiteBlood}
          onChange={handleInfectionSiteBlood}
          type="checkbox"
          className="form-field"
          name="infectionSiteBlood" />
        {' '}<label className="form-field">Blood</label>

        <br />

        <input
          value={inputs.infectionSiteUrine}
          onChange={handleInfectionSiteUrine}
          type="checkbox"
          className="form-field"
          name="infectionSiteUrine" />
        {' '}<label className="form-field">Urine</label>

        <br />

        <input
          value={inputs.infectionSiteCSF}
          onChange={handleInfectionSiteCSF}
          type="checkbox"
          className="form-field"
          name="infectionSiteCSF" />
        {' '}<label className="form-field">CSF</label>

        <br />

        <input
          value={inputs.infectionSitePeritoneal}
          onChange={handleInfectionSitePeritoneal}
          type="checkbox"
          className="form-field"
          name="infectionSitePeritoneal" />
        {' '}<label className="form-field">Peritoneal</label>

        <br />

        <input
          value={inputs.infectionSiteSkin}
          onChange={handleInfectionSiteSkin}
          type="checkbox"
          className="form-field"
          name="infectionSiteSkin" />
        {' '}<label className="form-field">Skin with Cellulitis</label>

        <br />
        {/* If the form is submitted and no infection site is selected, print this. */}
        {submitted && !inputs.infectionSiteBlood && !inputs.infectionSiteUrine && !inputs.infectionSiteCSF && !inputs.infectionSitePeritoneal && !inputs.infectionSiteSkin ? <span style={{ color: "red" }}>Please fill in this field.</span> : null}
        <hr />
        <h2 style={{ textAlign: "center" }}>Abdominal Involvement Present?</h2>

        <div class="container">
          <div class="row">
            <div class="col">
              <input
                value="Yes"
                onChange={handleNEC}
                type="radio"
                className="form-field"
                name="nec" />
              {' '}<label className="form-field">Yes</label>

            </div>


            <div class="col">
              <input class="form-control" list="datalistOptions2" id="exampleDataList2" placeholder="Type to search..." onChange={handleSelection2} style={{ visibility: necToggle ? 'visible' : 'hidden' }} />
              <datalist id="datalistOptions2">
                <option value=""></option>
                <option value="Medical NEC">Medical NEC</option>
                <option value="Surgical NEC">Surgical NEC</option>
                <option value="SIP">SIP</option>
              </datalist>

            </div>
          </div>
        </div>
        {submitted && (inputs.nec === "Yes") && !inputs.necDropdownSelection ? <span style={{ color: "red" }}>Please fill in this field.</span> : null}

        <br />
        <div class="container">
          <div class="row">
            <div class="col">
              {/* <br /> */}
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
        {submitted && !inputs.nec ? <span style={{ color: "red" }}>Please fill in this field.</span> : null}
        <br />
        <br />

        <div className="btn-group">
          <SubmitButton onClick={onClick} className="form-button" />
          {showResults && <OutputWidget inputs={inputs} />}
          <ClearButton onClear={onClear} className="form-button" />

        </div>
      </form>
    </div>
  )
};
export default FormComponent; // Exporting so that we can use in App.js