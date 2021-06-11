import { AuthContext } from '@/contexts/auth'
import { useContextSelector } from 'use-context-selector'

export function useLoading() {
  const loading = useContextSelector(AuthContext, auth => auth.loading)

  return {
    loading
  }
}
