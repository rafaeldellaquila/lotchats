import { Global } from '@emotion/react'
import { ThemeProvider } from '@mui/material'
import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import '@/i18n/index'

import { persistor, store } from '@/redux/store/index'
import { GlobalStyles } from '@/theme/global'
import theme from '@theme/index'

const Persistor: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <Global styles={GlobalStyles} />
            {children}
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </StrictMode>
  )
}

export default Persistor
