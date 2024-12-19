import { makeAutoObservable } from 'mobx'
import { NextRouter } from 'next/router'

class AuthStore {
  isAuth: boolean

  constructor() {
    makeAutoObservable(this)
    this.isAuth = false
  }

  login({ email, password, router }: { email: string; password: string; router?: NextRouter }) {
    const authString = `Basic ${btoa(`${email}:${password}`)}`

    const maxAge = 7 * 24 * 60 * 60
    document.cookie = `adminAccessToken=${authString};max-age=${maxAge};secure;path=/;samesite=lax`
    this.isAuth = true
    //TODO: find out is there a way to include router inside mobx
    router?.push('/users')
  }

  logout({ router }: { router?: NextRouter }) {
    document.cookie = 'adminAccessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    this.isAuth = false
    router?.push('/auth/sign-in')
  }
}

export const authStore = new AuthStore()
