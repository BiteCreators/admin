import { useEffect, useRef, useState } from 'react'

import { Post } from '@/common/__generated-types__/graphql'
import { GET_POSTS } from '@/features/posts/api/postsQuery'
import { POST_SUBSCRIPTION } from '@/features/posts/api/postsSubscription'
import { BAN_USER } from '@/features/users/api/banUserQuery'
import { UNBAN_USER } from '@/features/users/api/unbanUserQuery'
import { useLazyQuery, useMutation, useSubscription } from '@apollo/client'
import { useIntersectionObserver, useScopedTranslation } from '@byte-creators/utils'
import { useRouter } from 'next/router'

export const usePostsList = () => {
  const t = useScopedTranslation('UserslistOptions')
  const { query } = useRouter()
  const [error, setError] = useState<null | string>(null)
  const [banNotification, setBanNotification] = useState<null | string>(null)
  const triggerGetPost = useRef<HTMLDivElement>(null)

  const [cursorId, setCursorId] = useState(0)
  const [localPosts, setLocalPosts] = useState<Post[]>([])

  const [pageSize, setPageSize] = useState(true)

  const [isOpenBanModal, setIsOpenBanModal] = useState<boolean>(false)
  const [isBan, setIsBan] = useState<boolean>(false)
  const [reason, setReason] = useState<string>('')
  const [banUserData, setBanUserData] = useState<{ userId: number; userName: string }>({
    userId: 0,
    userName: '',
  })

  const [fetchPosts, { error: getPostError, loading: getPostLoading }] = useLazyQuery(GET_POSTS, {
    onCompleted: posts => {
      if (posts.getPosts.pageSize === 0) {
        setPageSize(false)
      }
      if (posts?.getPosts.items.length > 0) {
        if (!localPosts.map(post => post.id).includes(posts.getPosts.items[0].id)) {
          setLocalPosts((prev: Post[]) => [...prev, ...posts.getPosts.items])
          setCursorId(posts.getPosts.items.at(-1)?.id || 0)
        }
      }
    },
  })

  // get new post from socket

  // const { data } = useSubscription(POST_SUBSCRIPTION, {
  //   fetchPolicy: 'no-cache',
  //   onData: postData => {
  //     console.log('new post:', postData)
  //   },
  // })

  const [banUser] = useMutation(BAN_USER, {
    onCompleted: () => {
      setBanNotification(`User ${banUserData.userName} is banned`)
    },
  })

  const [unbanUser] = useMutation(UNBAN_USER, {
    onCompleted: () => {
      setBanNotification(`User ${banUserData.userName} is unbanned`)
    },
  })

  useIntersectionObserver(
    triggerGetPost,
    () => {
      if (query?.search) {
        fetchPosts({
          variables: { endCursorPostId: cursorId, pageSize: 9, searchTerm: query.search as string },
        })
      } else {
        fetchPosts({ variables: { endCursorPostId: cursorId, pageSize: 9 } })
      }
    },
    { rootMargin: '50px' }
  )

  const handlerBlockBtn = (userName: string, userId: number, ban: boolean) => {
    setIsBan(ban)
    setBanUserData({ userId, userName })
    setIsOpenBanModal(true)
  }

  const handlerOnConfirm = async () => {
    if (!isBan) {
      try {
        await banUser({
          variables: { banReason: reason, userId: banUserData.userId },
        })
      } catch (error) {
        setError('The user is immune')
      }
    } else {
      try {
        await unbanUser({ variables: { userId: banUserData.userId } })
      } catch (error) {
        setError('Lifetime ban')
      }
    }
  }

  if (getPostError) {
    setError('error get post')
  }

  const handleSetSearchPost = async (term: string) => {
    const res = await fetchPosts({ variables: { searchTerm: term } })

    if (res.data) {
      setLocalPosts(res.data.getPosts.items)
    }
  }

  useEffect(() => {
    setLocalPosts([])
    if (query?.search) {
      setPageSize(true)
      handleSetSearchPost(query?.search as string)
    } else {
      fetchPosts()
    }
  }, [query?.search])

  const messageInModal = `${t.youSure} ${isBan ? t.unban : t.ban}, ${banUserData.userName}`

  return {
    banNotification,
    error,
    getPostLoading,
    handlerBlockBtn,
    handlerOnConfirm,
    isBan,
    isOpenBanModal,
    localPosts,
    messageInModal,
    pageSize,
    reason,
    setIsOpenBanModal,
    setReason,
    t,
    triggerGetPost,
  }
}
