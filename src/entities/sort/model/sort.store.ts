import { SortDirection } from "@/common/__generated-types__/graphql";
import { makeAutoObservable } from "mobx";
import Router from "next/router";

type SortInput<T extends { [key: string]: string }> = {
  sortBy: T[string]
  direction: SortDirection
}

//TODO: fix these typings
export class SortStore<T extends { [key: string]: string }> {
  readonly sortOptions: T
  public sortBy?: T[string]
  public direction?: SortDirection

  constructor(sortOptions: T) {
    makeAutoObservable(this)
    this.sortOptions = sortOptions
  }

  public setSort({ sortBy, direction }: SortInput<T>) {
    this.sortBy = sortBy
    this.direction = direction
    this.redirect({ sortBy, direction })
  }

  public setDirection({ direction }: { direction: SortDirection }) {
    this.direction = direction
    this.redirect({ sortBy: this.sortBy, direction })
  }

  public toggleDirection() {
    this.direction = this.direction === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc
    this.redirect({ sortBy: this.sortBy, direction: this.direction })
  }

  public removeSort() {
    this.sortBy = undefined
    this.direction = undefined
    const { pathname, query } = Router;
    //TODO: remove ts ignore, move this into removeParam function in utils repo
    //@ts-ignore
    const params = new URLSearchParams(query);
    params.delete("direction");
    params.delete("sortBy");
    Router.replace(
      { pathname, query: params.toString() },
      undefined,
      { shallow: true }
    );
  }

  private redirect({ sortBy, direction }: Partial<SortInput<T>>) {
    Router.push({
      pathname: Router.pathname,
      query: {
        ...Router.query,
        direction,
        sortBy,
      },
    })
  }
}
