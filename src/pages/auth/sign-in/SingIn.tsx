import React from 'react'

import { AuthLayout } from '@/application/layouts/AuthLayout'
import { SignInForm } from '@/features/auth'
import { NextPageWithLayout } from '@/pages/_app'

import cl from '../sign-in/sign-in.module.scss'

const SignIn: NextPageWithLayout = () => {
  return (
    <div className={cl.container}>
      <SignInForm />
    </div>
  )
}

SignIn.getLayout = AuthLayout

export default SignIn
