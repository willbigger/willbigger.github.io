import { Carousel,Table } from 'react-bootstrap';
import React from 'react';

function OutputDisplayLOSSpecialCase({ inputs }) {
  let gentamicinDose ="";
  if (inputs.gestationalAge<30&&inputs.postnatalAge>=0&&inputs.postnatalAge<=7) {
    gentamicinDose = "4mg/kg, one dose at 0 hours."
  }
  if (inputs.gestationalAge<30&&inputs.postnatalAge>=8&&inputs.postnatalAge<=28) {
    gentamicinDose = "4mg/kg, one dose at 0 hours, another dose at 36 hours."
  }
  if (inputs.gestationalAge<30&&inputs.postnatalAge>28) {
    gentamicinDose = "4mg/kg, one dose at 0 hours, another dose at 24 hours."
  }
  if (inputs.gestationalAge>=30&&inputs.gestationalAge<=34&&inputs.postnatalAge>=0&&inputs.postnatalAge<=7) {
    gentamicinDose = "4mg/kg, one dose at 0 hours, another dose at 36 hours."
  }
  if (inputs.gestationalAge>=30&&inputs.gestationalAge<=34&&inputs.postnatalAge>=8&&inputs.postnatalAge<=28) {
    gentamicinDose = "4mg/kg, one dose at 0 hours, another dose at 24 hours."
  }
  if (inputs.gestationalAge>=30&&inputs.gestationalAge<=34&&inputs.postnatalAge>28) {
    gentamicinDose = "4mg/kg, one dose at 0 hours, another dose at 24 hours."
  }
  if (inputs.gestationalAge>=35&&inputs.gestationalAge<=47&&inputs.postnatalAge>=0&&inputs.postnatalAge<=7) {
    gentamicinDose = "4mg/kg, one dose at 0 hours, another dose at 24 hours."
  }
  if (inputs.gestationalAge>=35&&inputs.gestationalAge<=47&&inputs.postnatalAge>=8&&inputs.postnatalAge<=28) {
    gentamicinDose = "4mg/kg, one dose at 0 hours, another dose at 24 hours."
  }
  if (inputs.gestationalAge>=35&&inputs.gestationalAge<=47&&inputs.postnatalAge>=28) {
    gentamicinDose = "4mg/kg, one dose at 0 hours, another dose at 24 hours."
  }

  return (
    <div>
      <section>
        <h3>Antibiotic Treatment</h3>
        <dl>
          <dt>Nafcillin or Oxacillin</dt>
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
          <dd>{gentamicinDose}</dd>
        </dl>
      </section>

      <section>
        <h3>Special Notes</h3>
        <ul>
          <li>If ECMO or Therapeutic Hypothermia: one dose at 0 hours, another dose at 36 hours.</li>
          <li>For infants ≥ 48 weeks PMA, dosing is 5mg/kg at 0 and 24 hours.</li>
        </ul>
      </section>

      <section>
        <h3 className="choice-1">Antibiotic Treatment 1st Choice</h3>
        <p>Ampicillin, Gentamicin</p>
      </section>

      <section>
        <h3 className="choice-2">Antibiotic Treatment 2nd Choice</h3>
        <p>Vancomycin, Gentamicin</p>
      </section>

      <section>
        <h3>Antibiotic Treatment Duration</h3>
        <p>48 hours</p>
      </section>
    </div>
  )
}


export default OutputDisplayLOSSpecialCase;