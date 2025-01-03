/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
  '\n  mutation LOGIN_ADMIN($email: String!, $password: String!) {\n  loginAdmin(email: $email, password: $password) {\n    logged\n  }\n}\n':
    types.Login_AdminDocument,
  '\n  query GetPayments(\n    $pageSize: Int = 10\n    $pageNumber: Int = 1\n    $sortBy: String\n    $searchTerm: String\n    $sortDirection: SortDirection\n  ){\n    getPayments(\n      pageSize: $pageSize\n      pageNumber: $pageNumber\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n      searchTerm:$searchTerm\n  ) {\n    totalCount\n    pageSize\n    pagesCount\n    page\n    items{\n      id\n      createdAt \n      paymentMethod\n      amount\n      userName\n      type\n      avatars{\n        url\n      }\n    }\n  }\n}':
    types.GetPaymentsDocument,
  '\n  query GetFollowers(\n    $pageSize: Int = 10\n    $pageNumber: Int = 1\n    $sortBy: String = "createdAt"\n    $sortDirection: SortDirection = desc\n    $userId: Int!\n  ){\n    getFollowers(\n      pageSize: $pageSize\n      pageNumber: $pageNumber\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n      userId: $userId,\n  ) {\n    pagesCount\n    totalCount\n    pageSize\n    page\n    items{\n      id\n      userId\n      userName\n      createdAt\n      }\n  }\n}\n':
    types.GetFollowersDocument,
  '\n  query GetFollowing(\n    $pageSize: Int = 10\n    $pageNumber: Int = 1\n    $sortBy: String = "createdAt"\n    $sortDirection: SortDirection = desc\n    $userId: Int!\n  ) {\n    getFollowing(\n      pageSize: $pageSize\n      pageNumber: $pageNumber\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n      userId: $userId,\n    ) {\n\t\t\tpagesCount\n    \ttotalCount\n    \tpageSize\n    \tpage\n    \titems{\n      \tid\n      \tuserId\n      \tuserName\n      \tcreatedAt\n      }\n    }\n  }\n':
    types.GetFollowingDocument,
  '\n  query GetPaymentsByUser($userId: Int!, $pageNumber: Int, $pageSize: Int) {\n    getPaymentsByUser(userId: $userId,pageSize: $pageSize, pageNumber: $pageNumber) {\n      totalCount  \n      items{\n      dateOfPayment\n      endDate\n      price\n      type\n      paymentType\n      }\n    }\n  }':
    types.GetPaymentsByUserDocument,
  '\n  query GetPostsByUser($userId: Int!, $endCursorId: Int) {\n    getPostsByUser(userId: $userId, endCursorId: $endCursorId) {\n      pagesCount\n      pageSize\n      totalCount\n      items {\n        id\n        url\n        height\n        width\n      }\n    }\n  }\n':
    types.GetPostsByUserDocument,
  '\nquery GetUser($userId: Int!) {\n    getUser(userId: $userId) {\n      id\n      userName\n      email\n      createdAt\n      profile {\n        firstName\n        lastName\n        avatars {\n          url\n        }\n      }\n      userBan {\n        createdAt\n        reason\n      }\n    }\n  }':
    types.GetUserDocument,
  '\n  mutation BAN_USER($banReason: String!, $userId: Int!) {\n    banUser(banReason: $banReason, userId: $userId)\n\t}\n':
    types.Ban_UserDocument,
  '\n  mutation REMOVE_USER($userId: Int!) {\n    removeUser(userId: $userId)\n\t}\n':
    types.Remove_UserDocument,
  '\n  mutation UNBAN_USER($userId: Int!) {\n    unbanUser(userId: $userId)\n\t}\n':
    types.Unban_UserDocument,
  '\n  query GetUsers(\n    $pageSize: Int = 10\n    $pageNumber: Int = 1\n    $sortBy: String\n    $searchTerm: String\n    $sortDirection: SortDirection\n    $statusFilter: UserBlockStatus\n  ){\n    getUsers(\n      pageSize: $pageSize\n      pageNumber: $pageNumber\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n      searchTerm:$searchTerm\n      statusFilter:$statusFilter\n  ) {\n    pagination{\n      totalCount\n      pageSize\n      pagesCount\n      page\n    }\n    users{\n      userName\n      userBan{\n        reason\n      }\n      createdAt\n      id\n      profile{\n        firstName\n        lastName}\n    }\n}}':
    types.GetUsersDocument,
}

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation LOGIN_ADMIN($email: String!, $password: String!) {\n  loginAdmin(email: $email, password: $password) {\n    logged\n  }\n}\n'
): (typeof documents)['\n  mutation LOGIN_ADMIN($email: String!, $password: String!) {\n  loginAdmin(email: $email, password: $password) {\n    logged\n  }\n}\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetPayments(\n    $pageSize: Int = 10\n    $pageNumber: Int = 1\n    $sortBy: String\n    $searchTerm: String\n    $sortDirection: SortDirection\n  ){\n    getPayments(\n      pageSize: $pageSize\n      pageNumber: $pageNumber\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n      searchTerm:$searchTerm\n  ) {\n    totalCount\n    pageSize\n    pagesCount\n    page\n    items{\n      id\n      createdAt \n      paymentMethod\n      amount\n      userName\n      type\n      avatars{\n        url\n      }\n    }\n  }\n}'
): (typeof documents)['\n  query GetPayments(\n    $pageSize: Int = 10\n    $pageNumber: Int = 1\n    $sortBy: String\n    $searchTerm: String\n    $sortDirection: SortDirection\n  ){\n    getPayments(\n      pageSize: $pageSize\n      pageNumber: $pageNumber\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n      searchTerm:$searchTerm\n  ) {\n    totalCount\n    pageSize\n    pagesCount\n    page\n    items{\n      id\n      createdAt \n      paymentMethod\n      amount\n      userName\n      type\n      avatars{\n        url\n      }\n    }\n  }\n}']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetFollowers(\n    $pageSize: Int = 10\n    $pageNumber: Int = 1\n    $sortBy: String = "createdAt"\n    $sortDirection: SortDirection = desc\n    $userId: Int!\n  ){\n    getFollowers(\n      pageSize: $pageSize\n      pageNumber: $pageNumber\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n      userId: $userId,\n  ) {\n    pagesCount\n    totalCount\n    pageSize\n    page\n    items{\n      id\n      userId\n      userName\n      createdAt\n      }\n  }\n}\n'
): (typeof documents)['\n  query GetFollowers(\n    $pageSize: Int = 10\n    $pageNumber: Int = 1\n    $sortBy: String = "createdAt"\n    $sortDirection: SortDirection = desc\n    $userId: Int!\n  ){\n    getFollowers(\n      pageSize: $pageSize\n      pageNumber: $pageNumber\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n      userId: $userId,\n  ) {\n    pagesCount\n    totalCount\n    pageSize\n    page\n    items{\n      id\n      userId\n      userName\n      createdAt\n      }\n  }\n}\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetFollowing(\n    $pageSize: Int = 10\n    $pageNumber: Int = 1\n    $sortBy: String = "createdAt"\n    $sortDirection: SortDirection = desc\n    $userId: Int!\n  ) {\n    getFollowing(\n      pageSize: $pageSize\n      pageNumber: $pageNumber\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n      userId: $userId,\n    ) {\n\t\t\tpagesCount\n    \ttotalCount\n    \tpageSize\n    \tpage\n    \titems{\n      \tid\n      \tuserId\n      \tuserName\n      \tcreatedAt\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetFollowing(\n    $pageSize: Int = 10\n    $pageNumber: Int = 1\n    $sortBy: String = "createdAt"\n    $sortDirection: SortDirection = desc\n    $userId: Int!\n  ) {\n    getFollowing(\n      pageSize: $pageSize\n      pageNumber: $pageNumber\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n      userId: $userId,\n    ) {\n\t\t\tpagesCount\n    \ttotalCount\n    \tpageSize\n    \tpage\n    \titems{\n      \tid\n      \tuserId\n      \tuserName\n      \tcreatedAt\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetPaymentsByUser($userId: Int!, $pageNumber: Int, $pageSize: Int) {\n    getPaymentsByUser(userId: $userId,pageSize: $pageSize, pageNumber: $pageNumber) {\n      totalCount  \n      items{\n      dateOfPayment\n      endDate\n      price\n      type\n      paymentType\n      }\n    }\n  }'
): (typeof documents)['\n  query GetPaymentsByUser($userId: Int!, $pageNumber: Int, $pageSize: Int) {\n    getPaymentsByUser(userId: $userId,pageSize: $pageSize, pageNumber: $pageNumber) {\n      totalCount  \n      items{\n      dateOfPayment\n      endDate\n      price\n      type\n      paymentType\n      }\n    }\n  }']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetPostsByUser($userId: Int!, $endCursorId: Int) {\n    getPostsByUser(userId: $userId, endCursorId: $endCursorId) {\n      pagesCount\n      pageSize\n      totalCount\n      items {\n        id\n        url\n        height\n        width\n      }\n    }\n  }\n'
): (typeof documents)['\n  query GetPostsByUser($userId: Int!, $endCursorId: Int) {\n    getPostsByUser(userId: $userId, endCursorId: $endCursorId) {\n      pagesCount\n      pageSize\n      totalCount\n      items {\n        id\n        url\n        height\n        width\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\nquery GetUser($userId: Int!) {\n    getUser(userId: $userId) {\n      id\n      userName\n      email\n      createdAt\n      profile {\n        firstName\n        lastName\n        avatars {\n          url\n        }\n      }\n      userBan {\n        createdAt\n        reason\n      }\n    }\n  }'
): (typeof documents)['\nquery GetUser($userId: Int!) {\n    getUser(userId: $userId) {\n      id\n      userName\n      email\n      createdAt\n      profile {\n        firstName\n        lastName\n        avatars {\n          url\n        }\n      }\n      userBan {\n        createdAt\n        reason\n      }\n    }\n  }']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation BAN_USER($banReason: String!, $userId: Int!) {\n    banUser(banReason: $banReason, userId: $userId)\n\t}\n'
): (typeof documents)['\n  mutation BAN_USER($banReason: String!, $userId: Int!) {\n    banUser(banReason: $banReason, userId: $userId)\n\t}\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation REMOVE_USER($userId: Int!) {\n    removeUser(userId: $userId)\n\t}\n'
): (typeof documents)['\n  mutation REMOVE_USER($userId: Int!) {\n    removeUser(userId: $userId)\n\t}\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation UNBAN_USER($userId: Int!) {\n    unbanUser(userId: $userId)\n\t}\n'
): (typeof documents)['\n  mutation UNBAN_USER($userId: Int!) {\n    unbanUser(userId: $userId)\n\t}\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query GetUsers(\n    $pageSize: Int = 10\n    $pageNumber: Int = 1\n    $sortBy: String\n    $searchTerm: String\n    $sortDirection: SortDirection\n    $statusFilter: UserBlockStatus\n  ){\n    getUsers(\n      pageSize: $pageSize\n      pageNumber: $pageNumber\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n      searchTerm:$searchTerm\n      statusFilter:$statusFilter\n  ) {\n    pagination{\n      totalCount\n      pageSize\n      pagesCount\n      page\n    }\n    users{\n      userName\n      userBan{\n        reason\n      }\n      createdAt\n      id\n      profile{\n        firstName\n        lastName}\n    }\n}}'
): (typeof documents)['\n  query GetUsers(\n    $pageSize: Int = 10\n    $pageNumber: Int = 1\n    $sortBy: String\n    $searchTerm: String\n    $sortDirection: SortDirection\n    $statusFilter: UserBlockStatus\n  ){\n    getUsers(\n      pageSize: $pageSize\n      pageNumber: $pageNumber\n      sortBy: $sortBy\n      sortDirection: $sortDirection\n      searchTerm:$searchTerm\n      statusFilter:$statusFilter\n  ) {\n    pagination{\n      totalCount\n      pageSize\n      pagesCount\n      page\n    }\n    users{\n      userName\n      userBan{\n        reason\n      }\n      createdAt\n      id\n      profile{\n        firstName\n        lastName}\n    }\n}}']

export function gql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
