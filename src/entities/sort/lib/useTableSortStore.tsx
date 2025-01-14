import React, { useEffect } from 'react'

import { SortStore } from '../model/sort.store'
import { getSortStore, removeSortStore } from '../model/sortsStoreCache'
import { TableSortButton } from '../ui/TableSortButton'

//TODO: move this to utlis package
const capitalize = <T extends string>(str: T) =>
  (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>

export const useTableSortStore = <T extends string>({
  cleanUpOnUnmount,
  id,
  options,
}: {
  cleanUpOnUnmount?: boolean
  id: string
  options: readonly T[]
}): [SortStore<T>, Record<`${Capitalize<T>}SortButton`, React.ComponentType>] => {
  const sortStore = getSortStore(id, options)

  useEffect(() => {
    sortStore.syncUrl()
    if (cleanUpOnUnmount) {
      return () => {
        removeSortStore(id)
      }
    }
  }, [sortStore, cleanUpOnUnmount, id])

  const buttons = options.reduce(
    (acc, option) => {
      const Component = () => <TableSortButton sortBy={option} sortStore={sortStore} />

      acc[`${capitalize(option)}SortButton`] = React.memo(Component)

      return acc
    },
    {} as Record<`${Capitalize<T>}SortButton`, React.ComponentType>
  )

  return [sortStore, buttons]
}
