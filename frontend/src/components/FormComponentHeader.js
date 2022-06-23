import baby from "./baby.jpg";

import './FormComponentHeader.css';

function FormComponentHeader() {
  return (
    <header style={{backgroundImage: `url(${baby})`}}>
      <h1 className="header">
        This web-based application is a tool to aid neonatal clinicians in evidenced-based antibiotic stewardship. By entering a few inputs, this web-app will give guidance to:
        Stop or use fewer doses and days of antibiotics when cultures are negative
        Select specific antibiotics based on patient’s risk factors and clinician’s assessment when performing sepsis evaluations
        Help guide clinicians to select the narrowest spectrum of antibiotics for treatment when pathogens are isolated
      </h1>
    </header>
  )
}

export default FormComponentHeader;