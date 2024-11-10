
'use client'

import { Badge, ListGroup } from 'react-bootstrap';
import LabelSelector from '../label-selector';

export default function Mail({ email }: any) {
    return (
        <>
            <ListGroup.Item
                key={email.id}
            >
                <strong>{email.from[0].email}</strong> - {email.subject} {email.folders.map((f: any) => (
                    <Badge style={{ margin: 2 }} key={f}>{f}</Badge>
                ))}
                <LabelSelector email={email} />
                <p className="mb-0 text-muted">{email.snippet}</p>
            </ListGroup.Item>
        </>
    );
}