import React from "react";

function About() {
  return (
    <div style={{ backgroundColor: '#F1F1EF' }}>
      <h3>About:</h3>
        {/* About:
      <br />
      <br /> */}


This web-based application is a program to aid neonatal clinicians in evidenced-based antibiotic stewardship. By entering just a few inputs, this web-app will give guidance to:
      <br />
      <br />

      <ul>
        <li>
          Stop or use fewer doses and days of antibiotics when cultures are negative
        </li>
        <li>
          Help guide clinicians to select the narrowest spectrum of antibiotics for treatment when pathogens are isolated

        </li>

      </ul>


As neonatal clinicians, we make multiple antibiotic decisions every day. We hope having stewardship guidance available 24 hours a day will aid in evidenced-based decisions.  Additionally, as many centers do not have neonatal antibiotic stewardship programs, we hope this web-app will help to raise stewardship awareness in those institutions and supplement stewardship in centers with existing programs.

<br />
<br />

Data has emerged in the past few years supporting covering a shorter time period with sepsis evaluations when there is no pathogen identified from cultures. The time period in most cases can be 24 hours for early-onset and 48 hours for late-onset infections. This web-app also provides guidance to reduce the number of doses of antibiotics given. For example, to cover 24 hours for early-onset infections with extended-interval gentamicin dosing, only one dose of gentamicin is needed to cover 24 hours and if 12-hour dosing is used for ampicillin, only 2 doses are needed to cover the 24-hour period. This web-app will help reduce the number of antibiotic doses required to cover the needed time period.

    </div>
  );
}

export default About;