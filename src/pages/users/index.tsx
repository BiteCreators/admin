import { BlockUsersFilter, UsersTable } from '@/features/users'
import { SearchComponent } from '@byte-creators/ui-kit/components'

import style from './users.module.scss'

const Users = () => {
  return (
    <div className={style.usersListContainer}>
      <div className={style.containerForFilterAndSearch}>
        <SearchComponent />
        <BlockUsersFilter />
      </div>
      <UsersTable />
    </div>
  )
}

export default Users
