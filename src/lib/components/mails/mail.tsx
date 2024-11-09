
'use client'

import {Badge, ListGroup } from 'react-bootstrap';

export default function Mail({ email }: any) {
    return (
        <>
            <ListGroup.Item
                key={email.id}
            >
                #{email.id} <strong>{email.from[0].email}</strong> - {email.subject} {email.folders.map(f => (
                    <Badge>{f}</Badge>
                ))}
                <p className="mb-0 text-muted">{email.snippet}</p>
            </ListGroup.Item>
        </>
    );
}