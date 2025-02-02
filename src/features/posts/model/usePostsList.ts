import { RefObject, useEffect, useRef, useState } from 'react'

import { Post } from '@/common/__generated-types__/graphql'
import { GET_POSTS } from '@/features/posts/api/postsQuery'
import { POST_SUBSCRIPTION } from '@/features/posts/api/postsSubscription'
import { BAN_USER } from '@/features/users/api/banUserQuery'
import { UNBAN_USER } from '@/features/users/api/unbanUserQuery'
import { useLazyQuery, useMutation, useSubscription } from '@apollo/client'
import { useIntersectionObserver, useScopedTranslation } from '@byte-creators/utils'

export const usePostsList = () => {
  const t = useScopedTranslation('UserslistOptions')
  const [isOpenBanModal, setIsOpenBanModal] = useState<boolean>(false)

  const [cursorId, setCursorId] = useState(0)
  const [localPosts, setLocalPosts] = useState<Post[]>([])
  const triggerElementRef = useRef<HTMLDivElement>(null)

  // const [banUser] = useMutation(BAN_USER, {
  //   onCompleted: () => {
  //     console.log('ban completed')
  //   },
  // })
  // const [unbanUser] = useMutation(UNBAN_USER, {
  //   onCompleted: () => {
  //     console.log('unban completed')
  //   },
  // })

  const { data } = useSubscription(POST_SUBSCRIPTION, {
    fetchPolicy: 'no-cache',
    onData: postData => {
      console.log('post data:', postData)
    },
  })

  // const {
  //   data: postSubscriptionData,
  //   error: postSubscriptionError,
  //   loading: postSubscriptionLoading,
  // } = useSubscription(POST_SUBSCRIPTION, {
  //   fetchPolicy: 'no-cache',
  //   onData: ({ data }) => {
  //     console.log('New data received:', data)
  //   },
  // })

  const [fetchPosts, { error: getPostError, loading: getPostLoading }] = useLazyQuery(GET_POSTS, {
    onCompleted: posts => {
      if (posts?.getPosts.items.length > 0) {
        if (!localPosts.map(post => post.id).includes(posts.getPosts.items[0].id)) {
          setLocalPosts((prev: Post[]) => [...prev, ...posts.getPosts.items])
          setCursorId(posts.getPosts.items.at(-1)?.id || 0)
        }
      }
    },
  })

  console.log('subpost', data)
  // console.log('localPosts', localPosts)

  useEffect(() => {
    fetchPosts()
  }, [])

  useIntersectionObserver(
    triggerElementRef,
    () => {
      fetchPosts({ variables: { endCursorPostId: cursorId, pageSize: 9 } })
    },
    { rootMargin: '50px' }
  )

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     entries => {
  //       if (entries[0].isIntersecting) {
  //         fetchPosts({ variables: { endCursorPostId: cursorId, pageSize: 9 } })
  //         handlerUnobserve()
  //       }
  //     },
  //     { rootMargin: '50px' }
  //   )
  //
  //   if (triggerElementRef.current) {
  //     observer.observe(triggerElementRef.current)
  //   }
  //
  //   const handlerUnobserve = () => {
  //     if (triggerElementRef.current) {
  //       observer.unobserve(triggerElementRef.current)
  //     }
  //   }
  //
  //   return () => {
  //     handlerUnobserve()
  //   }
  // }, [localPosts])

  return {
    getPostLoading,
    isOpenBanModal,
    localPosts,
    // postSubscriptionLoading,
    setIsOpenBanModal,
    t,
    triggerElementRef,
  }
}
