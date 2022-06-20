import React from 'react';
import { Table } from 'react-bootstrap';

const dosingParameters = {
    'Acyclovir': [
        ['Neonates', '20 mg/kg/dose IV q8h'],
        ['Mild renal dysfunction (CrCl 25-50)', '20 mg/kg/dose IV q12h'],
        ['Mod renal dysfunction (CrCl 10-25)', '20 mg/kg/dose IV q24h'],
        ['Severe renal dysfunction (CrCl < 10)', '10 mg/kg/dose IV q24h'],
        ['Suppressive therapy', '300 mg/m2/dose PO q8h x 6 mths'],
    ],
    'Ampho B (conventional)': [
        ['Neonates', '1 mg/kg q24h'],
        ['', 'Dose administered over 2-6h'],
    ],
    'Amphotericin B (liposomal)': [
        ['', '5-7 mg/kg q24h'],
        ['', ''],
    ],
    'Ampicillin': [
        ['BACTEREMIA (2 kg or less)', ''],
        ['7 days or less', '100 mg/kg q12h'],
        ['8 days or greater', '50 mg/kg q8h'],
        ['BACTEREMIA (> 2kg)', ''],
        ['7 days or less', '100 mg/kg q12h'],
        ['8 days or greater', '50 mg/kg q6h'],
        ['MENINGITIS', ''],
        ['7 days or less', '75 mg/kg q8h'],
        ['8 days or greater', '75 mg/kg q6h'],
        ['UTI prophylaxis', '20 mg/kg/dose daily'],
    ],
    'Azithromycin': [
        ['Ureaplasma', '20 mg/kg daily for 3 doses, IV'],
        ['Pertussis, treatment and postexposure prop', '10 mg/kg once daily for 5 days; PO/IV'],
    ],
    'Carbapenem': [
        ['Meropenem', 'IV'],
        ['<32 weeks GA (<14 days)', '20 mg/kg q12h'],
        ['<32 weeks GA (≥14 days)', '20 mg/kg q8h'],
        ['≥32 weeks GA (<14 days)', '20 mg/kg q8h'],
        ['≥32 weeks GA (≥14 days)', '30 mg/kg q8h'],
    ],
    /* 1st generation Cephalosporins */
    'Cefazolin': [
        ['<= 7 days', '25 mg/kg/dose q12h IV'],
        ['> 7 days', '25 mg/kg/dose q8h IV'],
    ],
    'Cephalexin': [
        ['Treatment dosing', '25-50mg/kg/day div q8h; PO'],
        ['Prophylaxis dosing', '10 mg/kg once daily'],
    ],
    /* 5th Generation Cephalosporin */
    'Ceftaroline': [
        ['', ''],
        ['≤2000 g (0-7 days)', '6 mg/kg q12 IV'],
        ['≤2000 g (>8 days) and all other patients', '9 mg/kg q12 IV'],
    ],
    /* 4th generation cephalosporin */
    'Cefepime': [
        ['GA < 36 weeks', '30 mg/kg/dose q12h IV'],
        ['GA >= 36 weeks', '50 mg/kg/dose q12h IV'],
    ],
    /* 3rd generation cephalosporin */
    'Cefotaxime': [
        ['<1200 grams', '50 mg/kg IV q12h'],
        ['>1200 grams & <=7 days', '50 mg/kg IV q12h'],
        ['> 1200 grams & > 7 days', '50 mg/kg IV q8h'],
    ],
    /* Other 3rd generation cephalosporins include: ceftriaxone, ceftazidime */
    /* 2nd Generation Cephalosporin */
    'Cefoxitin': [
        ['IV', '30 mg/kg/dose q8h'],
    ],
    /* Other 2nd generation cephalosporins include: cefuroxime, cefotetan */
    'Clindamycin': [
        ['<= 7d & <2000 g', '5 mg/kg/dose q12h'],
        ['<= 7d & >2000 g', '5 mg/kg/dose q8h'],
        ['>7d & <2000 g', '5 mg/kg/dose q8h'],
        ['>7d & >2000 g', '5 mg/kg/dose q6h'],
        ['>28 days', '20-40 mg/kg/day divided every 6 to 8h'],
    ],
    'Erythromycin': [
        ['Chlamydial infection', '12.5 mg/kg/dose PO q6h'],
        ['Ureaplasma', '10 mg/kg/dose IV q6h (over 60 min)'],
        ['Prokinetic', '3-5 mg/kg/dose q6-8h (enteral or IV)'],
    ],
    'Fluconazole': [
        ['Prophylaxis', '-*Infants <1000 grams BW or <28 weeks GA*\n-*Any infant with complex gastrointestinal disease such as Stage≥ 2 NEC, spontaneous intestinal bowel perforation, Gastroschisis*\n-During treatment with 3rd or 4th generation cephalosporin or carbapenem antibiotics\n*Continue prophylaxis while needing central venous access, parenteral nutrition, or systemic antibiotics'],
        ['Prophylaxis (<6 months PMA)', '3 mg/kg twice a week (IV or PO)'],
        ['Prophylaxis (≥6 months PMA)', '6 mg/kg twice a week (IV or PO)'],
        ['Treatment', '25 mg/kg loading dose,\nthen 12 mg/kg per day'],
    ],
    'Ganciclovir': [
        ['IV', '6 mg/kg q12h'],
    ],
    'Gentamicin': [
        ['< 29 wks GA and 0-7 days', '4 mg/kg/dose q48h'],
        ['< 29 wks GA and 8-28 days', '4 mg/kg/dose q36h'],
        ['< 29 wks GA and > 28 days', '4 mg/kg/dose q24h'],
        ['30-34 wks GA and 0-7 days', '4 mg/kg/dose q36h'],
        ['30-34 wks GA and >= 8 days', '4 mg/kg/dose q24h'],
        ['>= 35 wks GA (any day)', '4 mg/kg/dose q24h'],
        ['At 48 weeks GA (any day)', '5 mg/kg/dose q24h'],
        ['ECMO (any day)', '4 mg/kg/dose q36h'],
        ['Therapeutic hypothermia (any day)', '4 mg/kg/dose q36h'],
        ['Bacterial overgrowth', '4 mg/kg/dose PO q12h x 5-7 days'],            
    ],
    /* Aminoglycosides */
    'Gentamicin or Tobramycin': [
        ['Gentamicin or Tobramycin', 'IV or IM'],
        ['<30 weeks GA (0-14 days)', '5 mg/kg q48h'],
        ['<30 weeks GA (>14 days)', '5 mg/kg q36h'],
        ['30-34 weeks GA (0-10 days)', '5 mg/kg q36h'],
        ['30-34 weeks GA (>10 days)', '5 mg/kg q24h'],
        ['≥35 weeks GA (0-7 days)', '4 mg/kg q24h'],
        ['≥35 weeks GA (>7days)', '5 mg/kg q24h'],
    ],
    'Amikacin': [
        ['Amikacin', 'IV or IM'],
        ['<30 weeks GA (0-14 days)', '15 mg/kg q48h'],
        ['<30 weeks GA (>14 days)', '15 mg/kg q24h'],
        ['30-34 weeks GA (0-10 days)', '15 mg/kg q24h'],
        ['30-34 weeks GA (>10 days)', '15 mg/kg q24h'],
        ['≥35 weeks GA (0-7 days)', '15 mg/kg q24h'],
        ['≥35 weeks GA (>7days)', '17.5 mg/kg q24h'],
    ],
    'Metronidazole': [
        ['Loading dose', '15 mg/kg'],
        ['Maintenance', ''],
        ['<= 25 weeks CGA', '7.5 mg/kg/dose q24h'],
        ['26-34 weeks CGA', '7.5 mg/kg/dose q12h'],
        ['>= 35 weeks CGA', '7.5 mg/kg/dose q8h'],
        ['', ''],
        ['Bacterial overgrowth', '10 mg/kg/dose BID'],
        ['', ''],        
    ],
    'Micafungin': [
        ['IV', '10 mg/kg/day once daily'],
        ['Prophylactic dosing', '2-3 mg/kg/dose once daily'],        
    ],
    'Nafcillin': [
        ['<=2000g  & <= 7 days', '25 mg/kg IV/dose q12h'],
        ['<=2000g  & > 7 days', '25 mg/kg/dose IV q8h'],
        ['>2000g & <= 7 days', '25 mg/kg IV/dose q8h'],
        ['>2000g & > 7 days', '25 mg/kg IV/dose q6h'],
        ['Meningitis dosing', ''],
        ['<=2000g  & <= 7 days', '50 mg/kg/dose IV q12h'],
        ['<=2000g  & > 7 days', '50 mg/kg/dose IV q8h'],
        ['>2000g & <= 7 days', '50 mg/kg/dose IV q8h'],
        ['>2000g & > 7 days', '50 mg/kg IV/dose q6h'],
    ],
    'Penicillin G aqueous': [
        ['General dosing, susceptible infections', 'IM or IV'],
        ['non CNS', ''],
        ['< 1 kg - postnatal age <= 14 days', '25,000 - 50,000 units/kg/dose Q12h'],
        ['< 1 kg - postnatal age 15 to 28 days', '25,000 - 50,000 units/kg/dose Q8h'],
        ['>= 1 kg - postnatal age <= 7 days', '25,000 - 50,000 units/kg/dose Q12h'],
        ['>= 1 kg - postnatal age 8 to 28 days', '25,000 - 50,000 units/kg/dose Q8h'],
        ['', ''],
        ['Meningitis', 'IV'],
        ['Group B streptococcus', ''],
        ['Postnatal age 0 to 7 days', '250,000 - 450,000 units/kg/day, div Q8h'],
        ['Postnatal age 8 to 28 days', '450,000 - 500,000 units/kg/day, div Q6h'],
        ['Other susceptible organisms', ''],
        ['Postnatal age 0 to 7 days', '150,000 units/kg/day, divided Q8-12h'],
        ['Postnatal age 8 to 28 days', '200,000 units/kg/day, divided Q6-8h'],        
    ],
    'Piperacillin-tazobactam': [
        ['< 29 weeks GA and < 29 days', '112.5 mg/kg/dose q12h IV'],
        ['< 29 weeks GA and > 28 days', '112.5 mg/kg/dose q8h IV'],
        ['30-36 weeks GA and 0-14 days', '112.5 mg/kg/dose q12h IV'],
        ['30-36 weeks GA and > 14 days', '112.5 mg/kg/dose q8h IV'],
        ['37-44 weeks GAand 0-7 days', '112.5 mg/kg/dose q12h IV'],
        ['37-44 weeks GA and > 7days', '112.5 mg/kg/dose q8h IV'],
        ['45 weeks GA or more and any days', '112.5 mg/kg/dose q8h IV'],
    ],
    'Rifampin': [
        ['PO/IV', '5 to 20 mg/kg/day in divided does Q12h']
    ],
    /* Trimethoprim-sulfamethoxazole */
    'SMZ/TMP': [
        ['UTI Prophylaxis', '2 mg/kg PO once daily'],
        ['Treatment', '3-6 mg/kg/dose PO BID x7-14 days'],        
    ],
    'Tobramycin': [
        ['Inhaled', '40-80 mg Q12h']
    ],
    'Valganciclovir HCl': [
        ['Infants 1-3 mos of age', '16 mg/kg/dose q12h'],
    ],
    'Vancomycin': [
        ['<30 wks GA and 0-15 d', '15 mg/kg/dose q18h'],
        ['<30 wks GA and >15 d', '15 mg/kg/dose  q12h'],
        ['30-36 wks GA and 0-15 d', '15 mg/kg/dose q12h'],
        ['30-36 wks GA and >15 d', '15 mg/kg/dose q8h'],
        ['>36 wks GA and 0-8 d', '15 mg/kg/dose q12h'],
        ['>36 wks GA and >8 d', '15 mg/kg/dose q8h'],
        ['> 44 wks GA', '15 mg/kg/dose q6h'],        
    ],
    'Voriconazole': [
        ['IV Loading dose', '6 mg/kg/dose x 2 doses'],
        ['IV Maintenance', '4 mg/kg/dose q12h'],
        ['PO loading dose', '8 mg/kg/dose x 2 doses'],
        ['PO maintenance', '7 mg/kg/dose q12h'],        
    ],
    'Zidovudine': [
        ['ORAL PROPHYLAXIS', ''],
        ['< 30 weeks PMA', '2 mg/kg q12h x 4 wks'],
        ['', 'then 3 mg/kg q12h x 2 wks'],
        ['30 to 34 6/7 weeks PMA', '2 mg/kg q12h x 2 wks'],
        ['', 'then 3 mg/kg q12h x 4 wks'],
        ['>= 35 weeks PMA', '4 mg/kg q12 x 6 wks'],
        ['INTRAVENOUS PROPHYLAXIS', ''],
        ['< 30 weeks PMA', '1.5 mg/kg q12h x 4 wks'],
        ['', 'then 2.25 mg/kg q12h x 2 wks'],
        ['30 to 34 6/7 weeks PMA', '1.5 mg/kg q12h x 2 wks'],
        ['', 'then 2.25 mg/kg q12h x 4 wks'],
        ['>= 35 weeks PMA', '3 mg/kg q12h x 6 wks'],        
    ],
}

