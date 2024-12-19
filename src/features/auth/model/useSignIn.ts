import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { LOGIN_ADMIN } from '@/features/auth/api/loginAdminQueries'
import { useMutation } from '@apollo/client'
import { useScopedTranslation } from '@byte-creators/utils'
import { authStore } from '@/common/model/auth.store'
import { useRouter } from 'next/router'

type SignInFormValues = {
  email: string
  password: string
}

export const useSignIn = () => {
  const [error, setError] = useState<null | string>(null)
  const t = useScopedTranslation('Auth')
  const [loginAdmin] = useMutation(LOGIN_ADMIN)
  const [useCookie, setUseCookie] = useState(true)
  const { control, handleSubmit, setValue } = useForm<SignInFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const router = useRouter()

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      if (!useCookie) {
        return
      }
      console.log('HERE')
      const { data: loginData } = await loginAdmin({
        variables: { email: data.email, password: data.password },
      })

      if (loginData?.loginAdmin?.logged) {
        authStore.login({ ...data, router })
      } else {
        setError('Invalid credentials')
      }
    } catch (err) {
      setError('An error occurred during authentication: ' + err)
    }
  }

  return {
    control,
    error,
    handleSubmit,
    onSubmit,
    setError,
    setUseCookie,
    t,
    useCookie,
  }
}
