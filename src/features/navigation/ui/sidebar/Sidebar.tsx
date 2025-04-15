import s from './Sidebar.module.scss'

import { SideNavbar } from './SideNavbar'

export const Sidebar = () => {
  return (
    <div className={s.navbarContainer}>
      <SideNavbar />
    </div>
  )
}
