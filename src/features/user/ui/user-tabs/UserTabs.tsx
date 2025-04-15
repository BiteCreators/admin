import { useState } from 'react'

import { TabsBase } from '@byte-creators/ui-kit'
import { useScopedTranslation } from '@byte-creators/utils'

import { Followers } from '../followers/Followers'
import { Following } from '../following/Following'
import { Payments } from '../payments/Payments'
import { UploadedPosts } from '../uploaded-photos/UploadedPosts'

type TabValues = 'followers' | 'following' | 'payments' | 'uploaded-photos'

export const UserTabs = () => {
  const [selectedTab, setSelectedTab] = useState<TabValues>('uploaded-photos')
  const t = useScopedTranslation('AdminUserProfile')

  return (
    <TabsBase<TabValues>
      ariaLabel={'profile management tabs'}
      onClick={value => setSelectedTab(value)}
      tabsData={[
        {
          content: <UploadedPosts />,
          label: t.uploadedPhotos,
          value: 'uploaded-photos',
        },
        {
          content: <Payments />,
          label: t.payments,
          value: 'payments',
        },
        {
          content: <Followers />,
          label: t.followers,
          value: 'followers',
        },
        {
          content: <Following />,
          label: t.following,
          value: 'following',
        },
      ]}
      value={selectedTab}
    />
  )
}
