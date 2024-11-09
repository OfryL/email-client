'use client'

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Container, Row, Col, ListGroup, Button, Card, Spinner, Form, Badge, Alert } from 'react-bootstrap';
import Mail from "./mail";
import Chart from "react-google-charts";

const formatChartData = (data: any) => {
    const chartdata = Object.keys(data).map(f => [f, data[f]]);
    return [
        ["",""],
        ...chartdata,
    ];
};

export default function MailList({ }: any) {
    const [data, setData] = useState<any>(null)
    const [chartdata, setChartData] = useState<any>(null)
    const [lastSync, setLastSync] = useState<any>(null)
    const [isLoading, setLoading] = useState(false)
    const [selectedDate, setSelectedDate] = useState(null);

    const fetchMails = useCallback((date: any | null = null) => {
        console.log('fetch: ' + date);

        fetch(
            date ? '/api/v1/emails?forDate=' + date : '/api/v1/emails'
        )
            .then((res) => res.json())
            .then((data) => {
                setData(data.result);
                setChartData(formatChartData(data.foldersUsage));
                setLoading(false);
                setLastSync(new Date().toLocaleString());
            });
    }, [isLoading, lastSync, data]);

    const resync = useCallback(() => {
        if (!isLoading) {
            console.log('resync ' + selectedDate);
            setLoading(true);
            fetchMails(selectedDate);
        }
    }, [isLoading, selectedDate]);

    const handleChange = useCallback((date: any) => {
        setSelectedDate(date);
    }, [selectedDate]);

    useLayoutEffect(() => {
        resync();
    }, [])

    useEffect(() => {
        if (selectedDate) {
            console.log('new date' + selectedDate);
            resync();
        }
    }, [selectedDate])

    return (
        <>
            <Container fluid className="mt-4">
                <Row>

                    <Col className="border-end">

                        {isLoading || !data ? <>
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
                                {data ? (<>
                                    {data.length ? data.map((email: any) => (
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