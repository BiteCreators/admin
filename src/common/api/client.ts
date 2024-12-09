import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from '@apollo/client'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
})

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
  link: authLink.concat(httpLink),
})
