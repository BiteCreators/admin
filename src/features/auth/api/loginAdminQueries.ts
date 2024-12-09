import { gql } from '@/common/__generated-types__'
import { DocumentNode } from 'graphql/language'

export const LOGIN_ADMIN = gql(`
  mutation LOGIN_ADMIN($email: String!, $password: String!) {
  loginAdmin(email: $email, password: $password) {
    logged
  }
}
`)
