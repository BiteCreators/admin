import React from 'react'

import { PaymentsTable } from '@/features/payments-list'
import { SearchComponent } from '@byte-creators/ui-kit/components'

import s from './payments.module.scss'

export default function Payments() {
  return (
    <div className={s.root}>
      <div className={s.searchSection}>
        <SearchComponent fullWidth paramName={'search'} />
      </div>
      <PaymentsTable />
    </div>
  )
}
