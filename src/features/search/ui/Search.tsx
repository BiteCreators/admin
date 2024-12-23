import { Input } from '@byte-creators/ui-kit'

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
  const { handleChangeSearchInput, handleClickSearchButton, value } = useSearch({
    debounceDelay,
    handleSearchButtonClick,
    paramName,
    withAutoSearch,
  })

  return (
    <div className={fullWidth ? style.searchInputFullWidth : style.searchInput}>
      <Input
        inputType={'search'}
        onChange={handleChangeSearchInput}
        onSearchClick={handleClickSearchButton}
        placeholder={'Search'}
        value={value}
      />
    </div>
  )
}
