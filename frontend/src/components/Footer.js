import React from "react";
import { Link } from 'react-router-dom'; // Import links instead of reloading the page

function Footer() {
  return (
    <footer>
      <p>Copyright &copy; Stardate:-302725.28</p>
      <Link to='/about'>About</Link>
    </footer>
  );
}

export default Footer;