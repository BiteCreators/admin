import { GetPaymentsQuery } from '@/common/__generated-types__/graphql'
import { TableFactory } from '@/common/ui/table-factory/TableFactory'
import { SortStore } from '@/entities/sort'

import { GET_PAYMENTS } from '../api/paymentsQuery'
import { PAYMENTS_SORT_BY } from '../lib/types'
import { getTableData } from './getTableData'
import { getTableHeaders } from './getTableHeaders'

const sortStore = new SortStore(PAYMENTS_SORT_BY)

export const PaymentsTable = () => {
  const getPagesCount = (data: GetPaymentsQuery) => data.getPayments.pagesCount

  return (
    <TableFactory
      defaultPageSize={6}
      getPagesCount={getPagesCount}
      getTableData={getTableData}
      headers={getTableHeaders(sortStore)}
      query={GET_PAYMENTS}
    />
  )
}
