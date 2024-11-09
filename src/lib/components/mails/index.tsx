'use client'

import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import cookierCutter from 'cookie-cutter';

import 'react-datepicker/dist/react-datepicker.css';

import { Container } from 'react-bootstrap';
import Header from "../header";
import MailList from "./mailList";

export default function Mails({ userName }: any) {

    const logout = useCallback(() => {
        cookierCutter.set('nylas_user_grant_id', undefined, { expires: new Date(0) })
        window.location.reload();
    }, []);

    return (
        <>
            <Container fluid className="mt-4">

                <Header username={userName} onLogout={logout} />
                <MailList />
            </Container>
        </>
    );
}