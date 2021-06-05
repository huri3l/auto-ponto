import type { NextApiRequest, NextApiResponse } from 'next'

export default async function hello(
  request: NextApiRequest,
  response: NextApiResponse
) {
  response.status(200).json({ message: 'Hello from auto-ponto! :)' })
}
