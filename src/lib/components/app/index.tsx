'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import cookierCutter from 'cookie-cutter';
import Login from "../login";
import Mails from "../mails";

export default function App() {
  const [userGrantId, setGrantId] = useState(null)
  const [userName, setUserName] = useState(null)

  useEffect(() => {
    const grantId = cookierCutter.get('nylas_user_grant_id')
    if (grantId) {
      setGrantId(grantId)
    }
    const email = cookierCutter.get('nylas_user_email')
    if (email) {
        setUserName(email)
    }
  }, [])

  return !!userGrantId ? (
        <Mails userName={userName} />
     ) : (
        <Login />
     );
}
