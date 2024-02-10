import './i18n'

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import Provider from './layout/Provider'
import RouterComponent from './routes'
import '@/firebase'

createRoot(document.getElementById('root')!).render(
  <Provider>
    <BrowserRouter>
      <RouterComponent />
    </BrowserRouter>
  </Provider>
)
