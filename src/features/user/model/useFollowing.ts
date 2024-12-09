import { useState } from 'react'

import { SortDirection } from '@/common/__generated-types__/graphql'
import { QueryParams } from '@/common/types/queryParams.type'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import { GET_FOLLOWING } from '../api/followingQuery'

export const useFollowing = () => {
  const { query } = useRouter()
  const { sort }: QueryParams = query
  const [sortBy, sortDirection] = sort ? sort.split('_') : []

  //   const {
  //     sortBy,
  //     sortDate,
  //     sortDirection,
  //     sortDirectionBtnDate,
  //     sortDirectionBtnUserName,
  //     sortName,
  //   } = useSortUsers()
  // const router = useRouter()
  //

  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  const { data, error, loading } = useQuery(GET_FOLLOWING, {
    fetchPolicy: 'no-cache',
    variables: {
      pageNumber,
      pageSize,
      sortBy,
      sortDirection: sortDirection as SortDirection,
      userId: query.id ? +query.id : 1,
    },
  })

  const handlerPageSize = (pagesPortion: string) => setPageSize(+pagesPortion)
  const handlerPageNumber = (page: number) => setPageNumber(page)

  return {
    data,
    error,
    handlerPageNumber,
    handlerPageSize,
    loading,
    pageNumber,
    pageSize,
  }
}
