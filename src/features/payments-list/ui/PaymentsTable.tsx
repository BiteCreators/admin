import { GetPaymentsQuery } from '@/common/__generated-types__/graphql'
import { TableFactory } from '@/common/ui/table-factory/TableFactory'
import { SortStore, TableSortButton } from '@/entities/sort'
import { Avatar, TableHeader } from '@byte-creators/ui-kit'

import s from './paymentsTable.module.scss'

import { GET_PAYMENTS } from '../api/paymentsQuery'
import { formatPaymentMethod } from '../lib/formatPaymentMethod'
import { formatSubscriptionType } from '../lib/formatSubscriptionType'
import { PAYMENTS_SORT_BY } from '../lib/types'

const sortStore = new SortStore(PAYMENTS_SORT_BY)

export const PaymentsTable = () => {
  const getPagesCount = (data: GetPaymentsQuery) => data.getPayments.pagesCount

  const getTableData = (data?: GetPaymentsQuery) =>
    data
      ? data.getPayments.items.map(item => {
          const paymentMethod = formatPaymentMethod(item?.paymentMethod)
          const paymentType = formatSubscriptionType(item.type)

          return {
            1: (
              <div className={s.usernameCol}>
                <Avatar avatarURL={item.avatars?.[0]?.url || ''} />
                {item.userName}
              </div>
            ),
            2: new Date(item.createdAt).toLocaleDateString(),
            3: <span className={s.amountCol}>{item.amount}$</span>,
            4: <span>{paymentType}</span>,
            5: <span>{paymentMethod}</span>,
          }
        })
      : []

  const headers: TableHeader[] = [
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

  return (
    <TableFactory
      defaultPageSize={6}
      getPagesCount={getPagesCount}
      getTableData={getTableData}
      headers={headers}
      query={GET_PAYMENTS}
    />
  )
}
