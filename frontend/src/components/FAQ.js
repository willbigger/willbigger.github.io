import React from 'react';
import Table from 'react-bootstrap/Table';
import 'antd/dist/antd.min.css';
import { Collapse } from 'antd';
import './FAQ.css';
const { Panel } = Collapse;

function linkPubMed(id, text) {
  return <a href={`https://pubmed.ncbi.nlm.nih.gov/${id}/`} target="_blank" rel="noopener noreferrer">{text}</a>
}

function FAQ() {
  return (
    <div className="faq container">
      <div className="row">
        <div className="col">
          <h2>Frequently Asked Questions</h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Collapse>
            <Panel header="Is it safe to only cover a period of 24 hours for Early-Onset Sepsis (EOS) evaluations?" key="1">
              <p>Yes. Several studies and meta-analyses have demonstrated that EOS pathogens are isolated within 24 hours of the blood culture being obtained.</p>
              <Table striped bordered hover size="sm">
                <caption>GA=gestational age, GBS=Group B Streptococcus, TTP=time to positivity, Q1-Q3=interquartile range, FT=full term, PT=Preterm.</caption>
                <thead>
                  <tr>
                    <th>Study</th>
                    <th>Population</th>
                    <th>Findings</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{ linkPubMed(32621356, "Marks et al. 2020") }</td>
                    <td>
                      <p>EOS Blood cultures</p>
                      <ol>
                        <li>≥34 weeks GA</li>
                        <li>Meta-analysis of 6 studies of PT and FT infants</li>
                      </ol>
                    </td>
                    <td>
                      <ol>
                        <li>All pathogenic blood cultures collected pre-therapy from neonates suspected of EOS returned a positive result within 24 hours of incubation.</li>
                        <li>Similar EOS studies have found that 92&ndash;100% of blood cultures are positive by 24 hours.</li>
                      </ol>
                    </td>
                  </tr>
                  <tr>
                    <td>{ linkPubMed(33525647, "De Rose et al. 2021") }</td>
                    <td>
                      <p>EOS Blood cultures</p>
                      <p>≥34 weeks GA</p>
                    </td>
                    <td>
                      Time to positivity (TTP) of pathogens was 17.7 ± 12.5 hours vs. 80.5 ± 55.8 hours of contaminants (p = 0.003).
                      The TTP of positive blood culture &lt;12 hours in 80% of cases.
                      Admission CRP levels were similar in infants with positive and negative blood cultures (p = 0.067).
                    </td>
                  </tr>
                  <tr>
                    <td>{ linkPubMed(21163823, "Guerti et al. 2011") }</td>
                    <td>EOS and LOS Blood cultures</td>
                    <td>
                      TTP for Gram-negative organisms was 11.17 hours (Q1-Q3: 8.84-15.67).
                      For Gram-positive isolates, TTP for coagulase-negative staphylococci (CoNS) was 26.67 hours (Q1-Q3: 19.00-38.17),
                      and for non-CoNS, TTP was 12.83 hours (Q1-Q3: 10.50-18.17, P&lt;0.001).
                    </td>
                  </tr>
                  <tr>
                    <td>{ linkPubMed(31072183, "Huggard et al. 2021") }</td>
                    <td>
                      <p>EOS</p>
                      <p>Well-appearing newborns</p>
                    </td>
                    <td>98% of pathogens were isolated by 24 hours.
                      Gram-negative organisms had the shortest TTP, with Klebsiella spp. having a median TTP of 10 hours and E. coli 11 hours.
                      For Gram-positives, GBS TTP was 12 hours, Enterococcus species 14 hours, and S. aureus 15 hours.
                      All of the Klebsiella spp. and other Coliforms were detected within 24 hours,
                      with 95.2% of E.coli, 94.4% of GBS, 95.5% of Enterococci, and 95.7% of S. aureus, positive by 24 hours.</td>
                  </tr>
                  <tr>
                    <td>{ linkPubMed(32379197, "Kuźniewicz, et al. 2020") }</td>
                    <td>
                      <p>EOS Blood Cultures<br />19 centers</p>
                      <p>PT and FT infants</p>
                    </td>
                    <td>
                      GBS and E. coli accounted for 74% of blood culture isolates. TTP was 21.0 hours (Q1-Q3: 17.1-25.3 hours).
                      Blood cultures were positive by 24 hours in 68% of cases; by 36 hours in 94% of cases; and by 48 hours in 97% of cases.
                      Receiving maternal intrapartum antibiotic prophylaxis, GA &lt;35 weeks, nor blood culture system did not impact median TTP.
                    </td>
                  </tr>
                  <tr>
                    <td>{ linkPubMed(33491088, "Le et al. 2021") }</td>
                    <td>
                      <p>EOS</p>
                      <p>VLBW (&lt;1500 g)</p>
                    </td>
                    <td>
                      Short-course ampicillin (2 doses, 50 mg/kg every 12 hours) covers a period of 34 hours for E. coli and 82 hours for GBS.
                      Single-dose 5 mg/kg gentamicin maintained &gt; MIC 2 for 26 hours.
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Panel>

            <Panel header="Is it safe to only cover a period of 48 hours for Late-Onset Sepsis (LOS) evaluations?" key="2">
              <p>Yes. Several studies and meta-analyses have demonstrated that LOS pathogens are isolated within 48 hours of the cultures being obtained.</p>
              <Table striped bordered hover size="sm">
                <caption>GA=gestational age, GBS=Group B Streptococcus, CoNS=Coagulase-negative staphylococci, TTP=time to positivity, Q1-Q3=interquartile range.</caption>
                <thead>
                  <tr>
                    <th>Study</th>
                    <th>Population</th>
                    <th>Findings</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{ linkPubMed(21163823, "Guerti et al. 2011") }</td>
                    <td>Early and Late-Onset Sepsis<br />Preterm and Full term infants</td>
                    <td>
                      TTP for Gram-negative organisms was 11.17 hours (Q1-Q3: 8.84-15.67).
                      For Gram-positive isolates, TTP for CoNS was 26.67 hours (Q1-Q3: 19.00-38.17), and for non-CoNS, TTP was 12.83 hours (Q1-Q3: 10.50-18.17, P&lt;0.001).</td>
                  </tr>
                  <tr>
                    <td>{ linkPubMed(35273079, "Mukhopadhyay S et al. 2022") }</td>
                    <td>Late-Onset Sepsis<br />Preterm and Full term infants<br />16 centers</td>
                    <td>
                      Median TTP (Q1-Q3) was 23.5 hours (18.4-29.9); 85% resulted in 36 hours.
                      Excluding CoNS, 93.5% cultures were positive by 36 hours.
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Panel>

            <Panel header="Which antibiotics are optimal for Late-onset sepsis?" key="3">
              Nafcillin or Oxacillin and Gentamicin target skin, central catheter and gram-negative pathogens.
              If concern for gastrointestinal disease or urinary tract infection, Ampicillin and Gentamicin might be preferred so enterococcus is covered.
              If known MRSA or CoNS colonization or previous infection, Vancomycin and Gentamicin would be preferred coverage.
              Some centers may choose other empiric antibiotics based on local epidemiology.
              Several studies have demonstrated the safety of stewardship using nafcillin or oxacillin with gentamicin instead of vancomycin and gentamicin.
              ({ linkPubMed(35380005, "Magers et al. 2022") }; { linkPubMed(21085051, "Chiu et al. 2011") }; { linkPubMed(16375769, "Lawrence et al. 2005") })
            </Panel>

            <Panel header="For empiric therapy, what is the advantage of using an aminoglycoside instead of a 3rd or 4th generation cephalosporin?" key="4">
              <p>Aminoglycosides have the distinct advantage of exerting less selective pressure for development of resistance in closed units like the NICU,
                thus minimizing the risk of emergence of resistant bacteria. ({ linkPubMed(10768436, "De Man et al.") })</p>
              <p>This is in contrast to the rapid emergence of cephalosporin resistance when these agents are provided routinely for possible late-onset sepsis.</p>
              <p>The use of third-generation cephalosporin in neonates with early-onset sepsis was associated with increased mortality. ({ linkPubMed(16396862, "Clark et al.") })
                Additionally, third and fourth generation cephalosporins increase risk for invasive Candida infections. ({ linkPubMed(16882828, "Cotten et al.") })</p>
            </Panel>

            <Panel header="Should I double cover Gram-negative infections?" key="5">
              In certain scenarios: This is an evolving area of investigation.
              While pending identification and susceptibilities, due to emerging resistance especially with E. coli, a 3rd generation cephalosporin is often added.
              For treatment after susceptibilities, some experts recommend double coverage until confirmation of negative culture,
              first 7 days of treatment and/or with abscess or meningitis. No neonatal studies to date.
            </Panel>

            <Panel header="Do 3rd generation cephalosporins have pseudomonas coverage?" key="6">
              <strong>Ceftazidime is the only 3rd generation cephalosporin with consistent Pseudomonas coverage</strong> that also has good cerebrospinal fluid penetration (CSF).
              (Cefoperazone also has pseudomonas coverage but not CSF penetration so is often not used.)
              While ceftazidime and other 3rd generation cephalosporins cover susceptible enteric gram-negative organisms
              (E coli, Klebsiella, Enterobacter, Citrobacter, and Serratia for example), cefotaxime is not always available due to production issues.
              Ceftriaxone should not be used if risk for hyperbilirubinemia and if patient if receiving calcium containing fluids including parenteral nutrition.
            </Panel>

            <Panel header="Do 4th generation cephalosporins have good anaerobic coverage?" key="7">
              No. Excellent gram-negative activity, but does not cover anaerobic organisms.
            </Panel>

            <Panel header="Do Carbapenems have enterococcus faecium coverage?" key="8">
              <p>No. Meropenem and imipenem have good activity against gram-negative bacilli (including Pseudomonas).</p>
              <p>Gram-positive is limited and does not cover MRSA or Enterococcus Anaerobes including Bacteroides.</p>
              <p>Carbapenems is best reserved for ESBL-producing gram-negative bacilli.
                Narrower-spectrum agents should be used for other bacteria to attenuate the emergence of resistance against carbapenems.</p>
            </Panel>

            <Panel header="Ceftaroline is a 5th generation cephalosporin; what does it cover?" key="9">
              MRSA (methicillin-resistant S. aureus) and vancomycin-intermediate S. aureus (VISA), heteroresistant VISA (hVISA), and vancomycin-resistant S. aureus (VRSA).
            </Panel>

            <Panel header="Can another aminoglycoside be used instead of Gentamicin?" key="10">
              Yes. Extended-interval Amikacin or Tobramycin can be substituted instead of Gentamicin.
            </Panel>

            <Panel header="How long should I treat necrotizing enterocolitis?" key="11">
              NEC treatment should be guided initially by resolution of the patient's signs and symptoms.
              Antibiotic therapy can be stopped when abdominal radiograph has normalized and signs and symptoms including WBC &lt;25,000, platelets &lt;150,000,
              and if following proinflammatory mediator values normalize (e.g. for CRP, &lt;1 mg/dl).
            </Panel>

            <Panel header="Are the C-reactive protein (CRP) and other proinflammatory mediators helpful?" key="12">
              CRP for EOS has been found to prolong antibiotics and hospital days as it may be elevated due to inflammation and physical changes that occur around delivery.
              For LOS, it usually does not aid in the decision of whether or not a sepsis evaluation with antibiotics is needed.
              In the face of complicated and complex proven infections (abscess, endocarditis, peritonitis),
              CRP and other biomarkers will decrease with treatment and can help guide length of treatment.
            </Panel>

            <Panel header="Do I need to document a negative culture for urinary tract infections (UTIs)?" key="13">
              No. Unless Gram-negative UTI with persistent symptoms 7 days after treatment or fungal UTI. ({ linkPubMed(33136069, "Aviles-Otaro 2021 et al.") })
            </Panel>

            <Panel header="Do I need to start prophylaxis after a Urinary tract infection (UTI) in a NICU patient?" key="14">
              <p>No. If there is a known congenital renal anomaly, discuss the need or not with Pediatric Nephrologist.
                The incidence of recurrent UTI is not different with or without UTI prophylaxis in preterm infants. ({ linkPubMed(33136069, "Aviles-Otaro et al. 2021") })</p>
              <p>Some studies have shown that probiotics may reduce recurrent UTIs in infants, but studies have not been performed in the NICU.
                More study is needed in this area related to type of probiotic(s), dosage, duration and safety.
                ({ linkPubMed(31100124, "Sadeghi-Bojd et al. 2020") }; { linkPubMed(27059742, "Lee SJ et al. 2016") }; { linkPubMed(34853053, "Que et al. 2021") })</p>
            </Panel>

            <Panel header="Which antibiotics have the best Central Nervous System (CNS) penetration when I am concerned about Meningitis?" key="15">
              <p>{ linkPubMed(20930076, "Nau et al. 2010") }</p>
              <p>Factors influence CNS drug penetration:</p>
              <ol>
                <li>Small, lipophilic drugs with low protein binding translocate best across the blood brain barrier.</li>
                <li>Circulating plasma drug concentrations are a driving force behind achievable CNS drug concentrations. Changes occur with age and maturation.</li>
                <li>CNS drug penetration is influenced by the presence of meningeal inflammation or abscess.</li>
              </ol>
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
                    <td></td>
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
                    <td></td>
                  </tr>
                  <tr>
                    <td>Metronidazole</td>
                    <td>Favorable (CNS &gt; plasma)</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Rifampin (enteral)</td>
                    <td>Good</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Vancomycin</td>
                    <td>Good</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Piperacillin/tazobactam</td>
                    <td>Inadequate</td>
                    <td></td>
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

              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Antibiotic</th>
                    <th>Trough (mcg/ml)</th>
                    <th>Peak (mcg/ml)<br />(drawn 30 minutes after end of infusion)</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Vancomycin</td>
                    <td>8-15</td>
                    <td>n/a</td>
                    <td>
                      <ul>
                        <li>Obtain peak if treating meningitis</li>
                        <li>Trough is drawn just prior to the 3rd dose</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>Gentamicin</td>
                    <td>≤1.5</td>
                    <td>8-10</td>
                    <td>
                      <ul>
                        <li>Trough is drawn just prior to the 2nd dose</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>Amikacin</td>
                    <td>2-5</td>
                    <td>20-30</td>
                    <td>
                      <ul>
                        <li>Trough is drawn just prior to the 2nd dose</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>Tobramycin</td>
                    <td>≤1</td>
                    <td>5-12</td>
                    <td>
                      <ul>
                        <li>Trough is drawn just prior to the 2nd dose</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Panel>

            <Panel header="Below are new additions (June 17 2022)" key="17">
              Gentamicin dosing in resource limited areas in one study has shown evidence for:
              10 mg for patients with body weight &lt;2.5 kg,
              16 mg for patients with body weight between 2.5 and 4 kg,
              and 30 mg for those with body weight &gt;4 kg. ({linkPubMed(33762945, "D'Agate et al.")})
            </Panel>
          </Collapse>
        </div>
      </div>
    </div>
  );
}

export default FAQ;
