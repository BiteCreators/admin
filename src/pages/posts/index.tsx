import React from 'react'

import { PostsList } from '@/features/posts-list'
import { SearchComponent } from '@byte-creators/ui-kit/components'

import s from './posts.module.scss'

export default function Posts() {
  return (
    <div className={s.postsListContainer}>
      <div className={s.searchSection}>
        <SearchComponent fullWidth paramName={'search'} />
      </div>
      <PostsList />
    </div>
  )
}
