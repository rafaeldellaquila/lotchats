import { Global } from '@emotion/react'
import { ThemeProvider } from '@mui/material'
import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import '@/i18n/index'

import CreateGroupChatModal from '@/components/shared/CreateGroupChatModal'
import SearchModal from '@/components/shared/SearchModal'
import { ModalContext } from '@/context/ModalContext'
import { useToggle } from '@/hooks/utils/useToggle'
import { persistor, store } from '@/redux/store/index'
import { GlobalStyles } from '@/theme/global'
import theme from '@theme/index'

const Persistor: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCreateGroupModalOpen, toggleCreateGroupModal] = useToggle()
  const [isSearchModalOpen, toggleSearchModal] = useToggle()

  return (
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <Global styles={GlobalStyles} />
            <ModalContext.Provider
              value={{
                isCreateGroupModalOpen,
                toggleCreateGroupModal,
                isSearchModalOpen,
                toggleSearchModal
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
            </ModalContext.Provider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </StrictMode>
  )
}

export default Persistor
