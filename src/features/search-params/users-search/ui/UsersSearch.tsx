import { ChangeEvent, useState } from 'react'

import { Input } from '@byte-creators/ui-kit'
import { useRouter } from 'next/router'

import style from './usersSearch.module.scss'

type Props = {
  fullWidth?: boolean
  handleSearchButtonClick?: (value: string) => void
}

export const UsersSearch = ({ fullWidth, handleSearchButtonClick }: Props) => {
  const [value, setValue] = useState('')
  const router = useRouter()
  //TODO: добавить debounce (tapuru)
  const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }
  const onClickSearchButton = () => {
    handleSearchButtonClick && handleSearchButtonClick(value)
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        user_name: value,
      },
    })
  }

  return (
    <div className={fullWidth ? style.searchInputFullWidth : style.searchInput}>
      <Input
        inputType={'search'}
        onChange={onChangeSearchInput}
        onSearchClick={onClickSearchButton}
        placeholder={'Search'}
        value={value}
      />
    </div>
  )
}
