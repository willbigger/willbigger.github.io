import { Carousel} from 'react-bootstrap';
import React from 'react';
import OutputScaleSpec from './OutputScaleSpec1';
import './OutputScale.css';
function OutputDisplayLOSSpecialCase({ inputs , carouselIndex, setCarouselIndex }) {
  
  const handleSelect = (selectedIndex) => {
    setCarouselIndex(selectedIndex);
  };
  
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
  if (inputs.postnatalAge>=48) {
    gentamicinDose = "5mg/kg at 0 and 24 hours."
  }
  let NafcillinDose ="";
  if (inputs.currentWeight >2000 &&inputs.postnatalAge>7){
    NafcillinDose = "25 mg/kg(50 mg/kg for Meningitis at every 6 hours"
  }
  if (inputs.currentWeight <=2000 &&inputs.postnatalAge>7){
    NafcillinDose = "25 mg/kg(50 mg/kg for Meningitis at every 8 hours"
  }
  if (inputs.currentWeight >2000 &&inputs.postnatalAge<=7){
    NafcillinDose = "25 mg/kg(50 mg/kg for Meningitis at every 8 hours"
  }
  if (inputs.currentWeight <=2000 &&inputs.postnatalAge<=7){
    NafcillinDose = "25 mg/kg(50 mg/kg for Meningitis at every 12 hours"
  }


  return (
    <div>
      <section>
        <h3>Antibiotic Treatment</h3>
        <dl>
          <dt>Nafcillin or Oxacillin</dt>
          <dd>{NafcillinDose}</dd>
          <dt>Gentamicin</dt>
          <dd>{gentamicinDose}</dd>
        </dl>
      </section>

      <h3>Alternative Antibiotic Treatment</h3>
      <section>
        <OutputScaleSpec activeIndex={carouselIndex} onSelect={handleSelect} />
          <Carousel
            activeIndex={carouselIndex}
            controls={false}
            slide={false}
            fade={true}
            indicators={false}
            interval={null}
            wrap={false}
          >
            <Carousel.Item>
              <p></p>
              <p className='under'>Ampicillin, Gentamicin</p>
              <p>(Preferred if concern for gastrointestinal disease or urinary tract infection)</p>
            </Carousel.Item >
            <Carousel.Item>
              <p></p>
              <p className='under'>Vancomycin, Gentamicin</p>
              <p>(Preferred coverage if MRSA colonization/previous infection)</p>
            </Carousel.Item>
          </Carousel>
        
      </section>


      <section className='center'>
        <h3>Special Notes</h3>
        <p>If ECMO or Therapeutic Hypothermia: </p>
        <p>one dose at 0 hours, another dose at 36 hours.</p>
      </section>

      

      <section>
        <h3>Antibiotic Treatment Duration</h3>
        <p>48 hours</p>
      </section>
    </div>
  )
}


export default OutputDisplayLOSSpecialCase;