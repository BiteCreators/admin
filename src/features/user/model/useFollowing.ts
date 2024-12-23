import { useState } from 'react'

import { SortDirection } from '@/common/__generated-types__/graphql'
import { QueryParams } from '@/common/types/queryParams.type'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import { GET_FOLLOWING } from '../api/followingQuery'
import { SortStore, USERS_SORT_BY } from '@/entities/sort'

const sortStore = new SortStore(USERS_SORT_BY)

export const useFollowing = () => {
  const { query } = useRouter()
  const { sortBy, direction }: QueryParams = query

  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  const { data, error, loading } = useQuery(GET_FOLLOWING, {
    fetchPolicy: 'no-cache',
    variables: {
      pageNumber,
      pageSize,
      sortBy,
      sortDirection: direction as SortDirection,
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
    sortStore
  }
}
