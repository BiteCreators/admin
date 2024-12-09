import React from 'react'

import { SortButton, SortBy } from '@/features/search-params'
import { useFollowers } from '@/features/user/model/useFollowers'
import { Alert, Pagination, Table } from '@packages/shared/ui'
import Link from 'next/link'

import s from './followers.module.scss'

import { LoaderBlock } from '../../../../../../../packages/shared/src/ui/loader/LoaderBlock'

export const Followers = () => {
  const { data, error, handlerPageNumber, handlerPageSize, loading, pageNumber, pageSize, t } =
    useFollowers()
  const tableData = data?.getFollowers.items.map(follower => ({
    1: follower.userId,
    2: follower.userName,
    3: <Link href={`profile/${follower.userId}`}>{follower.userName}</Link>,
    4: new Date(follower.createdAt).toLocaleDateString(),
  }))

  if (data?.getFollowers.totalCount === 0) {
    return <p>No Followers</p>
  }
  const tableHeaderData = [
    {
      name: t.userId,
    },
    {
      name: t.userName,
      sort: <SortButton sortBy={SortBy.UserName} />,
    },
    { name: t.profileLink },
    {
      name: t.subscriptionDate,
      sort: <SortButton sortBy={SortBy.DateAdded} />,
    },
  ]

  return (
    <>
      {loading && <LoaderBlock />}
      <Table headers={tableHeaderData} tableData={tableData || []} />
      {data
        ? data?.getFollowers.totalCount > 10 && (
            <Pagination
              className={s.pagination}
              currentPage={pageNumber}
              onChangePagesPortion={handlerPageSize}
              onClickPaginationButton={handlerPageNumber}
              pagesCount={data?.getFollowers.pagesCount}
              pagesPortion={String(pageSize)}
            />
          )
        : null}
      {error?.message && <Alert message={error?.message} purpose={'alert'} type={'error'}></Alert>}
    </>
  )
}
