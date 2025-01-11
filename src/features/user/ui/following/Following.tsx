import React from 'react'

import { STARTING_EIGHT_PAGES_PROTION_OPTIONS } from '@/common/lib/consts'
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
    t,
  } = useFollowing()

  if (data?.getFollowing.totalCount === 0) {
    return <p>{t.noFollowing}</p>
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
      name: t.userId,
    },
    {
      name: t.userName,
      sort: (
        <TableSortButton<typeof USERS_SORT_BY>
          sortBy={USERS_SORT_BY.UserName}
          sortStore={sortStore}
        />
      ),
    },
    {
      name: t.profileLink,
    },
    {
      name: t.subscriptionDate,
      sort: (
        <TableSortButton<typeof USERS_SORT_BY>
          sortBy={USERS_SORT_BY.DateAdded}
          sortStore={sortStore}
        />
      ),
    },
  ]

  if (loading) {
    return <LoaderBlock />
  }

  return (
    <>
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
              pagesPortionOptions={STARTING_EIGHT_PAGES_PROTION_OPTIONS}
            />
          )
        : null}
      {error?.message && <Alert message={error?.message} purpose={'alert'} type={'error'}></Alert>}
    </>
  )
}
