import React, {useEffect, useState} from 'react';
// import React from 'react';
//import { Collapse, Button } from 'antd';
import "antd/dist/antd.css";
// import Button from 'react-bootstrap/Button';
// import Collapse from 'react-bootstrap/Collapse';
import { Collapse } from 'antd';
import Table from 'react-bootstrap/Table'
const { Panel } = Collapse;

// import Fade from 'react-bootstrap/Fade';

//import Accordion from 'react-bootstrap/Accordion';

// import { View, StyleSheet } from 'react-native';
// import { Text } from 'react-native-paper';
// import { Text, StyleSheet } from "react-native";

// import Table from 'react-bootstrap/Table';

// import flow from './aboutlogic'
// <h5 style={{textAlign: "center", fontWeight: 'bold', backgroundColor: 'white'}}>Is it safe to only cover a period of 24 hours for Early-Onset Sepsis (EOS) evaluations?</h5>
// import ReactDOM, { render } from 'react-dom';
// import { Provider} from 'react-redux';

// import { Text, StyleSheet } from "react-native";
// import Card from 'react-bootstrap/Card'
// import CardGroup from 'react-bootstrap/CardGroup'

// import { useAccordionButton } from 'react-bootstrap/AccordionButton';

// https://react-bootstrap.github.io/components/accordion/

// import classNames from "classnames";
// import { accordionData } from './utils/content';
// import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useAccordionButton } from 'react-bootstrap/AccordionButton';
// FAQ Page
// https://react-bootstrap.github.io/components/accordion/ 
// <Text style={{ fontSize: 10 }}> , fontSize: 10

const fontStyles = ["normal", "italic", "bold"];

function BoldText({children}) {
  return <span style={{fontWeight: 'bold'}}>{children}</span>;
}

/* const styles = StyleSheet.create({
  bold: {fontWeight: 'bold'},
  italic: {fontStyle: 'italic'},
  underline: {textDecorationLine: 'underline'}
}) 
*/ 

