import React from 'react'

import { usePostsList } from '@/features/posts/model/usePostsList'
import { ActionConfirmation, Alert, Loader, Select, SelectItem } from '@byte-creators/ui-kit'
import { PostCard } from '@byte-creators/ui-kit/components'
import { useRouter } from 'next/router'

import style from './postsList.module.scss'

export const PostsList = () => {
  const {
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
  } = usePostsList()

  //const skeletonItems = Array.from({ length: 4 }, (_, index) => (
  //     <Skeleton borderRadius={6} height={300} key={index} style={{ display: 'flex' }} width={235} />
  //   ))
  //
  //
  // <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>{skeletonItems}</div>

  return (
    <>
      <div className={style.postsList}>
        {localPosts.length > 0 ? (
          localPosts.map((post, i, arr) => (
            <div
              className={style.post}
              key={post.id}
              ref={pageSize && arr.length - 1 === i ? triggerGetPost : null}
            >
              <PostCard
                avatarOwner={post.postOwner.avatars?.[0]?.url || ''}
                createdAt={post.createdAt}
                description={post.description}
                isAdmin
                linkOption={'users/'}
                onClickBlockButton={() =>
                  handlerBlockBtn(
                    post.postOwner.userName,
                    post.postOwner.id,
                    // always response null, fix backend or get data from user
                    !!post.userBan?.reason
                  )
                }
                ownerId={post.ownerId}
                postId={post.id}
                postImageUrl={post.images?.[0]?.url || ''}
                userName={post.postOwner.userName}
              />
            </div>
          ))
        ) : (
          <p>No post</p>
        )}
      </div>
      <div className={style.modal}>
        <ActionConfirmation
          classNameButtons={style.modalBtn}
          classNameMessage={style.modalMessage}
          isOpen={isOpenBanModal}
          message={messageInModal}
          onConfirm={handlerOnConfirm}
          onReject={() => {}}
          setIsOpen={setIsOpenBanModal}
          title={t.banUser}
        >
          {!isBan && (
            <Select className={style.modalSelect} onValueChange={setReason} value={reason}>
              <SelectItem value={'Bad behavior'}>{t.badBehavior}</SelectItem>
              <SelectItem value={'Advertising placement'}>{t.advertisingPlacement}</SelectItem>
              <SelectItem value={'Another reason'}>{t.anotherReason}</SelectItem>
            </Select>
          )}
        </ActionConfirmation>
        {error && <Alert message={error} purpose={'toast'} type={'error'} />}
        {banNotification && <Alert message={banNotification} purpose={'toast'} type={'success'} />}
        {getPostLoading && <Loader />}
      </div>
    </>
  )
}
