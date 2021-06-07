import Loading from '@/components/loading'
import useAuth from '@/hooks/useAuth'

export default function Layout({ children }) {
  const { loading } = useAuth()
  return <>{loading ? <Loading /> : children}</>
}
