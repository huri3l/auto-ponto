import { AuthContext } from '@/contexts/auth'
import { useContextSelector } from 'use-context-selector'

export function useLogin() {
  const signIn = useContextSelector(AuthContext, auth => auth.signIn)
  const signOut = useContextSelector(AuthContext, auth => auth.signOut)
  const loginError = useContextSelector(AuthContext, auth => auth.loginError)

  return {
    signIn,
    signOut,
    loginError
  }
}
