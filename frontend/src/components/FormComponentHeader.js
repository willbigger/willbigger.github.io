import baby from "./baby.jpg";

import './FormComponentHeader.css';

function FormComponentHeader() {
  return (
    <header>
      <div class="header-container">
        <div class="header-img" style={{backgroundImage: `url(${baby})`}}></div>
        <div class="header-text">
          <p>This web-based application is a tool to aid neonatal clinicians in evidenced-based antibiotic stewardship. By entering a few inputs, this web-app will give guidance to:</p>
          <ul>
            <li>Stop or use fewer doses and days of antibiotics when cultures are negative</li>
            <li>Select specific antibiotics based on patient's risk factors and clinician's assessment when performing sepsis evaluations</li>
            <li>Help guide clinicians to select the narrowest spectrum of antibiotics for treatment when pathogens are isolated</li>
          </ul>
        </div>
      </div>
    </header>
  )
}

export default FormComponentHeader;