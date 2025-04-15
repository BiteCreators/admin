import { UserBlockStatus } from '@/common/__generated-types__/graphql'
import { Select, SelectItem } from '@byte-creators/ui-kit'
import { useScopedTranslation } from '@byte-creators/utils'
import { useRouter } from 'next/router'

import style from './blockUsers.module.scss'

export const BlockUsersFilter = () => {
  const router = useRouter()
  const t = useScopedTranslation('UserslistOptions')

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
        <SelectItem value={UserBlockStatus.All}>{t.all}</SelectItem>
        <SelectItem value={UserBlockStatus.Blocked}>{t.blocked}</SelectItem>
        <SelectItem value={UserBlockStatus.Unblocked}>{t.notBlocked}</SelectItem>
      </Select>
    </>
  )
}
