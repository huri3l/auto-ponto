import axios from 'axios'
import { parseCookies } from 'nookies'

export default function getAPIClient(ctx?: any) {
  const { 'nextauth.token': token } = parseCookies(ctx)

  const api = axios.create({
    baseURL: 'https://www.dimepkairos.com.br/Dimep',
    maxRedirects: 0,
    headers: {
      'Content-Type': 'application/json'
    },
    validateStatus: () => true
  })

  if (token) {
    api.defaults.headers['cookie'] = token
  }

  return api
}
