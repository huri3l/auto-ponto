import type { NextApiRequest, NextApiResponse } from 'next'

import api from '@/services/api'

export default async function login(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === 'POST') {
    try {
      const res = await api[request.body.application].login(request.body)
      response.status(res.status).json(res.data)
    } catch (err) {
      console.log(err)
      response.status(500).json({ error: err.message })
    }
  } else {
    response.status(405).json({ error: 'Method not allowed!' })
  }
}
