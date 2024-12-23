import { gql } from '@apollo/client'

export const UNBAN_USER = gql(`
  mutation UNBAN_USER($userId: Int!) {
    unbanUser(userId: $userId)
	}
`)
