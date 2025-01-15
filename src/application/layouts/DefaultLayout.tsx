import React from 'react'

import { Sidebar } from '@/features/navigation'
import { Header } from '@/widgets/header'
import { PageLayout } from '@byte-creators/ui-kit'

export const DefaultLayout = (page: React.ReactElement) => {
  return (
    <PageLayout header={<Header />} sidebar={<Sidebar />}>
      {page}
    </PageLayout>
  )
}
