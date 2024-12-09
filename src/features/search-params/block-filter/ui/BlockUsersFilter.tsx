import { UserBlockStatus } from '@/common/__generated-types__/graphql'
import { Select, SelectItem } from '@packages/shared/ui'
import { useRouter } from 'next/router'

import style from './blockUsers.module.scss'

export const BlockUsersFilter = () => {
  const router = useRouter()

  const handleBlockFilterChange = (value: string) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        block_status_filter: value,
      },
    })
  }

  return (
    <>
      <Select
        className={style.blockUsersFilter}
        defaultValue={UserBlockStatus.All}
        onValueChange={handleBlockFilterChange}
      >
        <SelectItem value={UserBlockStatus.All}>All</SelectItem>
        <SelectItem value={UserBlockStatus.Blocked}>Blocked</SelectItem>
        <SelectItem value={UserBlockStatus.Unblocked}>Not blocked</SelectItem>
      </Select>
    </>
  )
}
