import type { AppProps } from 'next/app'

import React from 'react'

import { DefaultLayout } from '@/application/DefautlLayout'
import { AuthProvider } from '@/application/providers/AuthProvider'
import { client } from '@/common/api/client'
import { ApolloProvider } from '@apollo/client'
import { NextPage } from 'next'

import '@/styles/globals.css'

//TODO: fix импорт after fix plugin (tapuru)

// import '@byte-creators/ui-kit/styles'

export type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: React.ReactElement) => React.ReactNode
} & NextPage<P, IP>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? DefaultLayout

  return (
    <ApolloProvider client={client}>
      <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
    </ApolloProvider>
  )
}