import { useState } from 'react'

import { GET_POSTS_BY_USER } from '@/features/user/api/postsQuery'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

type Post = {
  height: number
  id: number
  url: string
  width: number
}

export const useUploadedPhotos = () => {
  const { query } = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [endCursorId, setEndCursorId] = useState<null | number>(null)
  const [hasMore, setHasMore] = useState(true)
  const [isFetchingMore, setIsFetchingMore] = useState(false)

  const mergePosts = (existingPosts: Post[], newPosts: Post[]): Post[] => {
    return [...existingPosts, ...newPosts]
  }

  const handleNewData = (newPosts: Post[], totalCount: number) => {
    setPosts(prevPosts => mergePosts(prevPosts, newPosts))

    // Update the end cursor to the ID of the last post in the new batch
    if (newPosts.length > 0) {
      const lastPostId = newPosts[newPosts.length - 1].id

      setEndCursorId(lastPostId)
    }

    if (posts.length + newPosts.length >= totalCount) {
      setHasMore(false)
    }
  }
  const { data, error, fetchMore, loading } = useQuery(GET_POSTS_BY_USER, {
    onCompleted: data => {
      const newPosts = data.getPostsByUser.items
      const totalCount = data.getPostsByUser.totalCount

      handleNewData(newPosts, totalCount)
    },
    variables: { userId: Number(query.id) },
  })

  const loadMore = async () => {
    if (!hasMore || isFetchingMore) {
      return
    }

    setIsFetchingMore(true)
    const { data } = await fetchMore({
      variables: {
        endCursorId,
        userId: Number(query.id),
      },
    })

    if (data) {
      const newPosts = data.getPostsByUser.items
      const totalCount = data.getPostsByUser.totalCount

      handleNewData(newPosts, totalCount)
    }

    setIsFetchingMore(false)
  }

  return {
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
  }
}
