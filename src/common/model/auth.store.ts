import { makeAutoObservable } from 'mobx'
import { NextRouter } from 'next/router'

class AuthStore {
  isAuth: boolean
  router?: NextRouter

  constructor() {
    makeAutoObservable(this)
    this.isAuth = false
  }

  login({ email, password }: { email: string; password: string }) {
    const authString = `Basic ${btoa(`${email}:${password}`)}`
    const maxAge = 7 * 24 * 60 * 60

    document.cookie = `adminAccessToken=${authString};max-age=${maxAge};secure;path=/;samesite=lax`
    this.isAuth = true

    this.router?.push('/users')
  }

  logout() {
    document.cookie = 'adminAccessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    this.isAuth = false

    this.router?.push('/auth/sign-in')
  }

  setRouter(router: NextRouter) {
    this.router = router
  }
}

export const authStore = new AuthStore()
