import { Input } from '@byte-creators/ui-kit'

import style from './Search.module.scss'
import { useSearch } from '../model/useSearch'

type Props = {
  paramName?: string
  fullWidth?: boolean
  handleSearchButtonClick?: (value: string) => void
  withAutoSearch?: boolean
  debounceDelay?: number
}

export const Search = ({
  fullWidth,
  handleSearchButtonClick,
  debounceDelay,
  paramName = 'search',
  withAutoSearch = true,
}: Props) => {
  const { handleClickSearchButton, handleChangeSearchInput, value } = useSearch({
    paramName,
    withAutoSearch,
    handleSearchButtonClick,
    debounceDelay,
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
