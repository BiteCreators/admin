import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink, split } from '@apollo/client'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.NEXT_PUBLIC_GRAPHQL_WS_API_URL as string,
  })
)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)

    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  wsLink,
  httpLink
)

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = document.cookie.split('adminAccessToken=')[1]

  if (accessToken) {
    const decodedAccessToken = decodeURIComponent(accessToken).split(' ')[1]

    if (decodedAccessToken) {
      operation.setContext({
        headers: {
          Authorization: `Basic ${decodedAccessToken}`,
        },
      })
    }
  }

  return forward(operation)
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(splitLink),
})
