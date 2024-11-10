
'use client'

import useMails from '@/lib/hooks/useMails';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Badge, Dropdown, Form, ListGroup } from 'react-bootstrap';

const CustomToggle = React.forwardRef(({ children, onClick }: any, ref: any) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    >
        <Badge style={{ margin: 2 }} bg="secondary">+ Add label</Badge>
    </a>
));

const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }: any, ref: any) => {
      const [value, setValue] = useState<any>('');
  
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <Form.Control
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to search..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child: any) =>
                !value || child.props.children.toLowerCase().includes(value),
            ).slice(0, 5)}
          </ul>
        </div>
      );
    },
  );

export default function LabelSelector({ email }: any) {
    const { state: { folders }, actions: { resync } } = useMails();

    const updateLabels = useCallback(async (email: any, newFolderId: string) => {
      await updateLabelsApi(email.id, getOldLabels(email.folders, folders), newFolderId);
      resync();
    }, []);

    const options = useMemo(() => folders?.map(
        (f: any) => (
            <Dropdown.Item key={f.id} onClick={() => updateLabels(email, f.id)}>{f.name}</Dropdown.Item>
        )),
        [folders],
    );

    return (
        <>
            <Dropdown style={{ display: 'inline' }}>
                <Dropdown.Toggle as={CustomToggle}>
                    Add label
                </Dropdown.Toggle>
                <Dropdown.Menu as={CustomMenu}>
                    {options}
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
}

async function updateLabelsApi(emailId: string, oldLabels: any, newFolderId: string) {
  return await fetch(
    `/api/v1/messages/${emailId}`,
    {
      method: "PUT",
      body: JSON.stringify({
        folders: [...oldLabels, newFolderId],
      }),
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((json) => json);
}
function getOldLabels(oldFolders: any, folders: any): any {
  return oldFolders.map((folder: any) => folders.find((f: any) => f.name === folder).id);
}

