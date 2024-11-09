'use client'

import Image from "next/image";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

export default function Login() {

    function onLoginClick(): void {
        window.location.href = 'api/v1/login';
    }

  return (
    <>
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h3 className="text-center">Login to Ofry`s mail app</h3>
            <Button variant="primary" type="submit" onClick={onLoginClick} className="w-100 mt-4">
              Login
            </Button>
        </Col>
      </Row>
    </Container>
    </>
  );
}
