import React from 'react'
import Skeleton from 'react-loading-skeleton'

import { GetFollowingQuery } from '@/common/__generated-types__/graphql'
import { TableFactory } from '@/common/ui/table-factory/TableFactory'
import { USERS_SORT_BY, useTableSortStore } from '@/entities/sort'
import { TableHeader } from '@byte-creators/ui-kit'
import { useScopedTranslation } from '@byte-creators/utils'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { GET_FOLLOWING } from '../../api/followingQuery'

export const Following = () => {
  const { query } = useRouter()
  const t = useScopedTranslation('FollowersAdmin')
  const [_, { CreatedAtSortButton, UserNameSortButton }] = useTableSortStore({
    id: 'FollowingTable',
    options: USERS_SORT_BY,
  })

  const getTableData = (data: GetFollowingQuery | undefined) => {
    if (!data) {
      return Array.from({ length: 8 }).map((_, index) => ({
        1: <Skeleton key={`skeleton-id-${index}`} width={60} />,
        2: <Skeleton key={`skeleton-username-${index}`} width={120} />,
        3: <Skeleton key={`skeleton-link-${index}`} width={100} />,
        4: <Skeleton key={`skeleton-date-${index}`} width={140} />,
      }))
    }

    return data.getFollowing.items.map(el => ({
      1: el.userId,
      2: el.userName,
      3: <Link href={`/users/${el.userId}`}>{el.userName}</Link>,
      4: new Date(el.createdAt).toLocaleDateString(),
    }))
  }

  const headers: TableHeader[] = [
    {
      name: t.userId,
    },
    {
      name: t.userName,
      sort: <UserNameSortButton />,
    },
    {
      name: t.profileLink,
    },
    {
      name: t.subscriptionDate,
      sort: <CreatedAtSortButton />,
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
