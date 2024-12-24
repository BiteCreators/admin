import * as React from 'react'

import { formatDate } from '@/common/lib/utils/formatDate'
import { useGetUser } from '@/features/user/model/useGetUser'
import { Alert, Avatar, Loader, Typography } from '@byte-creators/ui-kit'
import { ArrowBackOutline } from '@byte-creators/ui-kit/icons'
import { useScopedTranslation } from '@byte-creators/utils'
import { useRouter } from 'next/router'

import cl from './userHeader.module.scss'

type Props = {}
export const UserHeader = ({}: Props) => {
  const { query } = useRouter()
  const router = useRouter()
  const t = useScopedTranslation('AdminUserProfile')
  const { data, error, loading } = useGetUser(Number(query.id))
  const user = data?.getUser

  const exampleImg =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ6th-oTbkDMbDOPGU_kkRMM55lfvRYgM8JA&s'
  //TODO: remove mock (someone)

  if (loading) {
    return <Loader />
  }
  if (!user) {
    return <Alert message={t.errors.userNotFound} type={'error'} />
  }

  return (
    <div className={cl.currentUserContainer}>
      <div className={cl.back}>
        <button
          onClick={() => {
            router.push('/users')
          }}
        >
          <ArrowBackOutline viewBox={'0 3 20 20'} />
          <Typography>{t.back}</Typography>
        </button>
      </div>
      <div className={cl.nameAndPhotoContainer}>
        <Avatar avatarURL={user.profile.avatars?.[0]?.url || exampleImg} className={cl.avatar} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Typography variant={'h1'}>
            {user.profile.firstName || ' '} {user.profile.lastName || ' '}
          </Typography>
          <Typography className={cl.username} variant={'regular-link'}>
            {user?.userName}
          </Typography>
        </div>
      </div>
      <div className={cl.userInfoContainer}>
        <div className={cl.userInfo}>
          <Typography className={cl.lightText}>{t.userID}</Typography>
          <Typography variant={'medium-text'}>{user.id}</Typography>
        </div>
        <div className={cl.userInfo}>
          <Typography className={cl.lightText}>{t.profileCreationDate}</Typography>
          <Typography variant={'medium-text'}>{formatDate(user.createdAt)}</Typography>
        </div>
      </div>
      {error && <Alert message={error.message} type={'error'} />}
    </div>
  )
}
