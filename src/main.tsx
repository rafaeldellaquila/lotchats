import { Global } from '@emotion/react'
import { ThemeProvider } from '@mui/material'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'

import './i18n/index'

import { persistor, store } from './redux/store'
import router from './routes'
import theme from './theme'
import { GlobalStyles } from './theme/global'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Global styles={GlobalStyles} />
          <RouterProvider router={router} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
)
