import { useEffect } from 'react'

import { useAuth } from '@/common/lib/hooks/useAuth'
import { UserHeader } from '@/features/user/ui/user-header/UserHeader'
import { useRouter } from 'next/router'

const ProtectedPage = () => {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated === null) {
      return
    }

    if (!isAuthenticated) {
      router.push('/auth/sign-in')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div>
      <h1>Users page</h1>
      <UserHeader />
    </div>
  )
}

export default ProtectedPage
