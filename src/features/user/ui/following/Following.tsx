import React from 'react'

import { Alert, LoaderBlock, Pagination, Table, TableHeader } from '@byte-creators/ui-kit'
import Link from 'next/link'

import s from './following.module.scss'

import { useFollowing } from '../../model/useFollowing'
import { TableSortButton, USERS_SORT_BY } from '@/entities/sort'

export const Following = () => {
  const { data, error, handlerPageNumber, handlerPageSize, loading, pageNumber, pageSize, sortStore } =
    useFollowing()

  if (data?.getFollowing.totalCount === 0) {
    return <p>No Following</p>
  }

  const tableData = data?.getFollowing.items.map(el => {
    return {
      1: el.userId,
      2: el.userName,
      3: <Link href={`/users/${el.userId}`}>{el.userName}</Link>,
      4: new Date(el.createdAt).toLocaleDateString(),
    }
  })
  const tableHeaderData: TableHeader[] = [
    {
      name: 'User ID',
    },
    {
      name: 'Username',
      sort: <TableSortButton<typeof USERS_SORT_BY> sortStore={sortStore} sortBy={USERS_SORT_BY.UserName} />
    },
    {
      name: 'Profile link',
    },
    {
      name: 'Subscription Date',
      sort: <TableSortButton<typeof USERS_SORT_BY> sortStore={sortStore} sortBy={USERS_SORT_BY.DateAdded} />
    },
  ]

  return (
    <>
      {loading && <LoaderBlock />}
      <Table headers={tableHeaderData} tableData={tableData || []} />
      {data
        ? data?.getFollowing.totalCount > 10 && (
          <Pagination
            className={s.pagination}
            currentPage={pageNumber}
            onChangePagesPortion={handlerPageSize}
            onClickPaginationButton={handlerPageNumber}
            pagesCount={data?.getFollowing.pagesCount}
            pagesPortion={String(pageSize)}
          />
        )
        : null}
      {error?.message && <Alert message={error?.message} purpose={'alert'} type={'error'}></Alert>}
    </>
  )
}
