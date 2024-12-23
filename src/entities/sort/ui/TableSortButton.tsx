import { SortDirection } from '@/common/__generated-types__/graphql'
import { SortStore, USERS_SORT_BY } from '@/entities/sort'
import { observer } from 'mobx-react'

import style from './TableSortButton.module.scss'

export const TableSortButton = observer(
  <T extends typeof USERS_SORT_BY>({
    sortBy,
    sortStore,
  }: {
    sortBy: T[keyof T]
    sortStore: SortStore<T>
  }) => {
    const isActive = sortStore.sortBy === sortBy
    const isAscending = sortStore.direction === SortDirection.Asc

    let buttons

    if (!isActive) {
      buttons = (
        <>
          <button
            className={`${style.arrow} ${style.arrowUp}`}
            onClick={() => sortStore.setSort({ direction: SortDirection.Asc, sortBy })}
          />
          <button
            className={`${style.arrow} ${style.arrowDown}`}
            onClick={() => sortStore.setSort({ direction: SortDirection.Desc, sortBy })}
          />
        </>
      )
    } else if (isAscending) {
      buttons = (
        <button
          className={`${style.arrow} ${style.arrowUp} ${style.isActiveUpArrow}`}
          onClick={() => sortStore.removeSort()}
        />
      )
    } else {
      buttons = (
        <button
          className={`${style.arrow} ${style.arrowDown} ${style.isActiveDownArrow}`}
          onClick={() => sortStore.removeSort()}
        />
      )
    }

    return <div className={'flex flex-col h-6 justify-center'}>{buttons}</div>
  }
)
