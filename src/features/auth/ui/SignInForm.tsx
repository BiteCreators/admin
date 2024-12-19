import { useSignIn } from '@/features/auth/model/useSignIn'
import { Alert, Button, Card, FormInput, Typography } from '@byte-creators/ui-kit'

import cl from './styles/sign-in-form.module.scss'
import { AcceptCookieAlert } from './AcceptCookieAlert'

export const SignInForm = () => {
  const { control, error, handleSubmit, onSubmit, setError, setUseCookie, t, useCookie } =
    useSignIn()

  return (
    <>
      <Card className={cl.card}>
        <Typography className={cl.title} variant={'h1'}>
          {t.signIn}
        </Typography>
        <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            className={cl.defaultInput}
            control={control}
            label={t.email}
            name={'email'}
            required
          />
          <FormInput
            control={control}
            inputType={'reveal'}
            label={t.password}
            name={'password'}
            required
          />
          <Button className={cl.button} type={'submit'}>
            {t.signIn}
          </Button>
        </form>
        {error && (
          <Alert
            canClose={false}
            message={error}
            onClose={() => setError('')}
            purpose={'alert'}
            type={'error'}
          />
        )}
      </Card>
      <AcceptCookieAlert setUseCookie={setUseCookie} useCookie={useCookie} />
    </>
  )
}
