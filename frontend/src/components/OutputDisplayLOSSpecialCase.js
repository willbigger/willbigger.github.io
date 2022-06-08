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
  let time ="";
  if (inputs.gestationalAge<30&&inputs.postnatalAge>=0&&inputs.postnatalAge<=7) {
    dose = 1
    time= 0
  }
  if (inputs.gestationalAge<30&&inputs.postnatalAge>=8&&inputs.postnatalAge<=28) {
    time ="0, 36"
  }
  if (inputs.gestationalAge>=30&&inputs.gestationalAge<=34&&inputs.postnatalAge>=0&&inputs.postnatalAge<=7) {
    time ="0, 36"
  }
  if (inputs.gestationalAge<30&&inputs.postnatalAge>=28) {
    time ="0, 24"
  }
  if (inputs.gestationalAge>=30&&inputs.gestationalAge<=34&&inputs.postnatalAge>7) {
    time ="0, 36"
  }
  if (inputs.gestationalAge>=35&&inputs.gestationalAge<=37) {
    time ="0, 36"
  }
  if (dose ==="" && time ===""){
    dose = "Not Specified"
  }

  return (
    <div>
      <div className="container">
        <div style={{ padding: '10px' }}>
          <h5 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Antibiotic Treatment</h5>
          <dl style={{ columnCount: 2, textAlign: 'center' }}>
            <dt> Nafcillin or Oxacillin</dt>
            <br/>
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
            <dt>Gentamicin</dt>
            <br/>
            <dd>
              {dose} dose at {time} hours.
              <br/><br/>
            </dd>
            
          </dl>
        </div>
      </div>

      <div className="container">
        <div style={{ padding: '10px' }}>
          <h5 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Antibiotic Treatment 1st Choice</h5>
          <p style={slidesStyle2}>Ampicillin, Gentamicin</p>
        </div>
      </div>

      <div className="container">
        <div style={{ padding: '10px' }}>
          <h5 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Antibiotic Treatment 2nd Choice</h5>
          <p style={slidesStyle2}>Vancomycin, Gentamicin</p>
        </div>
      </div>


      <div className="container">
        <div style={{ padding: '10px' }}>
          <h5 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Antibiotic Treatment Duration</h5>
          <p style={slidesStyle2}>{outputDisplay.duration}</p>
        </div>
      </div>
    </div>
  )
}


export default OutputDisplayLOSSpecialCase;