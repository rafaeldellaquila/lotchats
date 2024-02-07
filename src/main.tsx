import { MantineProvider } from '@mantine/core'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import './i18n'

import router from './routes'
import theme from './theme'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider defaultColorScheme='dark' theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>
)
