import React from 'react';
import aaa from './DosingImg/Acyclovir.png';
import ReactImageFallback from "react-image-fallback";

function TreatmentInfo({ treatment }) {

    return (
        <> 
            <img className="treatment-info" src={aaa} alt={treatment}></img>
        </>
    );
}

export default TreatmentInfo;
