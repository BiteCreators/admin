import React from 'react'

import { TableSortButton, USERS_SORT_BY } from '@/entities/sort'
import { Alert, LoaderBlock, Pagination, Table, TableHeader } from '@byte-creators/ui-kit'
import Link from 'next/link'

import s from './following.module.scss'

import { useFollowing } from '../../model/useFollowing'

export const Following = () => {
  const {
    data,
    error,
    handlerPageNumber,
    handlerPageSize,
    loading,
    pageNumber,
    pageSize,
    sortStore,
  } = useFollowing()

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
      sort: (
        <TableSortButton<typeof USERS_SORT_BY>
          sortBy={USERS_SORT_BY.UserName}
          sortStore={sortStore}
        />
      ),
    },
    {
      name: 'Profile link',
    },
    {
      name: 'Subscription Date',
      sort: (
        <TableSortButton<typeof USERS_SORT_BY>
          sortBy={USERS_SORT_BY.DateAdded}
          sortStore={sortStore}
        />
      ),
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
