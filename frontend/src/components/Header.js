import React from "react";
import { Nav, Navbar, Container } from 'react-bootstrap';

function Header() {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light">
      <Container>
        <Navbar.Brand>Evaluation Criteria</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/datatrends">Data Trends</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;