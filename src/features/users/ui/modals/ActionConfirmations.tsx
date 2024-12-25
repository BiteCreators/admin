import React, { useState } from 'react'

import { ActionConfirmation, Select, SelectItem } from '@byte-creators/ui-kit'
import { useScopedTranslation } from '@byte-creators/utils'

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
  const t = useScopedTranslation('UserslistOptions')
  const [reason, setReason] = useState<string>(t.anotherReason)

  const messageDeleteModal = (
    <>
      {t.youSure} {t.delete} {userName}?
    </>
  )
  const messageBanModal = (
    <>
      {t.youSure} {isBan ? t.unban : t.ban} {userName}?
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
        onReject={() => {}}
        setIsOpen={setIsOpenDeleteModal}
        title={t.deleteUser}
      />
      <ActionConfirmation
        classNameButtons={s.btn}
        classNameMessage={s.message}
        isOpen={isOpenBanModal}
        message={messageBanModal}
        onConfirm={handleConfirmStatusBan}
        onReject={() => {}}
        setIsOpen={setIsOpenBanModal}
        title={t.banUser}
      >
        {!isBan && (
          <Select onValueChange={setReason} value={reason}>
            <SelectItem value={'Bad behavior'}>{t.badBehavior}</SelectItem>
            <SelectItem value={'Advertising placement'}>{t.advertisingPlacement}</SelectItem>
            <SelectItem value={'Another reason'}>{t.anotherReason}</SelectItem>
          </Select>
        )}
      </ActionConfirmation>
    </>
  )
}
