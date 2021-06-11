import Loading from '@/components/loading'
import { useLoading } from '@/hooks/useLoading'

export default function Layout({ children }) {
  const { loading } = useLoading()
  return <>{loading ? <Loading /> : children}</>
}
