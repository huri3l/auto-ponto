import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState
} from 'react'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import Router from 'next/router'

import self from '../services/self'
import useLocalStorage from '../hooks/useLocalStorage'

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
  isAuthenticated: boolean
  user: User
  signIn: (data: SignInData) => Promise<void>
  signOut: () => Promise<void>
  verifyLogin: () => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
  const [application, setApplication, removeApplication] =
    useLocalStorage('@auth: app')
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = !!user

  useEffect(() => {
    setLoading(true)
    try {
      const { 'nextauth.token': token } = parseCookies()

      if (token) {
        verifyLogin()
      } else {
        signOut()
      }
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }, [user])

  async function verifyLogin() {
    try {
      const res = await self.get(`/api/login/verify/${application}`)
      if (res.data.user) {
        setUser(res.data.user)
        Router.push(`/dashboard/${application}`)
      } else {
        signOut()
      }
    } catch (err) {
      console.log(err)
      signOut()
    }
  }

  async function signIn({ app, username, password }: SignInData) {
    setLoading(true)
    try {
      setApplication(application)
      const res = await self.post('/api/login', {
        application: app,
        username,
        password
      })
      const token = res.data.token

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 1 // 1 hour
      })

      self.defaults.headers['cookie'] = token
    } catch (err) {
      console.log(err)
    }
    verifyLogin()
    setLoading(false)
  }

  async function signOut() {
    setLoading(true)
    destroyCookie(undefined, 'nextauth.token')
    setUser(null)
    removeApplication()
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
        signIn,
        signOut,
        verifyLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
