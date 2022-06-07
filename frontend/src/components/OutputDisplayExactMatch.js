import { Carousel } from 'react-bootstrap';
import narrow_b from './narrow_b.png'
import Toggle from './Toggle';
import TreatmentInfo from './TreatmentInfo';

function OutputDisplayExactMatch({ inputs, outputDisplay, setOutputInputs }) {
  /* If there was an exact match, display them. */
  
  const slidesStyle1 = {
    fontSize: 20,
    color: "black",
    textAlign: "center",
    backgroundColor: 'lightgray'
  }

  const slidesStyle2 = {
    fontSize: 20,
    color: "black",
    textAlign: "center",
  }

  const susceptibilityKnown = (inputs.susceptible === 'Known');

  return (
    <div>
      <Toggle
        checked={susceptibilityKnown}
        onChecked="Culture and susceptibility results known"
        onUnchecked="Pending culture or susceptibility results"
        handleChange={(checked) => { setOutputInputs({...inputs, susceptible: susceptibilityKnown ? 'Pending' : 'Known'}); }}
      />

      {/* pending culture or susceptibility results */}
      <div className="container" style={{ display: susceptibilityKnown ? 'none' : 'block' }}>
        <div style={{ padding: '10px' }}>
          <h5 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Antibiotic Treatment</h5>
          <p style={slidesStyle2}> {outputDisplay.treatment}</p>
          <TreatmentInfo />
        </div>
      </div>          
      
      {/* culture or susceptibility results known */}
      <div className="container" style={{ display: susceptibilityKnown ? 'inline-block' : 'none' }}>
        <img src={narrow_b} style={{ maxWidth: "100%", margin: "auto" }}/>
      </div>

      <div className="container" style={{ display: susceptibilityKnown ? 'inline-block' : 'none' }}>
        <Carousel variant="dark" className='carousel-control'>
          <Carousel.Item style={{paddingBottom: "10px"}} >
            <h3 style={slidesStyle1} >Antibiotic Treatment 1st Choice</h3>
            <p style={slidesStyle2}>{outputDisplay.treatment1}</p>
            <TreatmentInfo />
            <Carousel.Caption>
              
            </Carousel.Caption>
          </Carousel.Item >
          <Carousel.Item style={{paddingBottom: "10px"}} >
            <h3 style={slidesStyle1}>Antibiotic Treatment 2nd Choice</h3>
            <p style={slidesStyle2}>{outputDisplay.treatment2}</p>
            <TreatmentInfo />
            <Carousel.Caption>
              
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item style={{paddingBottom: "10px"}} >
            <h3 style={slidesStyle1}>Antibiotic Treatment 3rd Choice</h3>
            <p style={slidesStyle2}>{outputDisplay.treatment3}</p>
            <TreatmentInfo />
            <Carousel.Caption>
              
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item style={{paddingBottom: "10px"}} >
            <h3 style={slidesStyle1}>Antibiotic Treatment 4th Choice</h3>
            <p style={slidesStyle2}>{outputDisplay.treatment4}</p>
            <TreatmentInfo />
            <Carousel.Caption>
              
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="container">
        <div style={{ padding: '10px' }}>
          <h5 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Antibiotic Treatment Duration</h5>
          <p style={slidesStyle2}>{outputDisplay.duration}</p>
        </div>
        <div style={{ padding: '10px', display: outputDisplay.addRecs ? 'block' : 'none'}}>
          <h5 style={{ backgroundColor: 'lightgray', textAlign: 'center' }}>Additional Recommendations</h5>
          {outputDisplay.addRecs}
        </div>
      </div>
    </div>
  )
}

export default OutputDisplayExactMatch;