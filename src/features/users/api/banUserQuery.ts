import { gql } from '@apollo/client'

export const BAN_USER = gql(`
  mutation BAN_USER($banReason: String!, $userId: Int!) {
    banUser(banReason: $banReason, userId: $userId)
	}
`)
