import { GetPaymentsQuery } from '@/common/__generated-types__/graphql'
import { TableFactory } from '@/common/ui/table-factory/TableFactory'
import { useTableSortStore } from '@/entities/sort'
import { Avatar, TableHeader } from '@byte-creators/ui-kit'

import s from './paymentsTable.module.scss'

import { GET_PAYMENTS } from '../api/paymentsQuery'
import { PAYMENTS_SORT_BY } from '../lib/consts'
import { formatPaymentMethod } from '../lib/formatPaymentMethod'
import { formatSubscriptionType } from '../lib/formatSubscriptionType'

export const PaymentsTable = () => {
  const getPagesCount = (data: GetPaymentsQuery) => data.getPayments.pagesCount
  const [
    _,
    { AmountSortButton, CreatedAtSortButton, PaymentMethodSortButton, UserNameSortButton },
  ] = useTableSortStore({
    id: 'PaymentsTable',
    options: PAYMENTS_SORT_BY,
  })

  const getTableData = (data?: GetPaymentsQuery) => {
    if (!data) {
      return []
    }

    return data.getPayments.items.map(item => {
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
  }

  const headers: TableHeader[] = [
    {
      name: 'Username',
      sort: <UserNameSortButton />,
    },
    {
      name: 'Date added',
      sort: <CreatedAtSortButton />,
    },
    {
      name: 'Amount,$',
      sort: <AmountSortButton />,
    },
    {
      name: 'Subscription',
    },
    {
      name: 'Payment method',
      sort: <PaymentMethodSortButton />,
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
