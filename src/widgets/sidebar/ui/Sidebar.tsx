import { useContext } from 'react'

import { AuthContext, AuthContextType } from '@/common/lib/hooks/useAuth'
import { SideNavbar } from '@/features/navigation/ui/SideNavbar'

import cl from '../ui/styles/Sidebar.module.scss'

export const Sidebar = () => {
  return (
    <div className={cl.navbarContainer}>
      <SideNavbar />
    </div>
  )
}