function FAQ () {
  const [open, setOpen] = useState(false);
  const { height, width } = useWindowDimensions();
  return (
    <div style={{
      display: 'block', width: width*0.9, padding: 30
    }}>
    <h2 style={{textAlign: "center"}}>FAQ</h2>
    <Collapse>
      <Panel header="Is it safe to only cover a period of 24 hours for Early-Onset Sepsis (EOS) evaluations?" key="1">  
        <p>Yes. Several studies and meta-analyses have demonstrated that EOS pathogens are isolated within 24 hours of the blood culture being obtained.</p>
      
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Study</th>
              <th><a href="Population"target="_blank">Population</a></th>
              <th><a href="Findings"target="_blank">Findings</a></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Marks et al. 2020 <p><a href="https://pubmed.ncbi.nlm.nih.gov/32621356/" target="_blank">https://pubmed.ncbi.nlm.nih.gov/32621356/</a><br></br></p></td>
              <td>EOS Blood cultures <p><br></br>1. ≥34 weeks GA <br></br>2. Meta-analysis of 6 studies of PT and FT infants<br></br></p></td>
              <td><p>1. All pathogenic blood cultures collected pre-therapy from neonates suspected of EOS returned a positive result within 24 hours of incubation.<br></br>2. Similar EOS studies have found that 92–100% of blood cultures are positive by 24 hours.</p></td>
            </tr>
            <tr>
              <td>De Rose et al. 2021 <p><a href="https://pubmed.ncbi.nlm.nih.gov/33525647/" target="_blank">https://pubmed.ncbi.nlm.nih.gov/33525647/</a><br></br></p></td>
              <td>EOS Blood cultures <p><br></br>≥34 weeks GA <br></br></p></td>
              <td>Time to positivity (TTP) of pathogens was 17.7 ± 12.5 hours vs. 80.5 ± 55.8 hours of contaminants (p = 0.003). The TTP of positive blood culture {'<'}12 hours in 80% of cases. Admission CRP levels were similar in infants with  positive and negative blood cultures (p = 0.067).</td>
            </tr>
            <tr>
              <td>Guerti et al. 2011 <p><a href="https://pubmed.ncbi.nlm.nih.gov/21163823/" target="_blank">https://pubmed.ncbi.nlm.nih.gov/21163823/</a><br></br></p></td>
              <td>EOS and LOS Blood cultures</td>
              <td>TTP for Gram-negative organisms was 11.17 hours (Q1-Q3: 8.84-15.67).  For  Gram-positive isolates, TTP for coagulase-negative staphylococci (CoNS) was 26.67 hours (Q1-Q3: 19.00-38.17), and for non-CoNS, TTP was 12.83 hours (Q1-Q3: 10.50-18.17, P{'<'}0.001).</td>
            </tr>
            <tr>
              <td>Huggard et al. 2021<p><a href="https://pubmed.ncbi.nlm.nih.gov/31072183/"target="_blank">https://pubmed.ncbi.nlm.nih.gov/31072183/</a><br></br></p></td>
              <td>EOS<p><br></br>Well-appearing newborns <br></br></p></td>
              <td>98% of pathogens were isolated by 24 hours. Gram-negative organisms had the shortest TTP, with Klebsiella spp. having a median TTP of 10 hours and E. coli 11 hours. For Gram-positives, GBS TTP was 12 hours, Enterococcus species 14 hours, and S. aureus 15 hours. All of the Klebsiella spp. and other Coliforms were detected within 24 hours, with, 95.2% of E.coli, 94.4% of GBS, 95.5% of Enterococci, and 95.7% of S. aureus, positive by 24 hours.</td>
            </tr>
            <tr>
              <td>Kuźniewicz, et al. 2020<p><a href="https://pubmed.ncbi.nlm.nih.gov/32379197/"target="_blank">https://pubmed.ncbi.nlm.nih.gov/32379197/</a><br></br></p></td>
              <td>EOS Blood Cultures 19 centers<p><br></br>PT and FT infants <br></br></p></td>
              <td><p><a href="http://localhost:3000/faq"target="_blank">GBS  and E. coli accounted for 74% of blood culture isolates. TTP was 21.0 hours (Q1-Q3: 17.1-25.3 hours). Blood cultures were positive by 24 hours in 68% of cases; by 36 hours in 94% of cases; and by 48 hours in 97% of cases. Receiving maternal intrapartum antibiotic prophylaxis, GA {'<'}35 weeks, nor blood culture system did not impact median TTP.</a><br></br></p></td>
            </tr>
            <tr>
              <td>Le et al. 2021<p><a href="https://pubmed.ncbi.nlm.nih.gov/33491088/"target="_blank">https://pubmed.ncbi.nlm.nih.gov/33491088/</a><br></br></p></td>
              <td>EOS<p><br></br>VLBW ({'<'}1500 g) <br></br></p></td>
              <td><p><a href="http://localhost:3000/faq"target="_blank">Short-course ampicillin (2 doses, 50 mg/kg every 12 hours) covers a period of 34 hours for E. coli and 82 hours for GBS. Single-dose 5 mg/kg gentamicin maintained {'>'} MIC 2 for 26 hours.</a><br></br></p></td>
            </tr>
            <tr>
              <br></br>GA=gestational age, GBS=Group B Streptococcus, TTP=time to positivity, Q1-Q3=interquartile range, FT= full term, PT=Preterm.<br></br>
            </tr>
          </tbody>
        </Table>      
      </Panel>

      <Panel header="Is it safe to only cover a period of 48 hours for Late-Onset Sepsis (LOS) evaluations?" key="2">    
        <p>Yes. Several studies and meta-analyses have demonstrated that LOS pathogens are isolated within 48 hours of the cultures being obtained.</p>
        <Table striped bordered hover size="sm">
          <tbody>
            <tr>
              <td>
                Guerti et al. 2011
                <p><a href="https://pubmed.ncbi.nlm.nih.gov/21163823/" target="_blank">https://pubmed.ncbi.nlm.nih.gov/21163823/</a><br></br></p>
                </td>
                <td>Early and Late-Onset Sepsis <br></br>Preterm and Full term infants </td>
                <td>TTP for Gram-negative organisms was 11.17 hours (Q1-Q3: 8.84-15.67). For Gram-positive isolates, TTP for coagulase-negative staphylococci (CoNS) was 26.67 hours (Q1-Q3: 19.00-38.17), and for non-CoNS, TTP was 12.83 hours (Q1-Q3: 10.50-18.17, P {'<'} 0.001).</td>    
              </tr>
            </tbody>
          </Table>

          <Table striped bordered hover size="sm">
          <tbody>
            <tr>
              <td>
                Mukhopadhyay S et al. 2022
                <p><a href="https://pubmed.ncbi.nlm.nih.gov/35273079/" target="_blank">https://pubmed.ncbi.nlm.nih.gov/35273079/</a><br></br></p>
                </td>
                <td>Late-Onset Sepsis <br></br>Preterm and Full term infants <br></br>16 centers</td>
                <td>Median TTP (Q1-Q3) was 23.5 hours (18.4-29.9); 85%  resulted in 36 hours. Excluding CoNS, 93.5% cultures were positive by 36 hours.</td>    
              </tr>
              <p>
                <br></br>GA=gestational age, GBS=Group B Streptococcus, TTP=time to positivity, Q1-Q3=interquartile range.<br></br>
              </p>
            </tbody>
          </Table>
      </Panel>

      <Panel header="Which antibiotics are optimal for Late-onset sepsis?" key="3">  
        Nafcillin or Oxacillin and Gentamicin target skin, central catheter and gram-negative pathogens.<br></br>
        If concern for gastrointestinal disease or urinary tract infection, Ampicillin and Gentamicin might<br></br>
        be preferred so enterococcus is covered. If known MRSA or CoNS colonization or previous<br></br>
        infection, Vancomycin and Gentamicin would be preferred coverage. Some centers may choose<br></br>
        other empiric antibiotics based on local epidemiology. Several studies have demonstrated the<br></br>
        safety of stewardship using nafcillin or oxacillin with gentamicin instead of vancomycin and<br></br>
        gentamicin. Magers et al. 2022 <a href="https://pubmed.ncbi.nlm.nih.gov/35380005/" target="_blank">https://pubmed.ncbi.nlm.nih.gov/35380005/ ; </a> Chiu et alsss. 2011<br></br>
        <a href="https://pubmed.ncbi.nlm.nih.gov/21085051/" target="_blank">https://pubmed.ncbi.nlm.nih.gov/21085051/ </a> and Lawrence et al. 2005 <br></br>
        <a href="https://pubmed.ncbi.nlm.nih.gov/16375769/" target="_blank">https://pubmed.ncbi.nlm.nih.gov/16375769/ </a>              
      </Panel>

      <Panel header="For empiric therapy, what is the advantage of using an aminoglycoside instead of a 3rd or 4th generation cephalosporin?" key="4">  
        <p>Aminoglycosides have the distinct advantage of exerting less selective pressure for<br></br>
          development of resistance in closed units like the NICU, thus minimizing the risk of emergence<br></br>
          of resistant bacteria. De Man et al. (<a href="https://pubmed.ncbi.nlm.nih.gov/10768436/" target="_blank">https://pubmed.ncbi.nlm.nih.gov/10768436/</a>)<br></br>
          <br></br>
          This is in contrast to the rapid emergence of cephalosporin resistance when these agents are<br></br>
          provided routinely for possible late-onset sepsis.<br></br>
          <br></br>
          The use of third-generation cephalosporin in neonates with early-onset sepsis was associated<br></br>
          with increased mortality. Clark et al. (<a href="https://pubmed.ncbi.nlm.nih.gov/16396862/" target="_blank">https://pubmed.ncbi.nlm.nih.gov/16396862/</a>) Additionally,<br></br>
          third and fourth generation cephalosporins increase risk for invasive Candida infections. Cotten<br></br>
          et al. (<a href="https://pubmed.ncbi.nlm.nih.gov/16882828/" target="_blank">https://pubmed.ncbi.nlm.nih.gov/16882828/</a>)</p>      
      </Panel>

      <Panel header="Should I double cover Gram-negative infections?" key="5">  
        In certain scenarios: This is an evolving area of investigation. While pending identification and<br></br> 
        susceptibilities, due to emerging resistance especially with E. coli, a 3rd generation<br></br>
         cephalosporin is often added. For treatment after susceptibilities, some experts recommend<br></br>
         double coverage until confirmation of negative culture, first 7 days of treatment and/or with<br></br>
         abscess or meningitis. No neonatal studies to date. 
      </Panel>

      <Panel header="Do 3rd generation cephalosporins have pseudomonas coverage?" key="6">        
        <span style={{ textAlign: "center", fontWeight: "bold"}}>Ceftazidime is the only 3rd generation cephalosporin with consistent Pseudomonas coverage</span><br></br>
        that also has good cerebrospinal fluid penetration (CSF). (Cefoperazone also has<br></br>
        pseudomonas coverage but not CSF penetration so is often not used.)  While ceftazidime and<br></br>
        other 3rd generation cephalosporins cover susceptible enteric gram-negative organisms (E coli,<br></br>
        Klebsiella, Enterobacter, Citrobacter, and Serratia for example), cefotaxime is not always<br></br>
        available due to production issues.  Ceftriaxone should not be used if risk for hyperbilirubinemia<br></br>
        and if patient if receiving calcium containing fluids including parenteral nutrition.  
      </Panel>

      <Panel header="Do 4th generation cephalosporins have good anaerobic coverage?" key="7">  
        No. Excellent gram-negative activity, but does not cover anaerobic organisms.   
      </Panel>

      <Panel header="Do Carbapenems have enterococcus faecium coverage?" key="8">  
        <p>No. Meropenem and imipenem have good activity against gram-negative bacilli (including<br></br> 
        Pseudomonas). <br></br>
        <br></br>
        Gram-positive is limited and does not cover MRSA or Enterococcus Anaerobes including<br></br>
        Bacteroides. <br></br>
        <br></br>  
        Carbapenems is best reserved for ESBL-producing gram-negative bacilli. Narrower-spectrum<br></br>  
        agents should be used for other bacteria to attenuate the emergence of resistance against<br></br>  
        carbapenems.</p>   
      </Panel>

      <Panel header="Ceftaroline is a 5th generation cephalosporin; what does it cover?" key="9">  
        MRSA (methicillin-resistant S. aureus) and vancomycin-intermediate S. aureus (VISA),<br></br> 
        heteroresistant VISA (hVISA), and vancomycin-resistant S. aureus (VRSA).
      </Panel>

      <Panel header="Can another aminoglycoside be used instead of Gentamicin?" key="10">  
        Yes. Extended-interval Amikacin or Tobramycin can be substituted instead of Gentamicin. 
      </Panel>

      <Panel header="How long should I treat necrotizing enterocolitis?" key="11">  
        NEC treatment should be guided initially by resolution of the patient's signs and symptoms.<br></br>
        Antibiotic therapy can be stopped when abdominal radiograph has normalized and<br></br>
        signs and symptoms including WBC {'<'}25,000, platelets {'<'}150,000, and if following proinflammatory<br></br>
        mediator values normalize (e.g. for CRP, {'<'}1 mg/dl).
      </Panel>

      <Panel header="Are the C-reactive protein (CRP) and other proinflammatory mediators helpful?" key="12">  
        <br></br>
        CRP for EOS has been found to prolong antibiotics and hospital days as it may be elevated due<br></br>
        to inflammation and physical changes that occur around delivery. For LOS, it usually does not<br></br>
        aid in the decision of whether or not a sepsis evaluation with antibiotics is needed. In the face of<br></br> 
        complicated and complex proven infections (abscess, endocarditis, peritonitis), CRP and other<br></br>
        biomarkers will decrease with treatment and can help guide length of treatment.
      </Panel>

      <Panel header="Do I need to document a negative culture for urinary tract infections (UTIs)?" key="13">  
        <br></br>
        No. Unless Gram-negative UTI with persistent symptoms 7 days after treatment or fungal UTI.<br></br>
        Aviles-Otaro 2021 et al. (<a href="https://pubmed.ncbi.nlm.nih.gov/33136069/" target="_blank">https://pubmed.ncbi.nlm.nih.gov/33136069/</a>)
      </Panel>

      <Panel header="Do I need to start prophylaxis after a Urinary tract infection (UTI) in a NICU patient?" key="14">  
        <br></br>
        <p>No. If there is a known congenital renal anomaly, discuss the need or not with Pediatric<br></br>
        Nephrologist. The incidence of recurrent UTI is not different with or without UTI prophylaxis in<br></br>
        preterm infants. <br></br>
        Aviles-Otaro 2021 et al. (<a href="https://pubmed.ncbi.nlm.nih.gov/33136069/" target="_blank">https://pubmed.ncbi.nlm.nih.gov/33136069/</a>) <br></br>
        <br></br>
        Some studies have shown that probiotics may reduce recurrent UTIs in infants, but studies have <br></br>
        not been performed in the NICU.  More study is needed in this area related to type of <br></br>
        probiotic(s), dosage, duration and safety. <br></br> 
        Sadeghi-Bojd . et. al 2020 (<a href="https://pubmed.ncbi.nlm.nih.gov/31100124/" target="_blank">https://pubmed.ncbi.nlm.nih.gov/31100124/</a>);<br></br>
        Lee SJ et al. 2016 (<a href="​​https://pubmed.ncbi.nlm.nih.gov/27059742/" target="_blank">​​https://pubmed.ncbi.nlm.nih.gov/27059742/</a>);<br></br>
        Que et al. 2021 (<a href="https://pubmed.ncbi.nlm.nih.gov/34853053/" target="_blank">https://pubmed.ncbi.nlm.nih.gov/34853053/</a>)<br></br></p>
      </Panel>

      <Panel header="Which antibiotics have the best Central Nervous System (CNS) penetration when I am concerned about Meningitis?" key="15">  
        <p> Nau et al. 2010 (<a href="https://pubmed.ncbi.nlm.nih.gov/20930076/" target="_blank">https://pubmed.ncbi.nlm.nih.gov/20930076/</a>)<br></br>  
          <br></br>  
            Factors influence CNS drug penetration: <br></br>  
            1. Small, lipophilic drugs with low protein binding translocate best across the blood brain barrier. <br></br>  
            2. Circulating plasma drug concentrations are a driving force behind achievable CNS drug <br></br>  
            concentrations. Changes occur with age and maturation. <br></br>
            3. CNS drug penetration is influenced by the presence of meningeal inflammation or abscess. <br></br> </p>
            <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Intravenous unless otherwise noted</th>
                <th>CNS Penetration</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Aminoglycosides</td>
                <td>Low</td>
              </tr>
              <tr>
                <td>Penicillins</td>
                <td>Adequate</td>
                <td>Aqueous penicillin G reaches greater concentrations than procaine or benzathine penicillin.</td>
              </tr>
              <tr>
                <td>Ampicillin</td>
                <td>Good</td>
                <td>Requires higher doses for meningitis</td>
              </tr>
              <tr>
                <td>Nafcillin</td>
                <td>Adequate</td>
                <td>Use with MSSA and susceptible CoNS</td>
              </tr>
              <tr>
                <td>1st and 2nd generation cephalosporins</td>
                <td>Higher CSF concentrations vs other cephalosporins</td>
                <td>Except cefuroxime</td>
              </tr>
              <tr>
                <td>3rd generation cephalosporins</td>
                <td>Adequate</td>
                <td>Ceftriaxone, cefotaxime, ceftazidime, cefixime and cefepime</td>
              </tr>
              <tr>
                <td>Carbapenems</td>
                <td>Favorable</td>
                <td>Meropenem and imipenem</td>
              </tr>
              <tr>
                <td>Linezolid</td>
                <td>High</td>
              </tr>
              <tr>
                <td>Metronidazole</td>
                <td>Favorable ('\n') (CNS {'>'} plasma)</td>
              </tr>
              <tr>
                <td>Rifampin (enteral)</td>
                <td>Good</td>
              </tr>
              <tr>
                <td>Vancomycin</td>
                <td>Good</td>
              </tr>
              <tr>
                <td>Piperacillin/tazobactam</td>
                <td>Inadequate</td>
              </tr>
              <tr>
                <td>Sulfamethoxazole/Trimethoprim</td>
                <td>Favorable</td>
                <td>Toxicities limit use</td>
              </tr>
              <tr>
                <td>Chloramphenicol</td>
                <td>Favorable</td>
                <td>Toxicities limit use</td>
              </tr>
              <tr>
                <td>Clindamycin, daptomycin, macrolides, tetracyclines, and fluoroquinolones</td>
                <td>Clindamycin and macrolides have poor CNS penetration in adults</td>
                <td>Lack of pediatric data. Some adult data has limited their study in pediatrics.</td>
              </tr>
              <tr>
                <td>Daptomycin, fluoroquinolones, and tetracyclines</td>
                <td></td>
                <td>CNS penetration in adults, but concern for toxicities have limited pediatric data</td>
              </tr>
            </tbody>
          </Table>
      </Panel>

      <Panel header="When do I draw a peak and trough?" key="16">  
        <br></br>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Antibiotic</th>
              <th>Trough (mcg/ml)</th>
              <th>Peak (mcg/ml) (drawn 30 minutes after end of infusion)</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Vancomycin</td>
              <td>8-15</td>
              <td>n/a</td>
              <td><li>Obtain peak if treating</li><li>Trough is drawn just prior to the 3rd dose</li></td>
            </tr>
            <tr>
              <td>Gentamicin</td>
              <td>≤1.5</td>
              <td>8-10</td>
              <td><li>Trough is drawn just prior to the 2nd dose</li></td>
            </tr>
            <tr>
              <td>Amikacin</td>
              <td>2-5</td>
              <td>20-30</td>
              <td><li>Trough is drawn just prior to the 2nd dose</li></td>
            </tr>
            <tr>
              <td>Tobramycin</td>
              <td>≤1</td>
              <td>5-12</td>
              <td><li>Trough is drawn just prior to the 2nd dose</li></td>
            </tr>
          </tbody>
          </Table>
      </Panel>

      <Panel header="Below are new additions (June 17 2022)?" key="17" style={{marginBottom:"175px"}}>  
        Gentamicin dosing in resource limited areas in one study has shown evidence for:<br></br>
        10 mg for patients with body weight {'<'}2.5 kg, 16 mg for patients with body weight between 2.5 and 4 kg, and 30 mg for those with body weight {'>'}4 kg.<br></br>
        https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7982486/#:~:text=Lower%20doses%20are%203%20mg,with%20body%20weight%20%3E2.0%20kg.&text=Higher%20doses%20are%204%20mg,bands%20used%20in%20the%20trials.
      </Panel>
    </Collapse>
  </div>
  );
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}


function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

// const styles = StyleSheet.create({
  //bold: {fontWeight: 'bold'},
  //italic: {fontStyle: 'italic'},
  //underline: {textDecorationLine: 'underline'}
//})

//const styles = StyleSheet.create({
  //baseText: {
    //fontWeight: 'bold'
  //},
  //innerText: {
    //color: 'red'
  //}
//});


// function ContextAwareToggle({ children, eventKey, callback }) {
  // const { activeEventKey } = useContext(AccordionContext);

  // const decoratedOnClick = useAccordionButton(
    // eventKey,
    // () => callback && callback(eventKey),
  // );

  // const isCurrentEventKey = activeEventKey === eventKey;

  // return (
    // <button
      // type="button"
      // style={{ backgroundColor: isCurrentEventKey ? 'pink' : 'lavender' }}
      // onClick={decoratedOnClick}
    // >
      // {children}
    // </button>
  // );
// }

export default FAQ; 

// <p>
// <iframe width={width * 0.75} height={height * 0.5} src=" "></iframe>
// </p>

/*<Accordion.Item eventKey="6">
  <Accordion.Header style={{fontWeight: 'bold'}}>Do 4th generation cephalosporins have good anaerobic coverage?</Accordion.Header> 
  <Accordion.Body>
  {'\t'}No. Excellent gram-negative activity, but does not cover anaerobic organisms.  
  </Accordion.Body>
  </Accordion.Item> 
*/

/*

*/

/* 
*/