import { useState } from 'react'

import { SortDirection } from '@/common/__generated-types__/graphql'
import { QueryParams } from '@/common/types/queryParams.type'
import { MaybeMasked, TypedDocumentNode, useQuery } from '@apollo/client'
import {
  Alert,
  LoaderBlock,
  Pagination,
  Table,
  TableData,
  TableHeader,
} from '@byte-creators/ui-kit'
import { useRouter } from 'next/router'

const pagesPortionOptions = ['6', '8', '10', '20', '30', '50', '100']

type Props<TRes, TVars extends Record<string, any>> = {
  classNameHeadersItem?: string
  defaultPageSize?: number
  extraVariables?: Partial<TVars>
  getPagesCount: (response: NonNullable<MaybeMasked<TRes>>) => number
  getTableData: (
    response: NonNullable<MaybeMasked<TRes>> | undefined,
    refeth: () => void
  ) => TableData[]
  headers: TableHeader[]
  query: TypedDocumentNode<TRes, TVars>
}

export const TableFactory = <TRes, TVars extends Record<string, any>>({
  classNameHeadersItem,
  defaultPageSize,
  extraVariables,
  getPagesCount,
  getTableData,
  headers,
  query,
}: Props<TRes, TVars>) => {
  const router = useRouter()
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(defaultPageSize || 10)

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
  }
  const handlePageNumberChange = (pageNumber: number) => {
    setPageNumber(pageNumber)
  }
  const handleRefetch = () => {
    refetch({ pageNumber, pageSize } as unknown as Partial<TVars>)
  }

  if (loading) {
    return <LoaderBlock />
  }

  if (error) {
    return <Alert message={error.message} type={'error'} />
  }

  if (data) {
    const tableData = getTableData(data, handleRefetch)

    return (
      <>
        <Table
          classNameHeadersItem={classNameHeadersItem}
          headers={headers}
          tableData={tableData || []}
        />
        {tableData.length >= pageSize && (
          <Pagination
            currentPage={pageNumber}
            onChangePagesPortion={handlePageSizeChange}
            onClickPaginationButton={handlePageNumberChange}
            pagesCount={getPagesCount(data) || 1}
            pagesPortion={String(pageSize) || '10'}
            pagesPortionOptions={pagesPortionOptions}
          />
        )}
      </>
    )
  }
}
