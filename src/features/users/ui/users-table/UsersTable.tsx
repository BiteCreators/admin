import * as React from 'react'

import { GetUsersQuery, UserBlockStatus } from '@/common/__generated-types__/graphql'
import { TableFactory } from '@/common/ui/table-factory/TableFactory'
import { SortStore, TableSortButton, USERS_SORT_BY } from '@/entities/sort'
import { TableHeader } from '@byte-creators/ui-kit'
import { Block } from '@byte-creators/ui-kit/icons'
import { useScopedTranslation } from '@byte-creators/utils'
import Link from 'next/link'
import { useRouter } from 'next/router'

import s from './styles.module.scss'

import { GET_USERS } from '../../api/usersQuery'
import { Options } from '../options/Options'

const sortStore = new SortStore(USERS_SORT_BY)

export const UsersTable = () => {
  const t = useScopedTranslation('FollowersAdmin')
  const { query } = useRouter()
  const { block_status_filter }: { block_status_filter?: UserBlockStatus } = query

  const headers: TableHeader[] = [
    {
      name: t.userId,
    },
    {
      name: t.userName,
      //TODO: fix those typings
      sort: (
        <TableSortButton<typeof USERS_SORT_BY>
          sortBy={USERS_SORT_BY.UserName}
          sortStore={sortStore}
        />
      ),
    },
    {
      name: t.profileLink,
    },
    {
      name: t.dateAdded,
      sort: (
        <TableSortButton<typeof USERS_SORT_BY>
          sortBy={USERS_SORT_BY.DateAdded}
          sortStore={sortStore}
        />
      ),
    },
    {
      name: '',
    },
  ]
  const getTableData = (data: GetUsersQuery | undefined, refetch: () => void) => {
    if (!data) {
      return []
    }

    return data.getUsers.users.map(user => {
      return {
        1: (
          <div className={s.table__users}>
            <div className={s.table__bun}>{!!user.userBan?.reason && <Block />}</div>
            {user.id}
          </div>
        ),
        2: <span>{user.userName}</span>,
        3: (
          <Link className={'link'} href={`users/${user.id}`}>
            {user.userName}
          </Link>
        ),
        4: new Date(user.createdAt).toLocaleDateString(),
        5: (
          <Options
            isBan={!!user.userBan?.reason}
            refetchUsers={refetch}
            userId={user.id}
            userName={user.userName}
          />
        ),
      }
    })
  }

  const getPagesCount = (data: GetUsersQuery) => data.getUsers.pagination.pagesCount

  return (
    <TableFactory
      defaultPageSize={8}
      extraVariables={{
        statusFilter: block_status_filter || UserBlockStatus.All,
      }}
      getPagesCount={getPagesCount}
      getTableData={getTableData}
      headers={headers}
      query={GET_USERS}
    />
  )
}
