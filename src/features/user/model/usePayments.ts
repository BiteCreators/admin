import { useState } from 'react'

import { GET_PAYMENTS_BY_USER } from '@/features/user/api/paymentsQuery'
import { useQuery } from '@apollo/client'

export const usePayments = (userId: number) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [dataPortion, setDataPortion] = useState(10)
  const { data, error, loading, refetch } = useQuery(GET_PAYMENTS_BY_USER, {
    variables: { pageNumber: currentPage, pageSize: dataPortion, userId },
  })
  const handleCurrentPageChange = (page: number) => {
    setCurrentPage(page)
    refetch({ pageNumber: page })
  }
  const handlePaymentsPortionChange = (dataPortion: string) => {
    setDataPortion(Number(dataPortion))
    if (data?.getPaymentsByUser.totalCount) {
      const lastPage = Math.ceil(data?.getPaymentsByUser.totalCount / Number(dataPortion))

      if (currentPage > lastPage) {
        setCurrentPage(lastPage)
        refetch({ pageNumber: lastPage, pageSize: Number(dataPortion) })
      } else {
        refetch({ pageNumber: currentPage, pageSize: Number(dataPortion) })
      }
    }
  }
  const pagesCount = data?.getPaymentsByUser.totalCount
    ? Math.ceil(data?.getPaymentsByUser.totalCount / dataPortion)
    : 1

  return {
    currentPage,
    data,
    dataPortion,
    error,
    handleCurrentPageChange,
    handlePaymentsPortionChange,
    loading,
    pagesCount,
  }
}
// // для тестир-ия:
// function getArray(start: number, end: number, total: number) {
//   const payments = Array.from({ length: total }, (_, ind) => ({
//     dateOfPayment: '2024-11-05T18:42:55.367Z',
//     endDate: '2024-11-05T18:42:55.367Z',
//     paymentType: `${ind % 2 === 0 ? 'Paypal' : 'Stripe'}`,
//     price: ind,
//     type: `${ind % 2 === 0 ? '1 day' : '1 month'}`,
//   }))

//   return payments.slice(start, end)
// }
