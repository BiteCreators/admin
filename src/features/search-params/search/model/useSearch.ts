import { useRouter } from 'next/router'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDebounce } from '@byte-creators/utils'

export const useSearch = ({
  paramName,
  withAutoSearch,
  handleSearchButtonClick,
  debounceDelay,
}: {
  paramName: string
  withAutoSearch?: boolean
  handleSearchButtonClick?: (value: string) => void
  debounceDelay?: number
}) => {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, debounceDelay || 700)
  const router = useRouter()

  const redirectWithParam = (value: string | null) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        [paramName]: value,
      },
    })
  }

  useEffect(() => {
    if (withAutoSearch) {
      redirectWithParam(debouncedValue)
    }
  }, [debouncedValue])

  const handleChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
  }

  const handleClickSearchButton = () => {
    handleSearchButtonClick && handleSearchButtonClick(value)
    redirectWithParam(value)
  }

  return {
    handleChangeSearchInput,
    handleClickSearchButton,
    value,
  }
}
