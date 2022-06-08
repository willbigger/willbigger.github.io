import { Carousel,Table } from 'react-bootstrap';
import React from 'react';

function OutputDisplayLOSSpecialCase({ inputs }) {
  const slidesStyle2 = {
    fontSize: 20,
    color: "black",
    textAlign: "center",
  }

  const slidesStyle1 = {
    fontSize: 20,
    color: "black",
    textAlign: "center",
    backgroundColor: 'lightgray'
  }
  const outputDisplay = {
    treatment: "Nafcillin, Gentamicin",
    duration: "48 hours",
    addRecs: "COVER 24 hours-Ampicllin 50 mg/kg at 0,12 hours, AND Gentamicin 4 mg/kg (one dose)"
  }
  let dose ="";
  if (inputs.gestationalAge<30&&inputs.postnatalAge>=0&&inputs.postnatalAge<=7) {
    dose = "4mg/kg, One dose at 0 hours."
  }
  if (inputs.gestationalAge<30&&inputs.postnatalAge>=8&&inputs.postnatalAge<=28) {
    dose = "4mg/kg, One dose at 0 hours, another does at 36 hours."
  }
  if (inputs.gestationalAge<30&&inputs.postnatalAge>28) {
    dose = "4mg/kg, One dose at 0 hours, another does at 24 hours."
  }
  if (inputs.gestationalAge>=30&&inputs.gestationalAge<=34&&inputs.postnatalAge>=0&&inputs.postnatalAge<=7) {
    dose = "4mg/kg, One dose at 0 hours, another does at 36 hours."
  }
  if (inputs.gestationalAge>=30&&inputs.gestationalAge<=34&&inputs.postnatalAge>=8&&inputs.postnatalAge<=28) {
    dose = "4mg/kg, One dose at 0 hours, another does at 24 hours."
  }
  if (inputs.gestationalAge>=30&&inputs.gestationalAge<=34&&inputs.postnatalAge>28) {
    dose = "4mg/kg, One dose at 0 hours, another does at 24 hours."
  }
  if (inputs.gestationalAge>=35&&inputs.gestationalAge<=47&&inputs.postnatalAge>=0&&inputs.postnatalAge<=7) {
    dose = "4mg/kg, One dose at 0 hours, another does at 24 hours."
  }
  if (inputs.gestationalAge>=35&&inputs.gestationalAge<=47&&inputs.postnatalAge>=8&&inputs.postnatalAge<=28) {
    dose = "4mg/kg, One dose at 0 hours, another does at 24 hours."
  }
  if (inputs.gestationalAge>=35&&inputs.gestationalAge<=47&&inputs.postnatalAge>=28) {
    dose = "4mg/kg, One dose at 0 hours, another does at 24 hours."
  }

  return (
    <div>
      <div className="container">
        <div style={{ padding: '10px' }}>
          <h5 style={{  backgroundColor: 'orange', textAlign: "center", borderRadius:"5px"  }}>Antibiotic Treatment</h5>
          <dl style={{ columnCount: 2, textAlign: 'center' }}>
          <br/>
            <dt> Nafcillin or Oxacillin</dt>

            <dd>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>12 Hour</th>
                    <th>8 Hour</th>
                    <th>6 Hour</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Last dose at 36 hours after first</td>
                    <td>Last dose at 42 hours after first</td>
                    <td>Last dose at 42 hours after first</td>
                  </tr>
                </tbody>
              </Table>
            </dd>
            <br/>
            <dt>Gentamicin</dt>
            <br/>
            <dd>
              {dose}
              <br/><br/>
            </dd>
            
          </dl>
        </div>
      </div>

      <div className="container">
        <div style={{ padding: '10px' }}>
          <h5 style={{  backgroundColor: 'orange', textAlign: "center", borderRadius:"5px"  }}>Special Notes</h5>
          <p style={slidesStyle2}>If ECMO or Therapeutic Hypothermia: One dose at 0 hours, another does at 36 hours.</p>
          <p style={slidesStyle2}>For infants ≥ 48 weeks PMA, dosing is 5mg/kg at 0 and 24 hours</p>
        </div>
      </div>

      <div className="container">
        <div style={{ padding: '10px' }}>
          <h5 style={{  backgroundColor: 'orange', textAlign: "center", borderRadius:"5px"  }}>Antibiotic Treatment 1st Choice</h5>
          <p style={slidesStyle2}>Ampicillin, Gentamicin</p>
        </div>
      </div>

      <div className="container">
        <div style={{ padding: '10px' }}>
          <h5 style={{  backgroundColor: 'orange', textAlign: "center", borderRadius:"5px" }}>Antibiotic Treatment 2nd Choice</h5>
          <p style={slidesStyle2}>Vancomycin, Gentamicin</p>
        </div>
      </div>


      <div className="container">
        <div style={{ padding: '10px' }}>
          <h5 style={{  backgroundColor: 'orange', textAlign: "center", borderRadius:"5px" }}>Antibiotic Treatment Duration</h5>
          <p style={slidesStyle2}>{outputDisplay.duration}</p>
        </div>
      </div>
    </div>
  )
}


export default OutputDisplayLOSSpecialCase;