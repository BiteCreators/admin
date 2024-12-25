import { PaymetnsTable } from '@/features/payments-list'
import React from 'react'

import s from "./payments.module.scss"
import { Search } from '@/features/search'

export default function Payments() {
  return (
    <div className={s.root}>
      <div className={s.searchSection}>
        <Search paramName='search' fullWidth />
      </div>
      <PaymetnsTable />
    </div>
  )
}
