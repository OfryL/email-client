'use client'

import { useCallback, useEffect, useLayoutEffect } from "react";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Container, Row, Col, ListGroup, Button, Spinner, Form, Alert } from 'react-bootstrap';
import Mail from "./mail";
import Chart from "react-google-charts";
import useMails from "@/lib/hooks/useMails";

export default function MailList({ }: any) {
    const {
        state: { selectedDate, emails, lastSync, isLoading, chartdata },
        actions: { setSelectedDate, resync, },
    } = useMails();

    const handleChange = useCallback((date: any) => {
        setSelectedDate(date);
    }, [selectedDate]);

    return (
        <>
            <Container fluid className="mt-4">
                <Row>

                    <Col className="border-end">

                        {isLoading || !emails ? <>
                            <span className="visually-hidden">Loading...</span>
                            <Spinner animation="border" role="status" />
                        </> : <>
                            <h5>Inbox</h5>

                            <Form.Group controlId="datePicker">
                                <Form.Label>Filter by a Date</Form.Label>
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={handleChange}
                                    dateFormat="yyyy/MM/dd"
                                    className="form-control"
                                    placeholderText="Click to select a date"
                                />
                            </Form.Group>

                            <Chart
                                chartType="PieChart"
                                data={chartdata}
                                options={{
                                    title: "Folders",
                                }}
                                width={"100%"}
                                height={"400px"}
                            />

                            <ListGroup>
                                {emails ? (<>
                                    {emails.length ? emails.map((email: any) => (
                                        <Mail key={email.id} email={email} />
                                    )) : <Alert>No data, please select another date.</Alert>}
                                </>) : (<>
                                    Error
                                </>)}
                            </ListGroup>
                            <span>Last sync: {lastSync} </span>
                            <Button size="sm" onClick={resync}>resync</Button>
                        </>}
                    </Col>
                </Row>
            </Container>
        </>
    );
}