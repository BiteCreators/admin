import { Search } from '@/features/search'
import { BlockUsersFilter, UsersTable } from '@/features/users'

import style from './users.module.scss'

const Users = () => {
  return (
    <div className={style.usersListContainer}>
      <div className={style.containerForFilterAndSearch}>
        <Search />
        <BlockUsersFilter />
      </div>
      <UsersTable />
    </div>
  )
}

export default Users
