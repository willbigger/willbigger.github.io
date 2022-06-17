import React from 'react';
import aaa from './aaa.png';

function TreatmentInfo({ treatment }) {
    return (
        <img className="treatment-info" src={aaa} alt={treatment}></img>
    );
}

export default TreatmentInfo;
