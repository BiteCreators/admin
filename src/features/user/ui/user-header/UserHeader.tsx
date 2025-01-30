import Skeleton from 'react-loading-skeleton'

import { formatDate } from '@/common/lib/utils/formatDate'
import { useGetUser } from '@/features/user/model/useGetUser'
import { Alert, Avatar, Typography } from '@byte-creators/ui-kit'
import { ArrowBackOutline } from '@byte-creators/ui-kit/icons'
import { useScopedTranslation } from '@byte-creators/utils'
import Link from 'next/link'
import { useRouter } from 'next/router'

import cl from './userHeader.module.scss'

type Props = {}
export const UserHeader = ({}: Props) => {
  const { query } = useRouter()
  const router = useRouter()
  const t = useScopedTranslation('AdminUserProfile')
  const { data, error, loading } = useGetUser(Number(query.id))
  const user = data?.getUser

  if (loading) {
    return (
      <div className={cl.currentUserContainer}>
        <div className={cl.back}>
          <Skeleton height={20} width={120} />
        </div>
        <div className={cl.nameAndPhotoContainer}>
          <Skeleton circle className={cl.avatar} height={60} width={60} />
          <div
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <Skeleton height={28} width={200} />
            <Skeleton height={20} width={150} />
          </div>
        </div>
        <div className={cl.userInfoContainer}>
          <div className={cl.userInfo}>
            <Skeleton height={20} width={100} />
            <Skeleton height={20} width={80} />
          </div>
          <div className={cl.userInfo}>
            <Skeleton height={20} width={100} />
            <Skeleton height={20} width={80} />
          </div>
        </div>
      </div>
    )
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
        <Avatar avatarURL={user.profile.avatars?.[0]?.url || ''} className={cl.avatar} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Typography variant={'h1'}>
            {user.profile.firstName || ' '} {user.profile.lastName || ' '}
          </Typography>
          <Typography className={cl.username} variant={'regular-link'}>
            <Link href={`https://inctbc.ru/profile/${user.id}`}>{user?.userName}</Link>
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
