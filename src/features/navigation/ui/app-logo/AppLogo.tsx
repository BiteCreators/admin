import Link from 'next/link'

import cl from './AppLogo.module.scss'

export const AppLogo = () => {
  return (
    <Link className={cl.link} href={'/'}>
      Inctagram <span className={cl.super}>Super</span>
      <span className={cl.admin}>Admin</span>
    </Link>
  )
}
