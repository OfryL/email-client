import { cookies } from 'next/headers'
import Nylas from "nylas"

const nylas = new Nylas({
  apiKey: process.env.NYLAS_API_KEY,
  apiUri: process.env.NYLAS_API_URI
})

export async function PUT(request: Request, { params }: any) {
    const { id } = params;
    const { folders } = await request.json();

  const cookieStore = cookies()

  const cookie = cookieStore.get('nylas_user_grant_id')
  const { value: grantId } = cookie as any;

  try {
    const data = await nylas.messages.update({
        identifier: grantId,
        messageId: id,
        requestBody: {
            folders,
        }
    })
    return Response.json({ data })
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Internal Server Error', inner: error }, { status: 500 })
  }
}
