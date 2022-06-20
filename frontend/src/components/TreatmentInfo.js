import React from 'react';
import aaa from './DosingImg/Acyclovir.png';

function TreatmentInfo({ treatment }) {
    var treat = treatment.toString();
    var test = './DosingImg/Ampicillin.png'
    var dosingName = './DosingImg/' +treat+'.png'
    return (
        <> 
           
            <p> {dosingName}</p>
            {/*
            <img className="treatment-info" src={aaa} alt={treatment}></img>
            <img className="treatment-info" src={require(str)} alt={treatment}></img>  */}
           
            {/*

            <img className="treatment-info" src={require(`${dosingName}`)}alt={treatment}></img>

            */}
            <img className="treatment-info" src={require(`${test}`)}alt={treatment}></img>
        </>
    );
}

export default TreatmentInfo;
