import { Space } from 'antd'
import { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/auth'
import 'antd/dist/antd.css'

import '@/styles/vars.css'
import '@/styles/global.css'
import Layout from '@/layouts'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}
