import { ReactNode } from 'react'
import { useCookies } from 'react-cookie'

import { authStore } from '@/common/model/auth.store'
import { observer } from 'mobx-react'

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = observer(({ children }: AuthProviderProps) => {
  const [cookies] = useCookies(['adminAccessToken'])

  if (!cookies.adminAccessToken) {
    authStore.isAuth = false
  } else {
    authStore.isAuth = true
  }

  return children
})
