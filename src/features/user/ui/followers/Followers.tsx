import { GetFollowersQuery } from '@/common/__generated-types__/graphql'
import { TableFactory } from '@/common/ui/table-factory/TableFactory'
import { USERS_SORT_BY, useTableSortStore } from '@/entities/sort'
import { TableHeader } from '@byte-creators/ui-kit'
import { useScopedTranslation } from '@byte-creators/utils'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { GET_FOLLOWERS } from '../../api/followersQueries'

export const Followers = () => {
  const { query } = useRouter()
  const t = useScopedTranslation('FollowersAdmin')

  const [_, { CreatedAtSortButton, UserNameSortButton }] = useTableSortStore({
    id: 'FollowersTable',
    options: USERS_SORT_BY,
  })

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
      sort: <UserNameSortButton />,
    },
    { name: t.profileLink },
    {
      name: t.subscriptionDate,
      sort: <CreatedAtSortButton />,
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
