import { makeAutoObservable } from 'mobx'
import Router from 'next/router'

class AuthStore {
  isAuth: boolean

  constructor() {
    makeAutoObservable(this)
    this.isAuth = false
  }

  login({ email, password }: { email: string; password: string; }) {
    const authString = `Basic ${btoa(`${email}:${password}`)}`

    const maxAge = 7 * 24 * 60 * 60

    document.cookie = `adminAccessToken=${authString};max-age=${maxAge};secure;path=/;samesite=lax`
    this.isAuth = true
    Router.push('/users')
  }

  logout() {
    document.cookie = 'adminAccessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    this.isAuth = false
    Router.push('/auth/sign-in')
  }
}

export const authStore = new AuthStore()
