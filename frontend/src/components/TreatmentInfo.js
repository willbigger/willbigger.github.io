import React from 'react';
import aaa from './DosingImg/Acyclovir.png';
import ReactImageFallback from "react-image-fallback";

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
            <ReactImageFallback
                    src={require(`${dosingName}`)}
                    fallbackImage={aaa}
                    initialImage="loader.gif"
                    alt="missing img"
                    className="treatment-info" />
        </>
    );
}

export default TreatmentInfo;
