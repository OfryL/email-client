import { cookies } from 'next/headers'
import { type NextRequest } from 'next/server'
import Nylas from "nylas"

const nylas = new Nylas({
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI
})

export async function GET(request: Request & NextRequest) {
  const cookieStore = cookies()

  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code') as string

  const { grantId } = await nylas.auth.exchangeCodeForToken({ 
    clientSecret: process.env.NYLAS_API_KEY,
    clientId: process.env.NYLAS_CLIENT_ID,
    code,
    redirectUri: process.env.NYLAS_REDIRECT_URI,
  })

  cookieStore.set('nylas_user_grant_id', grantId)

  return Response.redirect('http://localhost:3000')
}