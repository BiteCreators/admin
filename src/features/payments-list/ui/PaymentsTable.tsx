import { Alert, LoaderBlock, Pagination, Table } from '@byte-creators/ui-kit'

import s from './paymentsTable.module.scss'

import { usePaymentsTable } from '../model/usePaymentsTable'
import { getTableData } from './getTableData'
import { getTableHeaders } from './getTableHeaders'

export const PaymentsTable = () => {
  const { data, error, handlePageChange, handlePageSizeChange, loading, sortStore } =
    usePaymentsTable()

  const paymentsData = getTableData(data)
  const headers = getTableHeaders(sortStore)

  if (loading) {
    return <LoaderBlock />
  }

  return (
    <div className={s.table}>
      {error && <Alert message={error.message} type={'error'} />}
      <Table
        classNameHeadersItem={s.table__headers}
        headers={headers}
        tableData={paymentsData || []}
      />
      <Pagination
        currentPage={data?.page || 1}
        onChangePagesPortion={handlePageSizeChange}
        onClickPaginationButton={handlePageChange}
        pagesCount={data?.pagesCount || 1}
        pagesPortion={String(data?.pageSize || 10)}
      />
    </div>
  )
}
