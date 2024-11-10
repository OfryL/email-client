'use client'

import { useEffect, useState } from "react";
import Login from "../login";
import Mails from "../mails";
import Loader from "./loader";
import { getGrantIdCookie } from "@/lib/utils/cookies";

export default function App() {
  const [userGrantId, setGrantId] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const grantId = getGrantIdCookie()
    if (grantId) {
      setGrantId(grantId)
    }
    setLoading(false)
  }, [])

  return (
    <>
      {isLoading ? <>
        <Loader/>
      </> : <>
        {!!userGrantId ? (
          <Mails />
        ) : (
          <Login />
        )}
      </>}
    </>
  );
}
