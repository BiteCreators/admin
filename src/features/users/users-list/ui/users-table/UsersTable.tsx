import * as React from 'react'

import { useUsers } from '@/features/users/users-list/model/useUsers'
import { Options } from '@/features/users/users-list/ui/options/Options'
import {
  Alert,
  LoaderBlock,
  Pagination,
  Recaptcha,
  Table,
  TableHeader,
} from '@byte-creators/ui-kit'
import { Block } from '@byte-creators/ui-kit/icons'
import Link from 'next/link'

import s from './styles.module.scss'
import { TableSortButton, USERS_SORT_BY } from '@/entities/sort'

export const UsersTable = () => {
  const {
    handlerPageNumber,
    handlerPageSize,
    refetchUsers,
    usersListData,
    usersListError,
    usersListLoading,
    sortStore
  } = useUsers()

  if (usersListLoading) {
    return <LoaderBlock />
  }

  const exampleUsersData = usersListData?.getUsers.users.map(user => {
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
          refetchUsers={refetchUsers}
          userId={user.id}
          userName={user.userName}
        />
      ),
    }
  })

  const headers: TableHeader[] = [
    {
      name: 'User ID',
    },
    {
      name: 'Username',
      //TODO: fix those typings
      sort: <TableSortButton<typeof USERS_SORT_BY> sortStore={sortStore} sortBy={USERS_SORT_BY.UserName} />,
    },
    {
      name: 'Profile link',
    },
    {
      name: 'Date added',
      sort: <TableSortButton<typeof USERS_SORT_BY> sortStore={sortStore} sortBy={USERS_SORT_BY.DateAdded} />,
    },
    {
      name: '',
    },
  ]

  return (
    <div className={s.table}>
      {usersListError && <Alert message={usersListError.message} type={'error'} />}
      <Table
        classNameHeadersItem={s.table__headers}
        headers={headers}
        tableData={exampleUsersData || []}
      />
      <Pagination
        currentPage={usersListData?.getUsers.pagination.page || 1}
        onChangePagesPortion={handlerPageSize}
        onClickPaginationButton={handlerPageNumber}
        pagesCount={usersListData?.getUsers.pagination.pagesCount || 1}
        pagesPortion={String(usersListData?.getUsers.pagination.pageSize || 10)}
      />
    </div>
  )
}
