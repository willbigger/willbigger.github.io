import React from "react";
import flow from './aboutlogic.png'
import './About.css';

// About page
function About() {
  return (
    <div className="about container">
      <div className="row">
        <div className="col">
          <h2>About</h2>
        </div>
      </div>
      <div className="row">
        <div className="about-text col">
          <p>
            This web-based application is a program to aid neonatal clinicians in evidenced-based antibiotic stewardship.
            By entering just a few inputs, this web-app will give guidance to:
          </p>
          <ul>
            <li>Stop or use fewer doses and days of antibiotics when cultures are negative</li>
            <li>Help guide clinicians to select the narrowest spectrum of antibiotics for treatment when pathogens are isolated</li>
          </ul>
          <p>
            As neonatal clinicians, we make multiple antibiotic decisions every day.
            We hope having stewardship guidance available 24 hours a day will aid in evidenced-based decisions.
            Additionally, as many centers do not have neonatal antibiotic stewardship programs,
            we hope this web-app will help to raise stewardship awareness in those institutions and supplement stewardship in centers with existing programs.
          </p>
          <p>
            Data has emerged in the past few years supporting covering a shorter time period with sepsis evaluations when there is no pathogen identified from cultures.
            The time period in most cases can be 24 hours for early-onset and 48 hours for late-onset infections.
            This web-app also provides guidance to reduce the number of doses of antibiotics given.
            For example, to cover 24 hours for early-onset infections with extended-interval gentamicin dosing,
            only one dose of gentamicin is needed to cover 24 hours and if 12-hour dosing is used for ampicillin, only 2 doses are needed to cover the 24-hour period.
            This web-app will help reduce the number of antibiotic doses required to cover the needed time period.
          </p>
          <img src={flow} alt="" />
        </div>
      </div>
    </div>
  );
}

export default About;
