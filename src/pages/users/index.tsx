import { BlockUsersFilter } from '@/features/search-params/block-filter/ui/BlockUsersFilter'
import { UsersSearch } from '@/features/search-params/users-search/ui/UsersSearch'
import { UsersTable } from '@/features/users'

import style from './users.module.scss'

const Users = () => {
  return (
    <div className={style.usersListContainer}>
      <div className={style.containerForFilterAndSearch}>
        <UsersSearch />
        <BlockUsersFilter />
      </div>
      <UsersTable />
    </div>
  )
}

export default Users
