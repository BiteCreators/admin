import { ChangeEvent, useEffect, useState } from 'react'

import { removeParam, useDebounce, useScopedTranslation } from '@byte-creators/utils'
import { useRouter } from 'next/router'

export const useSearch = ({
  debounceDelay,
  handleSearchButtonClick,
  paramName,
  withAutoSearch,
}: {
  debounceDelay?: number
  handleSearchButtonClick?: (value: string) => void
  paramName: string
  withAutoSearch?: boolean
}) => {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, debounceDelay || 700)
  const router = useRouter()
  const t = useScopedTranslation('Navigation')

  const redirectWithParam = (value?: string) => {
    if (value?.length === 0) {
      const newQuery = removeParam(router.query, [paramName])

      router.replace({ pathname: router.pathname, query: newQuery.toString() }, undefined, {
        shallow: true,
      })

      return
    }
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        [paramName]: value,
      },
    })
  }

  useEffect(() => {
    if (withAutoSearch || value) {
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
    t,
    value,
  }
}
