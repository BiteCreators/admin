import React, { useEffect } from 'react'

import { useUploadedPhotos } from '@/features/user/model/useUploadPhotos'
import { Alert, Button, Loader, Typography } from '@byte-creators/ui-kit'

import style from './uploadedPhotos.module.scss'

export const UploadedPhotos = () => {
  const {
    error,
    hasMore,
    isFetchingMore,
    loadMore,
    loading,
    posts,
    query,
    setEndCursorId,
    setHasMore,
    setPosts,
  } = useUploadedPhotos()

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
    return <Typography>No Uploaded Photos</Typography>
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
      {!isFetchingMore && hasMore && (
        <div className={style.buttonContainer}>
          <Button onClick={loadMore} variant={'outline'}>
            Load More
          </Button>
        </div>
      )}
    </div>
  )
}
