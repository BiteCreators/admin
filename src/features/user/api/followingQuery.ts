import { gql } from '@/common/__generated-types__'

export const GET_FOLLOWING = gql(`
  query GetFollowing(
    $pageSize: Int = 10
    $pageNumber: Int = 1
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
    $userId: Int!
  ) {
    getFollowing(
      pageSize: $pageSize
      pageNumber: $pageNumber
      sortBy: $sortBy
      sortDirection: $sortDirection
      userId: $userId,
    ) {
			pagesCount
    	totalCount
    	pageSize
    	page
    	items{
      	id
      	userId
      	userName
      	createdAt
      }
    }
  }
`)
