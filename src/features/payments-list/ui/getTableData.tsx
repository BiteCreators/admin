import { GetPaymentsQuery } from '@/common/__generated-types__/graphql'
import { Avatar } from '@byte-creators/ui-kit'
import { formatPaymentMethod } from '@byte-creators/utils'

import s from './paymentsTable.module.scss'

import { formatSubscriptionType } from '../lib/formatSubscriptionType'

export const getTableData = (data?: GetPaymentsQuery['getPayments']) => {
  return data?.items.map(item => {
    //TODO: remove ts ignore
    //@ts-ignore
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
