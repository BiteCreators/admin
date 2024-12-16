import { ReactNode, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

import { AuthContext } from '@/common/lib/hooks/useAuth'
import { LoaderBlock } from '@byte-creators/ui-kit'
import { useRouter } from 'next/router'

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [cookies, setCookie, removeCookie] = useCookies(['adminAccessToken'])
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (cookies.adminAccessToken) {
      const authString = cookies.adminAccessToken.split(' ')[1]

      if (authString) {
        try {
          const decoded = atob(authString)
          const [email, password] = decoded.split(':')

          if (email && password) {
            setIsAuthenticated(true)
            if (router.pathname === '/') {
              router.push('/users')
            }
          } else {
            setIsAuthenticated(false)
          }
        } catch (e) {
          setIsAuthenticated(false)
        }
      } else {
        setIsAuthenticated(false)
      }
    } else {
      setIsAuthenticated(false)
      if (router.pathname !== '/auth/sign-in') {
        router.push('/auth/sign-in')
      }
    }
  }, [cookies, router])

  const login = (email: string, password: string) => {
    const authString = `Basic ${btoa(`${email}:${password}`)}`

    setCookie('adminAccessToken', authString, { maxAge: 7 * 24 * 60 * 60, path: '/' })
    setIsAuthenticated(true)
    router.push('/users')
  }

  const logout = () => {
    removeCookie('adminAccessToken', { path: '/' })
    setIsAuthenticated(false)
    router.push('/auth/sign-in')
  }

  if (isAuthenticated === null) {
    return <LoaderBlock />
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
