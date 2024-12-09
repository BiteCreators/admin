import { useContext } from 'react'

import { AuthContext, AuthContextType } from '@/common/lib/hooks/useAuth'
import { SideNavbar } from '@/features/navigation/ui/SideNavbar'

import cl from '../ui/styles/Sidebar.module.scss'

export const Sidebar = () => {
  const { isAuthenticated } = useContext(AuthContext) as AuthContextType

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className={cl.navbarContainer}>
      <SideNavbar />
    </div>
  )
}
