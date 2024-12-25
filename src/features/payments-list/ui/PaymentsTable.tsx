import { Alert, LoaderBlock, Pagination, Table } from "@byte-creators/ui-kit"
import { usePaymentsTable } from "../model/usePaymentsTable"
import s from "./paymentsTable.module.scss"
import { getTableHeaders } from "./getTableHeaders"
import { getTableData } from "./getTableData"

export const PaymetnsTable = () => {

  const { data, handlePageChange, sortStore, handlePageSizeChange, loading, error } = usePaymentsTable()

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
