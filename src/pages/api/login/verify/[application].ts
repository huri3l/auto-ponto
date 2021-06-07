import type { NextApiRequest, NextApiResponse } from 'next'
import { parseCookies } from 'nookies'

import api from '@/services/api'

export default async function verify(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === 'GET') {
    try {
      const application: string = request.query.application as string
      const { 'nextauth.token': token } = parseCookies({ req: request })
      await api[application].auth(token)
      const res = await api[application].verifyLogin()

      response.status(res.status).json(res.data)
    } catch (err) {
      console.log(err)
      response.status(500).json({ error: err.message })
    }
  } else {
    response.status(405).json({ error: 'Method not allowed!' })
  }
}
