import { useState } from 'react'

import { TabsBase } from '@packages/shared/ui'

import { Followers } from '../followers/Followers'
import { Following } from '../following/Following'
import { Payments } from '../payments/Payments'
import { UploadedPhotos } from '../uploaded-photos/UploadedPhotos'

type TabValues = 'followers' | 'following' | 'payments' | 'uploaded-photos'

export const UserTabs = () => {
  const [selectedTab, setSelectedTab] = useState<TabValues>('uploaded-photos')

  return (
    <TabsBase<TabValues>
      ariaLabel={'profile management tabs'}
      onClick={value => setSelectedTab(value)}
      tabsData={[
        {
          content: <UploadedPhotos />,
          label: 'Uploaded photos',
          value: 'uploaded-photos',
        },
        {
          content: <Payments />,
          label: 'Payments',
          value: 'payments',
        },
        {
          content: <Followers />,
          label: 'Followers',
          value: 'followers',
        },
        {
          content: <Following />,
          label: 'Following',
          value: 'following',
        },
      ]}
      value={selectedTab}
    />
  )
}
