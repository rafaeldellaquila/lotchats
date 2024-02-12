import { createContext } from 'react'

type ModalContextType = {
  isCreateGroupModalOpen: boolean
  toggleCreateGroupModal: () => void
  isSearchModalOpen: boolean
  toggleSearchModal: () => void
  toggleAddPersonModal: (id?: string) => void
  isAddPersonModalOpen: boolean
  selectedContactId: string | undefined
}

export const ModalContext = createContext<ModalContextType>({
  isCreateGroupModalOpen: false,
  toggleCreateGroupModal: () => {},
  isSearchModalOpen: false,
  toggleSearchModal: () => {},
  toggleAddPersonModal: () => {},
  isAddPersonModalOpen: false,
  selectedContactId: undefined
})
