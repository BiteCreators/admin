import React, { useState } from 'react'

import { ActionConfirmation, Select, SelectItem } from '@byte-creators/ui-kit'

import s from './styles.module.scss'

type Props = {
  handleConfirmBan: (banReason: string) => Promise<void>
  handleConfirmDelete: () => void
  handleConfirmUnBan: () => void
  isBan: boolean
  isOpenBanModal: boolean
  isOpenDeleteModal: boolean
  setIsOpenBanModal: (isOpen: boolean) => void
  setIsOpenDeleteModal: (isOpen: boolean) => void
  userName?: string
}
export const ActionConfirmations = ({
  handleConfirmBan,
  handleConfirmDelete,
  handleConfirmUnBan,
  isBan,
  isOpenBanModal,
  isOpenDeleteModal,
  setIsOpenBanModal,
  setIsOpenDeleteModal,
  userName,
}: Props) => {
  const [reason, setReason] = useState<string>('Another reason')

  const messageDeleteModal = (
    <>
      Are you sure to delete user&nbsp;
      <span className={s.name}>{userName}</span>?
    </>
  )
  const messageBanModal = (
    <>
      Are you sure to {isBan ? `unban` : 'ban'} this user,&nbsp;
      <span className={s.name}>{userName}</span>?
    </>
  )
  const handleConfirmStatusBan = () => {
    if (isBan) {
      handleConfirmUnBan()
    } else {
      handleConfirmBan(reason)
    }
  }

  return (
    <>
      <ActionConfirmation
        classNameButtons={s.btn}
        classNameMessage={s.message}
        isOpen={isOpenDeleteModal}
        message={messageDeleteModal}
        onConfirm={handleConfirmDelete}
        onReject={() => { }}
        setIsOpen={setIsOpenDeleteModal}
        title={'Delete user'}
      />
      <ActionConfirmation
        classNameButtons={s.btn}
        classNameMessage={s.message}
        isOpen={isOpenBanModal}
        message={messageBanModal}
        onConfirm={handleConfirmStatusBan}
        onReject={() => { }}
        setIsOpen={setIsOpenBanModal}
        title={'Ban user'}
      >
        {!isBan && (
          <Select onValueChange={setReason} value={reason}>
            <SelectItem value={'Bad behavior'}>Bad behavior</SelectItem>
            <SelectItem value={'Advertising placement'}>Advertising placement</SelectItem>
            <SelectItem value={'Another reason'}>Another reason</SelectItem>
          </Select>
        )}
      </ActionConfirmation>
    </>
  )
}
