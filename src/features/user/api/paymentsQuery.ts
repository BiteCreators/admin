import { gql } from '@/common/__generated-types__'

export const GET_PAYMENTS_BY_USER = gql(`
  query GetPaymentsByUser($userId: Int!, $pageNumber: Int, $pageSize: Int) {
    getPaymentsByUser(userId: $userId,pageSize: $pageSize, pageNumber: $pageNumber) {
      totalCount  
      items{
      dateOfPayment
      endDate
      price
      type
      paymentType
      }
    }
  }`)
