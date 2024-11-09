'use client'

import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import cookierCutter from '../../cookie-cutter';
import { Container } from 'react-bootstrap';
import Header from "../header";
import MailList from "./mailList";

export default function Mails({ }: any) {
    return (
        <>
            <Container fluid className="mt-4">
                <Header />
                <MailList />
            </Container>
        </>
    );
}