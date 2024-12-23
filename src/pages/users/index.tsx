import { Search } from '@/features/search-params'
import { BlockUsersFilter } from '@/features/search-params/block-filter/ui/BlockUsersFilter'
import { UsersTable } from '@/features/users'

import style from './users.module.scss'

const Users = () => {
  return (
    <div className={style.usersListContainer}>
      <div className={style.containerForFilterAndSearch}>
        <Search paramName={'user_name'} />
        <BlockUsersFilter />
      </div>
      <UsersTable />
    </div>
  )
}

export default Users
