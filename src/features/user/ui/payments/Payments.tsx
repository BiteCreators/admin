import {
  GetPaymentsByUserQuery,
  SubscriptionByPaymentModel,
} from '@/common/__generated-types__/graphql'
import { TableFactory } from '@/common/ui/table-factory/TableFactory'
import { TableHeader } from '@byte-creators/ui-kit'
import { useScopedTranslation } from '@byte-creators/utils'
import { useRouter } from 'next/router'

import { GET_PAYMENTS_BY_USER } from '../../api/paymentsQuery'

export const Payments = () => {
  const { query } = useRouter()

  const t = useScopedTranslation('AdminPayments')

  const getTableData = (data: GetPaymentsByUserQuery | undefined) =>
    data
      ? data.getPaymentsByUser.items.map((el: Partial<SubscriptionByPaymentModel>) => {
          return {
            1: new Date(el.dateOfPayment).toLocaleDateString(),
            2: new Date(el.endDate).toLocaleDateString(),
            3: `$${el.price}`,
            4: el.type,
            5: el.paymentType,
          }
        })
      : []

  const headers: TableHeader[] = [
    {
      name: t.paymentDate,
    },
    {
      name: t.endDateOfSubscription,
    },
    {
      name: t.amount,
    },
    {
      name: t.subscriptionType,
    },
    {
      name: t.paymentType,
    },
  ]

  const getPagesCount = (data: GetPaymentsByUserQuery, currentPageSize: number) =>
    data.getPaymentsByUser.totalCount
      ? Math.ceil(data?.getPaymentsByUser.totalCount / currentPageSize)
      : 1

  return (
    <TableFactory
      emptyMessage={t.noSubscription}
      extraVariables={{ userId: query.id ? +query.id : undefined }}
      getPagesCount={getPagesCount}
      getTableData={getTableData}
      headers={headers}
      query={GET_PAYMENTS_BY_USER}
    />
  )
}