function getDosingParameter(medication) {
    if (dosingParameters.hasOwnProperty(medication)) {
        return (
            <Table striped bordered>
                <thead>
                    <th colSpan='2'>{medication}</th>
                </thead>
                <tbody>{dosingParameters[medication].map(row => 
                    <tr>{row.map(cell => 
                        <td>{cell.split('\n').map(element => 
                            <div>{element}</div>)}
                        </td>)}
                    </tr>)}
                </tbody>
            </Table>
        )
    }
    else {
        return <p>No dosage table found for {medication}.</p>
    }
}

function getAllDosingParameters(treatment) {
    let treatmentList = treatment.split(', ');
    treatmentList = treatmentList.flatMap(medication => {
        if (medication.toLowerCase() === '1st generation Cephalosporins'.toLowerCase()) {
            return ['Cefazolin', 'Cephalexin'];
        }
        else if (medication.toLowerCase() === '5th Generation Cephalosporin'.toLowerCase()) {
            return 'Ceftaroline';
        }
        else if (medication.toLowerCase() === '4th generation cephalosporin'.toLowerCase()) {
            return 'Cefepime';
        }
        else if (medication.toLowerCase() === '3rd generation cephalosporin'.toLowerCase()) {
            return ['Cefotaxime', 'Ceftriaxone', 'Ceftazidime'];
        }
        else if (medication.toLowerCase() === '2nd Generation Cephalosporin'.toLowerCase()) {
            return ['Cefoxitin', 'Cefuroxime', 'Cefotetan'];
        }
        else if (medication.toLowerCase() === 'Aminoglycosides'.toLowerCase()) {
            return ['Gentamicin or Tobramycin', 'Amikacin'];
        }
        else if (medication.toLowerCase() === 'Trimethoprim-sulfamethoxazole'.toLowerCase()) {
            return 'SMZ/TMP';
        }
        else {
            return medication;
        }
    });
    return treatmentList.map(getDosingParameter);
}

function TreatmentInfo({ treatment }) {
    return (
        <div className="treatment-info">
            {getAllDosingParameters(treatment)}
        </div>
    );
}

export default TreatmentInfo;
