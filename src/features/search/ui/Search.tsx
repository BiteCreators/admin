import { useEffect } from 'react'

import { Input } from '@byte-creators/ui-kit'
import { useRouter } from 'next/router'

import style from './Search.module.scss'

import { useSearch } from '../model/useSearch'

type Props = {
  debounceDelay?: number
  fullWidth?: boolean
  handleSearchButtonClick?: (value: string) => void
  paramName?: string
  withAutoSearch?: boolean
}

export const Search = ({
  debounceDelay,
  fullWidth,
  handleSearchButtonClick,
  paramName = 'search',
  withAutoSearch = true,
}: Props) => {
  const { handleChangeSearchInput, handleClickSearchButton, setValue, t, value } = useSearch({
    debounceDelay,
    handleSearchButtonClick,
    paramName,
    withAutoSearch,
  })

  const { query } = useRouter()

  useEffect(() => {
    if (query.search) {
      setValue(query.search as string)
    }
  }, [query.search])

  return (
    <div className={fullWidth ? style.searchInputFullWidth : style.searchInput}>
      <Input
        inputType={'search'}
        onChange={handleChangeSearchInput}
        onSearchClick={handleClickSearchButton}
        placeholder={t.search}
        value={value}
      />
    </div>
  )
}
