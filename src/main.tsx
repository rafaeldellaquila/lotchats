import './i18n/index'

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import Persistor from './layout/Provider'
import RouterComponent from './routes'

createRoot(document.getElementById('root')!).render(
  <Persistor>
    <BrowserRouter>
      <RouterComponent />
    </BrowserRouter>
  </Persistor>
)
