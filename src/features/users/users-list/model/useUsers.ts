import { useState } from 'react'

import { SortDirection, UserBlockStatus } from '@/common/__generated-types__/graphql'
import { QueryParams } from '@/common/types/queryParams.type'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import { GET_USERS } from '../api/usersQuery'

export const useUsers = () => {
  //   const {
  //     sortBy,
  //     sortDate,
  //     sortDirection,
  //     sortDirectionBtnDate,
  //     sortDirectionBtnUserName,
  //     sortName,
  //   } = useSortUsers()
  const router = useRouter()
  const {
    block_status_filter: blockStatusFilter,
    sort,
    user_name: userNameSearch,
  }: QueryParams = router.query

  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [sortBy, sortDirection] = sort ? sort.split('_') : []

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
      sortDirection: sortDirection as SortDirection,
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
  }
}
