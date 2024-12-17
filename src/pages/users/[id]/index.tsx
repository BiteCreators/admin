import React from 'react'

import { UserTabs } from '@/features/user'
import { UserHeader } from '@/features/user/ui/user-header/UserHeader'

export default function User() {
  return (
    <div style={{ margin: '0 20px 30px 30px' }}>
      <UserHeader />
      <UserTabs />
    </div>
  )
}
