import type { AppProps } from 'next/app'

import React from 'react'
import 'react-loading-skeleton/dist/skeleton.css'

import { DefaultLayout } from '@/application/layouts/DefaultLayout'
import { Providers } from '@/application/providers'
import { NextPage } from 'next'

import '@/styles/globals.css'
import '@byte-creators/ui-kit/styles'
import { SkeletonTheme } from 'react-loading-skeleton'

export type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: React.ReactElement) => React.ReactNode
} & NextPage<P, IP>

type AppPropsWithLayout = {
  Component: NextPageWithLayout
} & AppProps

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? DefaultLayout

  return (
    <Providers>
      {getLayout(
        <SkeletonTheme baseColor={'#202020'} highlightColor={'#444'}>
          <Component {...pageProps} />
        </SkeletonTheme>
      )}
    </Providers>
  )
}
