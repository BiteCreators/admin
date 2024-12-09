import { createContext, useContext } from 'react'

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
export type AuthContextType = {
  isAuthenticated: boolean
  login: (email: string, password: string) => void
  logout: () => void
}
export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
