import { SortStore, TableSortButton } from '@/entities/sort'
import { TableHeader } from '@byte-creators/ui-kit'

import { PAYMENTS_SORT_BY } from '../lib/types'

export const getTableHeaders = (sortStore: SortStore<typeof PAYMENTS_SORT_BY>): TableHeader[] => {
  return [
    {
      name: 'Username',
      sort: <TableSortButton sortBy={PAYMENTS_SORT_BY.USER_NAME} sortStore={sortStore} />,
    },
    {
      name: 'Date added',
      sort: <TableSortButton sortBy={PAYMENTS_SORT_BY.CREATED_AT} sortStore={sortStore} />,
    },
    {
      name: 'Amount,$',
      sort: <TableSortButton sortBy={PAYMENTS_SORT_BY.AMOUNT} sortStore={sortStore} />,
    },
    {
      name: 'Subscription',
    },
    {
      name: 'Payment method',
      sort: <TableSortButton sortBy={PAYMENTS_SORT_BY.PAYMENT_METHOD} sortStore={sortStore} />,
    },
  ]
}
