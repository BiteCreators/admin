import { gql } from '@/common/__generated-types__'

export const GET_USERS = gql(`
  query GetUsers(
    $pageSize: Int = 10
    $pageNumber: Int = 1
    $sortBy: String
    $searchTerm: String
    $sortDirection: SortDirection
    $statusFilter: UserBlockStatus
  ){
    getUsers(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      searchTerm:$searchTerm
      statusFilter:$statusFilter
  ) {
    pagination{
      totalCount
      pageSize
      pagesCount
      page
    }
    users{
      userName
      userBan{
        reason
      }
      createdAt
      id
      profile{
        firstName
        lastName}
    }
}}`)
