import { gql } from '@/common/__generated-types__'

export const GET_USER = gql(`
query GetUser($userId: Int!) {
    getUser(userId: $userId) {
      id
      userName
      email
      createdAt
      profile {
        firstName
        lastName
        avatars {
          url
        }
      }
      userBan {
        createdAt
        reason
      }
    }
  }`)
