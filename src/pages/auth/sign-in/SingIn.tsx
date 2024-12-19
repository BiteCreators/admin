import React from 'react'

import { SignInForm } from '@/features/auth'

import cl from '../sign-in/sign-in.module.scss'
import { NextPageWithLayout } from '@/pages/_app'
import { AuthLayout } from '@/application/layouts/AuthLayout'

const SignIn: NextPageWithLayout = () => {
  return (
    <div className={cl.container}>
      <SignInForm />
    </div>
  )
}

SignIn.getLayout = AuthLayout

export default SignIn
