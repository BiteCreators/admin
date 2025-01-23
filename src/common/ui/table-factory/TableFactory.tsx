import { useState } from 'react'

import { SortDirection } from '@/common/__generated-types__/graphql'
import { QueryParams } from '@/common/types/queryParams.type'
import { MaybeMasked, TypedDocumentNode, useQuery } from '@apollo/client'
import { Alert, Pagination, Table, TableData, TableHeader, Typography } from '@byte-creators/ui-kit'
import { useScopedTranslation } from '@byte-creators/utils'
import { useRouter } from 'next/router'

const pagesPortionOptions = ['6', '8', '10', '20', '30', '50', '100']

type Props<TRes, TVars extends Record<string, any>> = {
  classNameHeadersItem?: string
  defaultPageSize?: number
  emptyMessage?: string
  extraVariables?: Partial<TVars>
  getPagesCount: (response: NonNullable<MaybeMasked<TRes>>, currentPageSize: number) => number
  getTableData: (
    response: NonNullable<MaybeMasked<TRes>> | undefined,
    refetch: () => void
  ) => TableData[]
  headers: TableHeader[]
  query: TypedDocumentNode<TRes, TVars>
}

export const TableFactory = <TRes, TVars extends Record<string, any>>({
  classNameHeadersItem,
  defaultPageSize,
  emptyMessage,
  extraVariables,
  getPagesCount,
  getTableData,
  headers,
  query,
}: Props<TRes, TVars>) => {
  const router = useRouter()
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(defaultPageSize || 10)
  const {
    errors: { noItemsFound },
  } = useScopedTranslation('AdminUserProfile')

  const { direction, search, sortBy }: QueryParams = router.query

  const { data, error, loading, refetch } = useQuery(query, {
    fetchPolicy: 'no-cache',
    variables: {
      ...extraVariables,
      pageNumber,
      pageSize,
      searchTerm: search,
      sortBy,
      sortDirection: direction as SortDirection,
    } as unknown as TVars,
  })

  const handlePageSizeChange = (pageSize: string) => {
    setPageSize(+pageSize)
    setPageNumber(1)
  }
  const handlePageNumberChange = (pageNumber: number) => {
    setPageNumber(pageNumber)
  }
  const handleRefetch = () => {
    refetch({ pageNumber, pageSize } as unknown as Partial<TVars>)
  }

  if (error) {
    return <Alert message={error.message} type={'error'} />
  }

  if (data || loading) {
    const tableData = data ? getTableData(data, handleRefetch) : []
    const pagesCount = data ? getPagesCount(data, pageSize) : 1

    return (
      <>
        <Table
          classNameHeadersItem={classNameHeadersItem}
          headers={headers}
          loading={loading}
          tableData={loading ? getTableData(undefined, handleRefetch) : tableData}
        />
        {pagesCount > 1 && !loading && (
          <Pagination
            currentPage={pageNumber}
            onChangePagesPortion={handlePageSizeChange}
            onClickPaginationButton={handlePageNumberChange}
            pagesCount={pagesCount}
            pagesPortion={String(pageSize) || '10'}
            pagesPortionOptions={pagesPortionOptions}
          />
        )}
        {!loading && tableData.length === 0 && (
          <Typography>{emptyMessage ?? noItemsFound}</Typography>
        )}
      </>
    )
  }

  return null
}
