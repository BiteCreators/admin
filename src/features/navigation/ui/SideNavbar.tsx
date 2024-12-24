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
import { useScopedTranslation } from '@byte-creators/utils'

import cl from '../ui/styles/sideNavbar.module.scss'

export const SideNavbar = () => {
  const t = useScopedTranslation('Navigation')

  return (
    <nav className={cl.nav}>
      <div className={cl.navItemContainer}>
        <SideNavbarItem
          href={'/users'}
          icon={<PersonOutline />}
          iconActive={<Person />}
          label={t.usersList}
        />
        <SideNavbarItem
          href={`/statistics`}
          icon={<TrendingUpOutline />}
          iconActive={<TrendingUp />}
          label={t.statistics}
        />
        <SideNavbarItem
          href={'/payments'}
          icon={<CreditCardOutline />}
          iconActive={<CreditCard />}
          label={t.paymentsList}
        />
        <SideNavbarItem
          href={'/posts'}
          icon={<ImageOutline />}
          iconActive={<Image />}
          label={t.postsList}
        />
      </div>
    </nav>
  )
}
