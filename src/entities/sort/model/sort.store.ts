import { SortDirection } from '@/common/__generated-types__/graphql'
import { USERS_SORT_BY } from '@/entities/sort'
import { removeParam } from '@byte-creators/utils'
import { makeAutoObservable } from 'mobx'
import Router from 'next/router'

export class SortStore<T extends typeof USERS_SORT_BY> {
  public direction?: SortDirection
  public sortBy?: T[keyof T]
  readonly sortOptions: T

  constructor(sortOptions: T) {
    makeAutoObservable(this)
    this.sortOptions = sortOptions
  }

  private redirect({
    direction,
    sortBy,
  }: Partial<{ direction: SortDirection; sortBy: T[keyof T] }>) {
    const { pathname, query } = Router

    Router.push({
      pathname,
      query: {
        ...query,
        direction: direction ? String(direction) : undefined,
        sortBy: sortBy ? String(sortBy) : undefined,
      },
    })
  }

  public removeSort() {
    this.direction = undefined
    this.sortBy = undefined
    const { pathname, query } = Router

    const newQuery = removeParam(query, ['direction', 'sortBy'])

    Router.replace({ pathname, query: newQuery }, undefined, { shallow: true })
  }

  public setDirection(direction: SortDirection) {
    this.direction = direction
    this.redirect({ direction, sortBy: this.sortBy })
  }

  public setSort({ direction, sortBy }: { direction: SortDirection; sortBy: T[keyof T] }) {
    this.direction = direction
    this.sortBy = sortBy
    this.redirect({ direction, sortBy })
  }

  public toggleDirection() {
    this.direction = this.direction === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc
    this.redirect({ direction: this.direction, sortBy: this.sortBy })
  }
}
