import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState
} from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'

import self from '@/services/self'
import useLocalStorage from '@/hooks/useLocalStorage'

type User = string

type SignInData = {
  app: string
  username: string
  password: string
}

type AuthContextType = {
  application: string
  setApplication: Dispatch<SetStateAction<string>>
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  user: User
  isAuthenticated: boolean
  loginError: boolean
  signIn: (data: SignInData) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const [application, setApplication, removeApplication] =
    useLocalStorage('@auth: app')
  const [loading, setLoading] = useState(true)
  const [loginError, setLoginError] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = !!user

  useEffect(() => {
    setLoading(true)
    try {
      const { 'nextauth.token': token } = parseCookies()

      if (token) {
        verifyLogin(application)
      } else {
        setLoading(false)
      }
    } catch (err) {
      console.log(err)
    }
  }, [user])

  async function verifyLogin(application) {
    if (application !== null) {
      try {
        setLoginError(false)
        const res = await self.get(`/api/login/verify/${application}`)
        if (res.data.user) {
          setUser(res.data.user)
          await Router.push(`/dashboard/${application}`)
        } else {
          signOut()
          setLoginError(true)
        }
      } catch (err) {
        console.log(err)
        setLoginError(true)
        signOut()
      }
    }
    setLoading(false)
  }

  async function signIn({ app, username, password }: SignInData) {
    setLoading(true)
    try {
      setApplication(app)
      const res = await self.post('/api/login', {
        application: app,
        username,
        password
      })
      const token = res.data
      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 1 // 1 hour
      })
    } catch (err) {
      console.log(err)
    }
    verifyLogin(app)
  }

  async function signOut() {
    setLoading(true)
    await removeApplication()
    destroyCookie(undefined, 'nextauth.token')
    setUser(null)
    Router.push('/')
    setLoading(false)
  }

  return (
    <AuthContext.Provider
      value={{
        application,
        setApplication,
        loading,
        setLoading,
        user,
        isAuthenticated,
        loginError,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
