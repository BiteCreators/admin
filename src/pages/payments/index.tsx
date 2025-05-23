import React from 'react'

import { PaymentsTable } from '@/features/payments-list'
import { Search } from '@/features/search'

import s from './payments.module.scss'

export default function Payments() {
  return (
    <div className={s.root}>
      <div className={s.searchSection}>
        <Search fullWidth paramName={'search'} />
      </div>
      <PaymentsTable />
    </div>
  )
}
