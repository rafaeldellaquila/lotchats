import { Global } from '@emotion/react'
import { ThemeProvider } from '@mui/material'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import './i18n'

import router from './routes'
import theme from './theme'
import { GlobalStyles } from './theme/global'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Global styles={GlobalStyles} />
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
)
