import { gql } from '@/common/__generated-types__'

export const GET_PAYMENTS = gql(`
  query GetPayments(
    $pageSize: Int = 10
    $pageNumber: Int = 1
    $sortBy: String
    $searchTerm: String
    $sortDirection: SortDirection
  ){
    getPayments(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      searchTerm:$searchTerm
  ) {
    totalCount
    pageSize
    pagesCount
    page
    items{
      id
      createdAt 
      paymentMethod
      amount
      userName
      type
      avatars{
        url
      }
    }
  }
}`)
