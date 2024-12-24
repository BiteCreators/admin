import React, { useEffect } from 'react'

import { useUploadedPosts } from '@/features/user/model/useUploadPosts'
import { Alert, Loader, Typography } from '@byte-creators/ui-kit'

import style from './uploadedPhotos.module.scss'

export const UploadedPosts = () => {
  const {
    error,
    isFetchingMore,
    loading,
    posts,
    query,
    setEndCursorId,
    setHasMore,
    setPosts,
    t,
    triggerRef,
  } = useUploadedPosts()

  useEffect(() => {
    setPosts([])
    setEndCursorId(null)
    setHasMore(true)
  }, [query.id])

  if (loading && posts.length === 0) {
    return <Loader />
  }
  if (error) {
    return <Alert message={error.message} type={'error'} />
  }
  if (!loading && posts.length === 0) {
    return <Typography>{t.noPhotos}</Typography>
  }

  return (
    <div>
      <ul className={style.uploadedPhotosList}>
        {posts.map(post => (
          <li key={post.id}>
            <img height={260} src={post.url} width={260} />
          </li>
        ))}
      </ul>
      {isFetchingMore && <Loader />}
      <div className={style.trigger} ref={triggerRef} />
    </div>
  )
}
