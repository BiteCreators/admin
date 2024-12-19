import React from 'react'

import { client } from '@/common/api/client'
import { ApolloProvider } from '@apollo/client'

import { AuthProvider } from './AuthProvider'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>{children}</AuthProvider>
    </ApolloProvider>
  )
}
