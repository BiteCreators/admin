import React from 'react'

import { SortButton, SortBy } from '@/features/search-params'
import { useFollowers } from '@/features/user/model/useFollowers'
import { Alert, LoaderBlock, Pagination, Table } from '@byte-creators/ui-kit'
import Link from 'next/link'

import s from './followers.module.scss'

export const Followers = () => {
  const { data, error, handlerPageNumber, handlerPageSize, loading, pageNumber, pageSize, t } =
    useFollowers()

  if (data?.getFollowers.totalCount === 0) {
    return <p>No Followers</p>
  }
  const tableData = data?.getFollowers.items.map(follower => ({
    1: follower.userId,
    2: follower.userName,
    3: <Link href={`profile/${follower.userId}`}>{follower.userName}</Link>,
    4: new Date(follower.createdAt).toLocaleDateString(),
  }))

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

  // TODO: fix types error
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
