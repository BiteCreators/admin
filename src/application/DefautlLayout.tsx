import React from 'react'

import { Header } from '@/widgets/header'
import { Sidebar } from '@/widgets/sidebar/ui/Sidebar'
import { PageLayout } from '@byte-creators/ui-kit'

export const DefaultLayout = (page: React.ReactElement) => {
  return (
    <PageLayout header={<Header />} sidebar={<Sidebar />}>
      {page}
    </PageLayout>
  )
}
