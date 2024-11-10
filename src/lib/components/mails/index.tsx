'use client'

import { Container } from 'react-bootstrap';
import Header from "../header";
import MailList from "./mailList";
import MailsProvider from "@/lib/hooks/useMails/provider";

export default function Mails({ }: any) {
    return (
        <MailsProvider>
            <Container fluid className="mt-4">
                <Header />
                <MailList />
            </Container>
        </MailsProvider>
    );
}