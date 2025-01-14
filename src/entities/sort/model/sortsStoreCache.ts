import { SortStore } from './sort.store'

const sortStoreCache = new Map<string, SortStore<any>>()

export const getSortStore = <T extends string>(id: string, options: readonly T[]): SortStore<T> => {
  if (!sortStoreCache.has(id)) {
    sortStoreCache.set(id, new SortStore(options))
  }

  return sortStoreCache.get(id) as SortStore<T>
}

export const removeSortStore = (id: string) => {
  sortStoreCache.delete(id)
}
