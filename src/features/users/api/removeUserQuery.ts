import { gql } from '@apollo/client'

export const REMOVE_USER = gql(`
  mutation REMOVE_USER($userId: Int!) {
    removeUser(userId: $userId)
	}
`)
