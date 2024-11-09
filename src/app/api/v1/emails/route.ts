import { cookies } from 'next/headers'
import { type NextRequest } from 'next/server'
import Nylas, { ListMessagesQueryParams } from "nylas"

const nylas = new Nylas({
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI
})

const getParams = (forDate: string, pageToken: string | null = null) => {
  let searchQueryNative = '';

  const params: ListMessagesQueryParams = {
    limit: 5,
  }

  if (pageToken) {
    params.pageToken = pageToken
  }

  const today = forDate ? new Date(forDate) : new Date()
  const theDayafter = new Date(today)
  theDayafter.setDate(today.getDate() + 1)

  searchQueryNative = searchQueryNative + ' after:' + today.toISOString().split('T')[0]
  searchQueryNative = searchQueryNative + ' before:' + theDayafter.toISOString().split('T')[0]

  params.searchQueryNative = searchQueryNative;

  return params
}

async function fetchMails(grantId: any, forDate: string, pageToken: string | null = null) {
  const params: ListMessagesQueryParams = getParams(forDate, pageToken);
  const result = await nylas.messages.list({
    identifier: grantId,
    queryParams: params,
  })

  let data = result.data;
  if (result.nextCursor) {
    const moreData = await fetchMails(grantId, forDate, result.nextCursor);
    data = [...result.data, ...moreData];
  } else {
    data = result.data;
  }
  return data;
}

function serializeResult(result: any) {
  const foldersUsage: any = {}
  for (const r in result) {    
    for (const folder in result[r].folders) {
      const key = result[r].folders[folder];
      foldersUsage[key] = (foldersUsage[key] || 0) + 1; 
    } 
  }
  return {
    result,
    foldersUsage,
  };
}

export async function GET(request: Request & NextRequest) {
  const cookieStore = cookies()

  const cookie = cookieStore.get('nylas_user_grant_id')
  const { value: grantId } = cookie as any;

  const searchParams = request.nextUrl.searchParams;
  const forDate = searchParams.get('forDate') as string

  try {
    const result = await fetchMails(grantId, forDate)
    return Response.json(serializeResult(result))
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Internal Server Error', inner: error }, { status: 500 })
  }
}

