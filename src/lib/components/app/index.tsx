'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import cookierCutter from '../../cookie-cutter';
import Login from "../login";
import Mails from "../mails";
import { Col, Container, Row, Spinner } from 'react-bootstrap';

export default function App() {
  const [userGrantId, setGrantId] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const grantId = cookierCutter.get('nylas_user_grant_id')
    if (grantId) {
      setGrantId(grantId)
    }
    setLoading(false)
  }, [])

  return (
    <>
      {isLoading ? <>
        <Container className="mt-5">
          <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
              <Spinner animation="border" role="status" />
            </Col>
          </Row>
        </Container>
      </> : <>
        {!!userGrantId ? (
          <Mails />
        ) : (
          <Login />
        )}
      </>}
    </>
  );
}
