import React from 'react'

import { GetFollowersQuery } from '@/common/__generated-types__/graphql'
import { TableFactory } from '@/common/ui/table-factory/TableFactory'
import { SortStore, TableSortButton, USERS_SORT_BY } from '@/entities/sort'
import { TableHeader } from '@byte-creators/ui-kit'
import { useScopedTranslation } from '@byte-creators/utils'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { GET_FOLLOWERS } from '../../api/followersQueries'

const sortStore = new SortStore(USERS_SORT_BY)

export const Followers = () => {
  const { query } = useRouter()
  const t = useScopedTranslation('FollowersAdmin')

  const getTableData = (data: GetFollowersQuery | undefined) => {
    if (!data) {
      return []
    }

    return data.getFollowers.items.map(follower => ({
      1: follower.userId,
      2: follower.userName,
      3: <Link href={`/users/${follower.userId}`}>{follower.userName}</Link>,
      4: new Date(follower.createdAt).toLocaleDateString(),
    }))
  }

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
    { name: t.profileLink },
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

  const getPagesCount = (data: GetFollowersQuery) => data.getFollowers.pagesCount

  return (
    <TableFactory
      emptyMessage={t.noFollowers}
      extraVariables={{ userId: query.id ? +query.id : undefined }}
      getPagesCount={getPagesCount}
      getTableData={getTableData}
      headers={headers}
      query={GET_FOLLOWERS}
    />
  )
}
