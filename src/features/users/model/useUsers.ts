import { useState } from 'react'

import { SortDirection, UserBlockStatus } from '@/common/__generated-types__/graphql'
import { QueryParams } from '@/common/types/queryParams.type'
import { SortStore, USERS_SORT_BY } from '@/entities/sort'
import { useQuery } from '@apollo/client'
import { useScopedTranslation } from '@byte-creators/utils'
import { useRouter } from 'next/router'

import { GET_USERS } from '../api/usersQuery'

const sortStore = new SortStore(USERS_SORT_BY)

export const useUsers = () => {
  const router = useRouter()
  const t = useScopedTranslation('FollowersAdmin')

  const {
    block_status_filter: blockStatusFilter,
    direction,
    sortBy,
    user_name: userNameSearch,
  }: QueryParams = router.query

  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  const {
    data: usersListData,
    error: usersListError,
    loading: usersListLoading,
    refetch,
  } = useQuery(GET_USERS, {
    fetchPolicy: 'no-cache',
    variables: {
      pageNumber,
      pageSize,
      searchTerm: userNameSearch,
      sortBy,
      sortDirection: direction as SortDirection,
      statusFilter: blockStatusFilter ?? UserBlockStatus.All,
    },
  })
  const refetchUsers = () => {
    refetch({ pageNumber, pageSize })
  }

  const handlerPageNumber = (pageNumber: number) => {
    setPageNumber(pageNumber)
  }
  const handlerPageSize = (pageSize: string) => {
    setPageSize(+pageSize)
  }

  return {
    handlerPageNumber,
    handlerPageSize,
    refetchUsers,
    sortStore,
    t,
    usersListData,
    usersListError,
    usersListLoading,
  }
}
