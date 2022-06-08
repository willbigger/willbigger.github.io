function OutputDisplayEOSSpecialCase() {
  const slidesStyle2 = {
    fontSize: 20,
    color: "black",
    textAlign: "center",
  }

  const outputDisplay = {
    treatment: "Ampicilin, Gentamicin",
    duration: "24 hours",
    addRecs: "COVER 24 hours-Ampicllin 50 mg/kg at 0,12 hours, AND Gentamicin 4 mg/kg (one dose)"
  }

  return (
    <div>
      <div className="container">
        <div style={{ padding: '10px' }}>
          <h5 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Antibiotic Treatment</h5>
          <dl style={{ columnCount: 2, textAlign: 'center' }}>
            <dt>Ampicilin</dt>
            <dd>50 mg/kg at 0,12 hours</dd>
            <dt>Gentamicin</dt>
            <dd>4 mg/kg (one dose)</dd>
          </dl>
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

export default OutputDisplayEOSSpecialCase;