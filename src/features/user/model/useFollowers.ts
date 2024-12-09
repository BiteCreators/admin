import { useState } from 'react'

import { SortDirection } from '@/common/__generated-types__/graphql'
import { QueryParams } from '@/common/types/queryParams.type'
import { GET_FOLLOWERS } from '@/features/user/api/followersQueries'
import { useQuery } from '@apollo/client'
import { useScopedTranslation } from '@packages/shared/hooks'
import { useRouter } from 'next/router'

export const useFollowers = () => {
  const { query } = useRouter()
  const { sort }: QueryParams = query
  const [sortBy, sortDirection] = sort ? sort.split('_') : []
  const t = useScopedTranslation('FollowersAdmin')

  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const { data, error, loading } = useQuery(GET_FOLLOWERS, {
    fetchPolicy: 'no-cache',
    variables: {
      pageNumber,
      pageSize,
      sortBy,
      sortDirection: sortDirection as SortDirection,
      userId: query.id ? +query.id : 737,
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
    t,
  }
}
