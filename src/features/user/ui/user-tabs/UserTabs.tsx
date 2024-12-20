import { useState } from 'react'

import { TabsBase } from '@byte-creators/ui-kit'

import { Followers } from '../followers/Followers'
import { Following } from '../following/Following'
import { Payments } from '../payments/Payments'
import { UploadedPosts } from '../uploaded-photos/UploadedPosts'

type TabValues = 'followers' | 'following' | 'payments' | 'uploaded-photos'

export const UserTabs = () => {
  const [selectedTab, setSelectedTab] = useState<TabValues>('uploaded-photos')

  return (
    <TabsBase<TabValues>
      ariaLabel={'profile management tabs'}
      onClick={value => setSelectedTab(value)}
      tabsData={[
        {
          content: <UploadedPosts />,
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
