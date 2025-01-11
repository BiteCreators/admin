import { UserBlockStatus } from '../__generated-types__/graphql'

export type QueryParams = {
  block_status_filter?: UserBlockStatus
  direction?: string
  search?: string
  sortBy?: string
  user_name?: string
}
