import { Alert } from '@byte-creators/ui-kit'
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
    isOpen,
    isOpenBanModal,
    isOpenDeleteModal,
    optionsRef,
    setIsOpen,
    setIsOpenBanModal,
    setIsOpenDeleteModal,
    toggleOptions,
  } = useOptions({ refetchUsers, userId })

  return (
    <div className={s.options} ref={optionsRef}>
      <button className={`${s.toggle} ${isOpen ? s.active : ''}`} onClick={toggleOptions}>
        <MoreHorizontalOutline />
      </button>
      <ul className={`${s.list} ${isOpen ? s.active : ''}`}>
        <li>
          <button
            className={s.btn}
            onClick={() => {
              setIsOpen(false)
              setIsOpenDeleteModal(true)
            }}
          >
            <PersonRemoveOutline />
            Delete User
          </button>
        </li>
        <li>
          <button
            className={s.btn}
            onClick={() => {
              setIsOpen(false)
              setIsOpenBanModal(true)
            }}
          >
            <Block />
            {isBan ? 'Unban' : 'Ban in the system'}
          </button>
        </li>
        <li>
          <button className={s.btn}>
            <MoreHorizontalOutline />
            More Information
          </button>
        </li>
      </ul>
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
