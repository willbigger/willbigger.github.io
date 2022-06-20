import React from "react";
import { Nav, Navbar } from 'react-bootstrap';

function Header() {
  return (
    <Navbar collapseOnSelect variant="dark" expand="lg" className="navbar" style={{backgroundColor: '#232D4B', fontSize: 'larger'}}>
      <Navbar.Brand>
        <Nav.Link href="/" style={{color: 'white', fontSize: 'larger'}}>Neonatal Antibiotic Stewardship</Nav.Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/faq">FAQ</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;