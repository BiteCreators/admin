import { useContext } from 'react'

import { AuthContext, AuthContextType } from '@/common/lib/hooks/useAuth'
import { AppLogo } from '@/features/navigation'
import { AppBar } from '@byte-creators/ui-kit'
import dynamic from 'next/dynamic'
//TODO: импортировать LanguageSelect из ui kit

// const LanguageSelect = dynamic(() => import('host/language-select').then(mod => mod.LanguageSelect))

export const Header = () => {
  const { isAuthenticated } = useContext(AuthContext) as AuthContextType

  if (!isAuthenticated) {
    return null
  }

  return (
    <AppBar
      // content={<LanguageSelect />}
      logo={<AppLogo />}
    />
  )
}
