import { getUserEmailCookie, removeGrantIdCookie } from '@/lib/utils/cookies';
import { clearCache } from '@/lib/utils/local-storage-cache';
import React, { useCallback, useEffect, useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

function Header({ }: any) {
  const [username, setUserName] = useState(null)

  useEffect(() => {
    const email = getUserEmailCookie()
    if (email) {
      setUserName(email)
    }
  }, [])

  const onLogout = useCallback(() => {
    removeGrantIdCookie();
    clearCache();
    window.location.reload();
  }, []);

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