import cookierCutter from '@/lib/cookie-cutter';
import React, { useCallback, useEffect, useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

function Header({ }: any) {
  const [userGrantId, setGrantId] = useState(null)
  const [username, setUserName] = useState(null)

  useEffect(() => {
    const grantId = cookierCutter.get('nylas_user_grant_id')
    if (grantId) {
      setGrantId(grantId)
    }
    const email = cookierCutter.get('nylas_user_email')
    if (email) {
        setUserName(email)
    }
  }, [])

  const onLogout = useCallback(() => {
    cookierCutter.set('nylas_user_grant_id', undefined, { expires: new Date(0) })
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