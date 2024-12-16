import { SideNavbarItem } from '@byte-creators/ui-kit'
import {
  CreditCard,
  CreditCardOutline,
  Image,
  ImageOutline,
  Person,
  PersonOutline,
  TrendingUp,
  TrendingUpOutline,
} from '@byte-creators/ui-kit/icons'

import cl from '../ui/styles/sideNavbar.module.scss'

export const SideNavbar = () => {
  return (
    <nav className={cl.nav}>
      <div className={cl.navItemContainer}>
        <SideNavbarItem
          href={'/users'}
          icon={<PersonOutline />}
          iconActive={<Person />}
          label={'Users list'}
        />
        <SideNavbarItem
          href={`/statistics`}
          icon={<TrendingUpOutline />}
          iconActive={<TrendingUp />}
          label={'Statistics'}
        />
        <SideNavbarItem
          href={'/payments'}
          icon={<CreditCardOutline />}
          iconActive={<CreditCard />}
          label={'Payments list'}
        />
        <SideNavbarItem
          href={'/posts'}
          icon={<ImageOutline />}
          iconActive={<Image />}
          label={'Posts list'}
        />
      </div>
    </nav>
  )
}
