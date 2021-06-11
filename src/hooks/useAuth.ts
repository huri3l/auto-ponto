import { AuthContext } from '@/contexts/auth'
import { useContextSelector } from 'use-context-selector'

export function useAuth() {
  const application = useContextSelector(AuthContext, auth => auth.application)
  const setApplication = useContextSelector(
    AuthContext,
    auth => auth.setApplication
  )
  const loading = useContextSelector(AuthContext, auth => auth.loading)
  const setLoading = useContextSelector(AuthContext, auth => auth.setLoading)
  const user = useContextSelector(AuthContext, auth => auth.user)
  const isAuthenticated = useContextSelector(
    AuthContext,
    auth => auth.isAuthenticated
  )
  const loginError = useContextSelector(AuthContext, auth => auth.loginError)
  const signIn = useContextSelector(AuthContext, auth => auth.signIn)
  const signOut = useContextSelector(AuthContext, auth => auth.signOut)

  return {
    application,
    setApplication,
    loading,
    setLoading,
    user,
    isAuthenticated,
    loginError,
    signIn,
    signOut
  }
}
