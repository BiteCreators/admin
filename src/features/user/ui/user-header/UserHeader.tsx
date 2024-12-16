import * as React from 'react'

import { formatDate } from '@/common/lib/utils/formatDate'
import { useGetUser } from '@/features/user/model/useGetUser'
import { Alert, Avatar, Loader, Typography } from '@byte-creators/ui-kit'
import { ArrowBackOutline } from '@byte-creators/ui-kit/icons'
import { useRouter } from 'next/router'

import cl from './userHeader.module.scss'

type Props = {}
export const UserHeader = ({}: Props) => {
  const { query } = useRouter()
  const { data, error, loading } = useGetUser(Number(query.id))
  const user = data?.getUser

  const exampleImg =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ6th-oTbkDMbDOPGU_kkRMM55lfvRYgM8JA&s'
  //todo: remove mock

  if (loading) {
    return <Loader />
  }
  if (!user) {
    return <Alert message={'User not found'} type={'error'} />
  }

  return (
    <div className={cl.currentUserContainer}>
      <div className={cl.back}>
        <button>
          <ArrowBackOutline />
        </button>
        <Typography>Back to Users List</Typography>
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
          <Typography className={cl.lightText}>UserID</Typography>
          <Typography variant={'medium-text'}>{user.id}</Typography>
        </div>
        <div className={cl.userInfo}>
          <Typography className={cl.lightText}>Profile Creation Date</Typography>
          <Typography variant={'medium-text'}>{formatDate(user.createdAt)}</Typography>
        </div>
      </div>
      {error && <Alert message={error.message} type={'error'} />}
    </div>
  )
}
