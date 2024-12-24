import { Alert, Dropdown } from '@byte-creators/ui-kit'
import { Block, MoreHorizontalOutline, PersonRemoveOutline } from '@byte-creators/ui-kit/icons'

import s from './style.module.scss'

import { useOptions } from '../../model/useOptions'
import { ActionConfirmations } from '../modals/ActionConfirmations'

type Props = {
  isBan: boolean
  refetchUsers: () => void
  userId: number
  userName?: string
}

export const Options = ({ isBan, refetchUsers, userId, userName }: Props) => {
  const {
    error,
    handleConfirmBan,
    handleConfirmDelete,
    handleConfirmUnBan,
    handleMoreInformationClick,
    isOpenBanModal,
    isOpenDeleteModal,
    optionsRef,
    setIsOpenBanModal,
    setIsOpenDeleteModal,
  } = useOptions({ refetchUsers, userId })

  const items = [
    {
      icon: <PersonRemoveOutline />,
      label: 'Delete user',
      onClick: () => {
        setIsOpenDeleteModal(true)
      },
    },
    {
      icon: <Block />,
      label: isBan ? 'Unban in the system' : 'Ban user',
      onClick: () => {
        setIsOpenBanModal(true)
      },
    },
    {
      icon: <MoreHorizontalOutline />,
      label: 'More information',
      onClick: handleMoreInformationClick,
    },
  ]

  return (
    <div className={s.options} ref={optionsRef}>
      <Dropdown
        className={s.dropdown}
        iconButton={
          <button className={s.toggle}>
            <MoreHorizontalOutline />
          </button>
        }
        iconButtonOpen={
          <button className={`${s.toggle} ${s.active}`}>
            <MoreHorizontalOutline />
          </button>
        }
        items={items}
      />
      <ActionConfirmations
        handleConfirmBan={handleConfirmBan}
        handleConfirmDelete={handleConfirmDelete}
        handleConfirmUnBan={handleConfirmUnBan}
        isBan={isBan}
        isOpenBanModal={isOpenBanModal}
        isOpenDeleteModal={isOpenDeleteModal}
        setIsOpenBanModal={setIsOpenBanModal}
        setIsOpenDeleteModal={setIsOpenDeleteModal}
        userName={userName}
      />
      {error && <Alert message={error} purpose={'alert'} type={'error'}></Alert>}
    </div>
  )
}
