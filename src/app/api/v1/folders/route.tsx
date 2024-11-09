import { cookies } from 'next/headers'
import { type NextRequest } from 'next/server'
import Nylas from "nylas"

const nylas = new Nylas({
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI
})

async function fetchFolders(grantId: any) {
  const result = await nylas.folders.list({
    identifier: grantId,
  })
  let data = [...result.data];
  let t;
  while ( t = await result.next()) {
    if (!t.value) break;
    data = [...data, ...t.value.data]
  }
  return data;
}

export async function GET(request: Request & NextRequest) {
  const cookieStore = cookies()

  const cookie = cookieStore.get('nylas_user_grant_id')
  const { value: grantId } = cookie as any;


  try {
    const data = await fetchFolders(grantId)
    return Response.json({ data })
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Internal Server Error', inner: error }, { status: 500 })
  }
}

