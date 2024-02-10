import { createContext } from 'react'

type ModalContextType = {
  isCreateGroupModalOpen: boolean
  toggleCreateGroupModal: () => void
  isSearchModalOpen: boolean
  toggleSearchModal: () => void
}

export const ModalContext = createContext<ModalContextType>({
  isCreateGroupModalOpen: false,
  toggleCreateGroupModal: () => {},
  isSearchModalOpen: false,
  toggleSearchModal: () => {}
})
