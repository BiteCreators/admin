import { useState } from 'react'

import { SortDirection } from '@/common/__generated-types__/graphql'
import { useRouter } from 'next/router'

import style from './sortButton.module.scss'

export enum SortBy {
  Amount = 'amount',
  DateAdded = 'createdAt',
  PaymentType = 'paymentType',
  UserName = 'userName',
}

export const SortButton = ({ sortBy }: { sortBy: SortBy }) => {
  const router = useRouter()

  const [sortDirection, setSortDirection] = useState<SortDirection | undefined>(undefined)

  const handleSortChange = () => {
    const sortDirectionNew =
      (!sortDirection && SortDirection.Asc) ||
      (sortDirection === SortDirection.Asc && SortDirection.Desc) ||
      (sortDirection === SortDirection.Desc && SortDirection.Asc) ||
      undefined

    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        sort: `${sortBy}_${sortDirectionNew}`,
      },
    })
    setSortDirection(sortDirectionNew)
  }
  let sortArrow

  if (
    !sortDirection ||
    (router.query.sort && router.query.sort.toString().split('_')[0] !== sortBy)
  ) {
    sortArrow = (
      <>
        <div className={`${style.arrow} ${style.arrowUp}`}></div>
        <div className={`${style.arrow} ${style.arrowDown}`}></div>
      </>
    )
  } else if (sortDirection === SortDirection.Desc) {
    sortArrow = (
      <div className={`${style.arrow} ${style.arrowDown} ${style.isActiveDownArrow}`}></div>
    )
  } else if (sortDirection === SortDirection.Asc) {
    sortArrow = <div className={`${style.arrow} ${style.arrowUp} ${style.isActiveUpArrow}`}></div>
  }

  return (
    <button className={'flex flex-col h-6 justify-center '} onClick={() => handleSortChange()}>
      {sortArrow}
    </button>
  )
}
