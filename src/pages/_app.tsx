import type { AppProps } from 'next/app'

import React from 'react'

import { NextPage } from 'next'

import '@/styles/globals.css'
import { DefaultLayout } from '@/application/layouts/DefaultLayout'
import { Providers } from '@/application/providers'

//TODO: fix import

// import '@byte-creators/ui-kit/styles'

export type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: React.ReactElement) => React.ReactNode
} & NextPage<P, IP>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? DefaultLayout

  return <Providers>{getLayout(<Component {...pageProps} />)}</Providers>
}
