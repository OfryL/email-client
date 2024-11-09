import { cookies } from 'next/headers'
import Nylas from "nylas";

const nylas = new Nylas({
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI
})

export async function GET(request: Request) {
  const authUrl = nylas.auth.urlForOAuth2({
    clientId: process.env.NYLAS_CLIENT_ID,
    provider: 'google',
    redirectUri: encodeURI(process.env.NYLAS_REDIRECT_URI),
  })
  return Response.redirect(authUrl)
}