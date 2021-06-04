import type { NextApiRequest, NextApiResponse } from 'next'

export default async function login(request: NextApiRequest, response: NextApiResponse) {
  response.status(200).json({ message: 'Hello from auto-ponto! :)' })
}
