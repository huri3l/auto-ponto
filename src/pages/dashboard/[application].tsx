import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

export default function Dashboard() {
  return (
    <div>
      <Head>
        <title>Dashboard - Auto Ponto</title>
      </Head>
      <p>dash</p>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { ['nextauth.token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  // const application: string = ctx.query.application as string

  return
}
