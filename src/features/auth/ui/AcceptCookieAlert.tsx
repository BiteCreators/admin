import { useEffect, useState } from 'react'

import { ButtonWithEscape } from '@/features/auth/ui/ButtonWithEscape'
import { Alert, Button, Typography } from '@byte-creators/ui-kit'

import cl from './styles/accept-cookie-alert.module.scss'

type Props = {
  setUseCookie: (useCookie: boolean) => void
  useCookie: boolean
}
export const AcceptCookieAlert = ({ setUseCookie, useCookie }: Props) => {
  const [open, setOpen] = useState(true)
  const [isClient, setIsClient] = useState(false)

  const buttonHandler = () => {
    setUseCookie(true)
    setOpen(false)
  }

  useEffect(() => {
    if (document) {
      setIsClient(true)
    } else {
      setIsClient(false)
    }
  }, [])

  if (!isClient) {
    return null
  }

  const content = (
    <div>
      <Typography variant={'medium-text'}>
        Our website uses cookies to improve your site experience, efficiency and usability. By
        continuing to use inctbc.ru, you agree to the use of cookies.
      </Typography>
      <div className={cl.buttonContainer}>
        <ButtonWithEscape />
        <Button onClick={buttonHandler} style={{ marginLeft: '20px' }} variant={'primary'}>
          Yes
        </Button>
      </div>
    </div>
  )

  return (
    <Alert
      alertContent={content}
      canClose={false}
      className={'md:left-0'}
      onClose={buttonHandler}
      open={open}
      portal
      purpose={'toast'}
      type={'modal'}
    />
  )
}
