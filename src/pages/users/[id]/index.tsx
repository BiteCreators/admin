import React from 'react'

import { UserTabs } from '@/features/user'
import { UserHeader } from '@/features/user/ui/user-header/UserHeader'

export default function User() {
  return (
    <>
      <UserHeader />
      <UserTabs />
    </>
  )
}
