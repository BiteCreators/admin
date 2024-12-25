import { useQuery } from "@apollo/client"
import { GET_PAYMENTS } from "../api/paymentsQuery"
import { SortStore } from "@/entities/sort"
import { PAYMENTS_SORT_BY } from "../lib/types"
import { useState } from "react"
import { useRouter } from "next/router"
import { SortDirection } from "@/common/__generated-types__/graphql"

type PaymentsQueryParams = {
  direction: SortDirection
  sortBy: PAYMENTS_SORT_BY
  search: string
}

const sortStore = new SortStore(PAYMENTS_SORT_BY)

export const usePaymentsTable = () => {

  const { query } = useRouter()

  const { sortBy, direction, search }: PaymentsQueryParams = query as PaymentsQueryParams

  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { data, error, loading } = useQuery(GET_PAYMENTS, {
    variables: {
      pageNumber,
      pageSize,
      searchTerm: search,
      sortBy,
      sortDirection: direction
    }
  })

  const handlePageChange = (page: number) => {
    setPageNumber(page)
  }

  const handlePageSizeChange = (pageSize: string) => {
    setPageSize(+pageSize)
  }

  return {
    data: data?.getPayments,
    sortStore,
    handlePageChange,
    handlePageSizeChange,
    error,
    loading
  }
} 
