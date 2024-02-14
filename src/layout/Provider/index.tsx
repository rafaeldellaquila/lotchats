import { Global } from '@emotion/react'
import { ThemeProvider } from '@mui/material'
import { StrictMode, useState } from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import AddContactDialog from '@/components/shared/AddContactDialog'
import CreateGroupChatModal from '@/components/shared/CreateGroupChatModal'
import SearchModal from '@/components/shared/SearchModal'
import { ModalContext } from '@/context/ModalContext'
import { useToggle } from '@/hooks/useToggle'
import { persistor, store } from '@/redux/store/index'
import { GlobalStyles } from '@/theme/global'
import theme from '@theme/index'

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCreateGroupModalOpen, toggleCreateGroupModal] = useToggle()
  const [isSearchModalOpen, toggleSearchModal] = useToggle()
  const [isAddPersonModalOpen, toggleAddPersonModal] = useToggle()
  const [selectedContactId, setSelectedContactId] = useState<
    string | undefined
  >(undefined)

  const handleToggleAddPersonModal = (id: string | undefined) => {
    toggleAddPersonModal()
    if (id) setSelectedContactId(id)
    else if (!isAddPersonModalOpen) setSelectedContactId(undefined)
  }

  return (
    <StrictMode>
      <StoreProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <Global styles={GlobalStyles} />
            <ModalContext.Provider
              value={{
                isCreateGroupModalOpen,
                toggleCreateGroupModal,
                isSearchModalOpen,
                toggleSearchModal,
                isAddPersonModalOpen,
                toggleAddPersonModal: handleToggleAddPersonModal,
                selectedContactId
              }}
            >
              {children}
              <CreateGroupChatModal
                open={isCreateGroupModalOpen}
                onClose={toggleCreateGroupModal}
              />
              <SearchModal
                open={isSearchModalOpen}
                onClose={toggleSearchModal}
              />
              <AddContactDialog
                open={isAddPersonModalOpen}
                onClose={toggleAddPersonModal}
              />
            </ModalContext.Provider>
          </ThemeProvider>
        </PersistGate>
      </StoreProvider>
    </StrictMode>
  )
}

export default Provider
