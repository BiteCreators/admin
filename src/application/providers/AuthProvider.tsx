import { authStore } from '@/common/model/auth.store'
import { ReactNode } from 'react'
import { observer } from 'mobx-react'
import { useCookies } from 'react-cookie'

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = observer(({ children }: AuthProviderProps) => {
  const [cookies, setCookie, removeCookie] = useCookies(['adminAccessToken'])

  if (!cookies.adminAccessToken) {
    authStore.isAuth = false
  } else {
    authStore.isAuth = true
  }

  return children
})
