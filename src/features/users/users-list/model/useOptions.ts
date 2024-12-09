import React, { useEffect, useRef, useState } from 'react'

import { useMutation } from '@apollo/client'

import { BAN_USER } from '../api/banUserQuery'
import { REMOVE_USER } from '../api/removeUserQuery'
import { UNBAN_USER } from '../api/unbanUserQuery'

export const useOptions = ({
  refetchUsers,
  userId,
}: {
  refetchUsers: () => void
  userId: number
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const optionsRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<null | string>(null)

  const [isOpenBanModal, setIsOpenBanModal] = useState<boolean>(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)

  const [banUser] = useMutation(BAN_USER, {
    onCompleted: () => {
      refetchUsers()
    },
  })
  const [unbanUser] = useMutation(UNBAN_USER, {
    onCompleted: () => {
      refetchUsers()
    },
  })
  const [removeUser] = useMutation(REMOVE_USER, {
    onCompleted: () => {
      refetchUsers()
    },
  })

  const handleConfirmDelete = async () => {
    try {
      await removeUser({ variables: { userId } })
      setIsOpenDeleteModal(false)
    } catch (error) {
      setError('This user has banned you')
    }
  }
  const handleConfirmBan = async (banReason: string) => {
    try {
      await banUser({
        variables: { banReason, userId },
      })
      setIsOpenBanModal(false)
    } catch (error) {
      setError('The user is immune')
    }
  }
  const handleConfirmUnBan = async () => {
    try {
      await unbanUser({ variables: { userId } })
      setIsOpenBanModal(false)
    } catch (error) {
      setError('Lifetime ban')
    }
  }

  const toggleOptions = () => {
    setIsOpen(prev => !prev)
  }
  const handleClickOutside = (event: MouseEvent) => {
    if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return {
    error,
    handleConfirmBan,
    handleConfirmDelete,
    handleConfirmUnBan,
    isOpen,
    isOpenBanModal,
    isOpenDeleteModal,
    optionsRef,
    setIsOpen,
    setIsOpenBanModal,
    setIsOpenDeleteModal,
    toggleOptions,
  }
}
