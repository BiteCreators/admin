import { ReactNode, useEffect } from 'react'
import { useCookies } from 'react-cookie'

import { authStore } from '@/common/model/auth.store'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = observer(({ children }: AuthProviderProps) => {
  const [cookies] = useCookies(['adminAccessToken'])
  const router = useRouter()

  useEffect(() => {
    authStore.setRouter(router)
  }, [router])

  if (!cookies.adminAccessToken) {
    authStore.isAuth = false
  } else {
    authStore.isAuth = true
  }

  return <>{children}</>
})
