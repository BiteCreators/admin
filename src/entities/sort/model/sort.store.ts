import { SortDirection } from '@/common/__generated-types__/graphql'
import { removeParam } from '@byte-creators/utils'
import { makeAutoObservable } from 'mobx'
import Router from 'next/router'

type SortInput<T extends string> = {
  direction: SortDirection
  sortBy: T
}

export class SortStore<T extends string> {
  public direction?: SortDirection
  public sortBy?: T
  readonly sortOptions: readonly T[]

  constructor(sortOptions: readonly T[]) {
    makeAutoObservable(this, {
      sortOptions: false,
    })
    this.sortOptions = sortOptions
  }

  private redirect({ direction, sortBy }: Partial<SortInput<T>>) {
    Router.push({
      pathname: Router.pathname,
      query: {
        ...Router.query,
        direction,
        sortBy,
      },
    })
  }

  public removeSort() {
    this.sortBy = undefined
    this.direction = undefined
    const { pathname, query } = Router
    const newQuery = removeParam(query, ['direction', 'sortBy'])

    Router.replace({ pathname, query: newQuery.toString() }, undefined, { shallow: true })
  }

  public setDirection({ direction }: { direction: SortDirection }) {
    this.direction = direction
    this.redirect({ direction, sortBy: this.sortBy })
  }

  public setSort({ direction, sortBy }: SortInput<T>) {
    this.sortBy = sortBy
    this.direction = direction
    this.redirect({ direction, sortBy })
  }

  public syncUrl() {
    const query: Record<string, any> = { ...Router.query }

    if (this.direction !== undefined) {
      query.direction = this.direction
    }
    if (this.sortBy !== undefined) {
      query.sortBy = this.sortBy
    }
    Router.push({
      pathname: Router.pathname,
      query,
    })
  }

  public toggleDirection() {
    this.direction = this.direction === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc
    this.redirect({ direction: this.direction, sortBy: this.sortBy })
  }
}
