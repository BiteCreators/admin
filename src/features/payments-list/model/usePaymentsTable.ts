import { useState } from 'react'

import { SortDirection } from '@/common/__generated-types__/graphql'
import { SortStore } from '@/entities/sort'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import { GET_PAYMENTS } from '../api/paymentsQuery'
import { PAYMENTS_SORT_BY } from '../lib/types'

type PaymentsQueryParams = {
  direction: SortDirection
  search: string
  sortBy: PAYMENTS_SORT_BY
}

const sortStore = new SortStore(PAYMENTS_SORT_BY)

export const usePaymentsTable = () => {
  const { query } = useRouter()

  const { direction, search, sortBy }: PaymentsQueryParams = query as PaymentsQueryParams

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(6)

  const { data, error, loading } = useQuery(GET_PAYMENTS, {
    variables: {
      pageNumber,
      pageSize,
      searchTerm: search,
      sortBy,
      sortDirection: direction,
    },
  })

  const handlePageChange = (page: number) => {
    setPageNumber(page)
  }

  const handlePageSizeChange = (pageSize: string) => {
    setPageSize(+pageSize)
  }

  return {
    data: data?.getPayments,
    error,
    handlePageChange,
    handlePageSizeChange,
    loading,
    sortStore,
  }
}
