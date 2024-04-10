import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function CreateNav() {
  return (
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">All items</Nav.Link>
            <Nav.Link href="#features">Search</Nav.Link>
            <Nav.Link href="/expiring">Expiring Products</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
}

export default CreateNav;