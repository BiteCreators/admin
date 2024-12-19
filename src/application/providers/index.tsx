import React from 'react'
import { AuthProvider } from './AuthProvider'
import { ApolloProvider } from '@apollo/client'
import { client } from '@/common/api/client'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>{children}</AuthProvider>
    </ApolloProvider>
  )
}
