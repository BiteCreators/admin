import { GET_USER } from '@/features/user/api/userQueries'
import { useQuery } from '@apollo/client'

export const useGetUser = (userId: number) => {
  const { data, error, loading } = useQuery(GET_USER, {
    fetchPolicy: 'no-cache',
    variables: { userId },
  })

  return { data, error, loading }
}
