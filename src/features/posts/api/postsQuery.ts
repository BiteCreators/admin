import { gql } from '@/common/__generated-types__'

export const GET_POSTS = gql(`
   query getPosts(
    $endCursorPostId: Int = 0
    $searchTerm: String
    $pageSize: Int = 16
    $sortBy: String = "createdAt"
    $sortDirection: SortDirection = desc
  ) {
    getPosts(
      endCursorPostId: $endCursorPostId
      searchTerm: $searchTerm
      pageSize: $pageSize
      sortBy: $sortBy
      sortDirection: $sortDirection
  ){
      pagesCount
      pageSize
      totalCount
      items{
        images{
          url
        }
        id
        ownerId
        description
        createdAt
        updatedAt
        postOwner{
          id
          userName
          avatars{
            url
          }
        }
        userBan{
          reason
          createdAt
        }
      }
    }
  }
`)
