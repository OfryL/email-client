import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

function Header({ username, onLogout }: any) {
  return (
    <Navbar bg="light" variant="light" className="justify-content-between px-4">
      <Navbar.Brand>Wellcome to Ofry's email app</Navbar.Brand>
      <Nav className="align-items-center">
        <span className="me-3">Hi, {username}</span>
        <Button variant="outline-danger" onClick={onLogout}>
          Logout
        </Button>
      </Nav>
    </Navbar>
  );
}

export default Header;