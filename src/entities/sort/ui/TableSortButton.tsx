import { SortDirection } from '@/common/__generated-types__/graphql'
import { useRouter } from 'next/router'

import style from "./TableSortButton.module.scss"

import { SortStore } from '@/entities/sort'
import { observer } from 'mobx-react'

export const TableSortButton = observer(<T extends { [key: string]: string }>({ sortStore, sortBy }: { sortStore: SortStore<T>; sortBy: T[string] }) => {
  const router = useRouter()

  console.log(sortBy)
  const handleSetAsc = () => {
    sortStore.setSort({ sortBy, direction: SortDirection.Asc })
  }

  const handleSetDesc = () => {
    sortStore.setSort({ sortBy, direction: SortDirection.Desc })
  }

  const handleRemove = () => {
    sortStore.removeSort()
  }

  let sortArrow

  if (
    !sortStore.direction ||
    (router.query.sortBy && router.query.sortBy !== sortBy)
  ) {
    sortArrow = (
      <>
        <button className={`${style.arrow} ${style.arrowUp}`} onClick={handleSetAsc}></button>
        <button className={`${style.arrow} ${style.arrowDown}`} onClick={handleSetDesc}></button >
      </>
    )
  } else if (sortStore.direction === SortDirection.Desc) {
    sortArrow = (
      <button className={`${style.arrow} ${style.arrowDown} ${style.isActiveDownArrow}`} onClick={handleRemove}></button>
    )
  } else if (sortStore.direction === SortDirection.Asc) {
    sortArrow = (
      <button className={`${style.arrow} ${style.arrowUp} ${style.isActiveUpArrow}`} onClick={handleRemove}></button>
    )
  }

  return (
    <div className={'flex flex-col h-6 justify-center '} >
      {sortArrow}
    </div>
  )
})
