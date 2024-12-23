import { UserBlockStatus } from '../__generated-types__/graphql'

export type QueryParams = {
  block_status_filter?: UserBlockStatus
  sortBy?: string
  direction?: string
  user_name?: string
}
