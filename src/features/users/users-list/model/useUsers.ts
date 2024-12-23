import { useState } from 'react'

import { SortDirection, UserBlockStatus } from '@/common/__generated-types__/graphql'
import { QueryParams } from '@/common/types/queryParams.type'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import { GET_USERS } from '../api/usersQuery'
import { SortStore, USERS_SORT_BY } from '@/entities/sort'

const sortStore = new SortStore(USERS_SORT_BY)

export const useUsers = () => {

  const router = useRouter()

  const {
    block_status_filter: blockStatusFilter,
    sortBy,
    direction,
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
    usersListData,
    usersListError,
    usersListLoading,
    sortStore,
  }
}
