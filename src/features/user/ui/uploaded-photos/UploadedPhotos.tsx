import { GET_POSTS_BY_USER } from '@/features/user/api/postsQuery'
import { useQuery } from '@apollo/client'
import { Alert, Loader, Typography } from '@packages/shared/ui'
import { useRouter } from 'next/router'

import style from './uploadedPhotos.module.scss'

export const UploadedPhotos = () => {
  const { query } = useRouter()
  const { data, error, loading } = useQuery(GET_POSTS_BY_USER, {
    variables: { userId: Number(query.id) },
  })

  return (
    <div>
      {loading && <Loader />}
      {!loading && !data?.getPostsByUser.items ? (
        <Typography> User has no publications yet </Typography>
      ) : (
        <ul className={style.uploadedPhotosList}>
          {data?.getPostsByUser.items?.map((post, ind) => {
            return (
              <li key={ind}>
                <img height={260} src={post.url ?? undefined} width={260} />
              </li>
            )
          })}
        </ul>
      )}
      {error && <Alert message={error.message} type={'error'} />}
    </div>
  )
}
