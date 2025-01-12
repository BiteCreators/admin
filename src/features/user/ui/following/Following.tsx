import React from 'react'

import { GetFollowingQuery } from '@/common/__generated-types__/graphql'
import { TableFactory } from '@/common/ui/table-factory/TableFactory'
import { SortStore, TableSortButton, USERS_SORT_BY } from '@/entities/sort'
import { TableHeader } from '@byte-creators/ui-kit'
import { useScopedTranslation } from '@byte-creators/utils'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { GET_FOLLOWING } from '../../api/followingQuery'

const sortStore = new SortStore(USERS_SORT_BY)

export const Following = () => {
  const { query } = useRouter()
  const t = useScopedTranslation('FollowersAdmin')

  const getTableData = (data: GetFollowingQuery | undefined) =>
    data
      ? data.getFollowing.items.map(el => {
          return {
            1: el.userId,
            2: el.userName,
            3: <Link href={`/users/${el.userId}`}>{el.userName}</Link>,
            4: new Date(el.createdAt).toLocaleDateString(),
          }
        })
      : []

  const headers: TableHeader[] = [
    {
      name: t.userId,
    },
    {
      name: t.userName,
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
      name: t.subscriptionDate,
      sort: (
        <TableSortButton<typeof USERS_SORT_BY>
          sortBy={USERS_SORT_BY.DateAdded}
          sortStore={sortStore}
        />
      ),
    },
  ]

  const getPagesCount = (data: GetFollowingQuery) => data.getFollowing.pagesCount

  return (
    <TableFactory
      defaultPageSize={8}
      emptyMessage={t.noFollowing}
      extraVariables={{ userId: query.id ? +query.id : undefined }}
      getPagesCount={getPagesCount}
      getTableData={getTableData}
      headers={headers}
      query={GET_FOLLOWING}
    />
  )
}
