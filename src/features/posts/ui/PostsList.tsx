import React, { useState } from 'react'

import { usePostsList } from '@/features/posts/model/usePostsList'
import { ActionConfirmation, PostCard, Select, SelectItem } from '@byte-creators/ui-kit'

export const PostsList = () => {
  const {
    getPostLoading,
    isOpenBanModal,
    localPosts,
    // postSubscriptionLoading,
    setIsOpenBanModal,
    t,
    triggerElementRef,
  } = usePostsList()

  const [message, setMessage] = useState('')
  const [ban, setBan] = useState(false)

  const handlerBlock = (message: string, ban: boolean) => {
    console.log('message', message)

    setIsOpenBanModal(true)
    setMessage(message)
    setBan(!ban)
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center',
        }}
      >
        {localPosts ? (
          localPosts.map((post, i, arr) => (
            <div
              key={post.id}
              ref={arr.length - 1 === i ? triggerElementRef : null}
              style={{ width: '235px' }}
            >
              <PostCard
                avatarOwner={post.postOwner.avatars?.[0]?.url || ''}
                createdAt={post.createdAt}
                description={post.description}
                isAdmin
                onClickBlockButton={() =>
                  handlerBlock(post.userBan?.reason, !!post.userBan?.reason)
                }
                ownerId={post.ownerId}
                postId={post.id}
                postImageHight={235}
                postImageUrl={post.images?.[0]?.url || ''}
                postImageWidth={235}
                userName={post.postOwner.userName}
              />
            </div>
          ))
        ) : (
          <p>No post</p>
        )}
      </div>
      <ActionConfirmation
        isOpen={isOpenBanModal}
        message={message}
        onConfirm={() => console.log('confirm')}
        onReject={() => {}}
        setIsOpen={setIsOpenBanModal}
        title={t.banUser}
      >
        {ban && (
          <Select onValueChange={() => console.log('setReason')} value={'reason'}>
            <SelectItem value={'Bad behavior'}>{t.badBehavior}</SelectItem>
            <SelectItem value={'Advertising placement'}>{t.advertisingPlacement}</SelectItem>
            <SelectItem value={'Another reason'}>{t.anotherReason}</SelectItem>
          </Select>
        )}
      </ActionConfirmation>
    </>
  )
}
