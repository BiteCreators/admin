import { useContext } from 'react'

import { AuthContext, AuthContextType } from '@/common/lib/hooks/useAuth'
import { AppLogo } from '@/features/navigation'
import { AppBar, LanguageSelect } from '@byte-creators/ui-kit'

export const Header = () => {
  const { isAuthenticated } = useContext(AuthContext) as AuthContextType

  if (!isAuthenticated) {
    return null
  }

  return <AppBar content={<LanguageSelect />} logo={<AppLogo />} />
}
