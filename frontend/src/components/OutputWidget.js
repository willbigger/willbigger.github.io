import React from "react";

function OutputWidget({ time, path, siteBlood, siteUrine, siteCSF, sitePeritoneal, siteSkin, infec }) {
  return (
    <div>
      <hr/>
      <hr/>
      <h1>RESULTS</h1>
      <p>{ time }</p>
      <p>{ path }</p>
      <p>{ siteBlood ? "blood" : ""}</p>
      <p>{ siteUrine ? "urine" : ""}</p>
      <p>{ siteCSF ? "CSF" : ""}</p>
      <p>{ sitePeritoneal ? "Peritoneal" : ""}</p>
      <p>{ siteSkin ? "Skin" : ""}</p>
      <p>{ infec }</p>
    </div>
  );
}

export default OutputWidget;