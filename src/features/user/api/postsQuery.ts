import { gql } from '@/common/__generated-types__'

export const GET_POSTS_BY_USER = gql(`
    query GetPostsByUser($userId: Int!) {
        getPostsByUser(userId: $userId) {
        items{
        height
        width
        url
        }
      }
    }`)
