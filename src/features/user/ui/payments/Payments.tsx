import { SubscriptionByPaymentModel } from '@/common/__generated-types__/graphql'
import { usePayments } from '@/features/user/model/usePayments'
import { Alert, LoaderBlock, Pagination, Table, TableData, Typography } from '@byte-creators/ui-kit'
import { useRouter } from 'next/router'

import style from './payments.module.scss'

export const Payments = () => {
  const { query } = useRouter()

  const {
    currentPage,
    data,
    dataPortion,
    error,
    handleCurrentPageChange,
    handlePaymentsPortionChange,
    loading,
    pagesCount,
  } = usePayments(Number(query.id))

  let payments = [] as TableData[]

  if (data) {
    payments = data.getPaymentsByUser.items.map((el: Partial<SubscriptionByPaymentModel>) => {
      return {
        1: new Date(el.dateOfPayment).toLocaleDateString(),
        2: new Date(el.endDate).toLocaleDateString(),
        3: `$${el.price}`,
        4: el.type,
        5: el.paymentType,
      }
    })
  }

  const headers = [
    {
      name: 'Date of Payment',
    },
    {
      name: 'End date of subscription',
    },
    {
      name: 'Amount,$',
    },
    {
      name: 'Subscription Type',
    },
    {
      name: 'Payment Type',
    },
  ]

  if (loading) {
    return <LoaderBlock />
  }

  return (
    <div className={'relative mb-12 sm:flex sm:flex-col'}>
      {data?.getPaymentsByUser.items.length === 0 ? (
        <Typography> User does not have any subscriptions yet</Typography>
      ) : (
        <div>
          <Table
            classNameHeadersItem={style.tableHeaders}
            classNameTableCell={style.tableCells}
            headers={headers}
            tableData={payments}
          />
          <Pagination
            className={style.pagination}
            currentPage={currentPage}
            onChangePagesPortion={handlePaymentsPortionChange}
            onClickPaginationButton={handleCurrentPageChange}
            pagesCount={pagesCount}
            pagesPortion={dataPortion.toString()}
          />
        </div>
      )}
      {error && <Alert message={error.message} type={'error'} />}
    </div>
  )
}
