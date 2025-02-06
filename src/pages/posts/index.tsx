import React from 'react'

import { PostsList } from '@/features/posts/ui/posts-list/PostsList'
import { Search } from '@/features/search'

import s from './posts.module.scss'

export default function Posts() {
  return (
    <div className={s.postsListContainer}>
      <div className={s.postsListWrap}>
        <div className={s.searchSection}>
          <Search fullWidth paramName={'search'} />
        </div>
        <PostsList />
      </div>
    </div>
  )
}
