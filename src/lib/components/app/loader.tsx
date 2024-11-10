'use client'

import { Col, Container, Row, Spinner } from 'react-bootstrap';

export default function Loader() {
  return (
    <>
        <Container className="mt-5">
          <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
              <Spinner animation="border" role="status" />
            </Col>
          </Row>
        </Container>
    </>
  );
}
