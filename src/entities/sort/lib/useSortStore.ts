import { useEffect } from 'react'

import { SortStore } from '../model/sort.store'
import { getSortStore, removeSortStore } from '../model/sortsStoreCache'

export const useSortStore = <T extends string>({
  cleanUpOnUnmount,
  id,
  options,
}: {
  cleanUpOnUnmount?: boolean
  id: string
  options: T[]
}): SortStore<T> => {
  const sortStore = getSortStore(id, options)

  useEffect(() => {
    sortStore.syncUrl()
    if (cleanUpOnUnmount) {
      return () => {
        removeSortStore(id)
      }
    }
  }, [sortStore, cleanUpOnUnmount, id])

  return sortStore
}
