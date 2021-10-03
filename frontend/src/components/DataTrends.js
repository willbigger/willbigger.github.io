import React from "react";
import { Link } from 'react-router-dom'; // Import links instead of reloading the page

function DataTrends() {
  return (
    <div>
        <h3>Data is trending</h3>
        <Link to='/'>Back</Link>
    </div>
  );
}

export default DataTrends;