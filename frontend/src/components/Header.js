import React from "react";
import { Link } from 'react-router-dom'; // Import links instead of reloading the page

function Header() {
  return (
    <div>
        <h1>The is the header</h1>
        <Link to='/datatrends'>View Data Trends</Link>
    </div>
  );
}

export default Header;