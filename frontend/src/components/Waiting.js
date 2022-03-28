import React from 'react';
import loadings from './loadings'

function Waiting() {

  return (
    <div>
      <img src={loadings} style={{display:"block"}}></img>
    </div>

  );
}

export default Waiting;