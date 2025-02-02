import { gql, useSubscription } from '@apollo/client'

export const POST_SUBSCRIPTION = gql(`
  subscription POST_SUBSCRIPTION {
   postAdded {
     id
    } 
  }
`)
