import React from "react";
import { Nav, Navbar, Container } from 'react-bootstrap';
import logo from './logo';

function Header() {
  
  return (
    <div>
      {/* bg="light" */}
      {/* style={{color: "232D4B"}} */}
      <Navbar collapseOnSelect expand="lg" className="navbar" style={{backgroundColor: '#232D4B'}}>
      <Container >
        <Navbar.Brand style={{color: '#F1F1EF'}}>
          <img src={logo} style={{width:35, marginTop: -7}}></img>
          {' '}{' '}Evaluation Criteria
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{accentColor: '#F1F1EF'}}/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" style={{color: '#F1F1EF'}}>Home</Nav.Link>
            <Nav.Link href="/about" style={{color: 'white'}}>About</Nav.Link>
            <Nav.Link href="/datatrends" style={{color: 'white'}}>Data Trends</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;