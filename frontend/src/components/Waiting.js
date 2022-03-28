import React from 'react';
import wait from './wait'

function Waiting() {

  return (
    <div>
      <img src={wait} style={{width: "100px", height: "100px", display:"block"}}></img>
    </div>

  );
}

export default Waiting;