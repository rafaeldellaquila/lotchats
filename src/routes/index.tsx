import { Route, Routes } from 'react-router-dom'

import AuthLayout from '@/layout/AuthLayout'
import ChatPage from '@/pages/ChatPage'
import HomePage from '@/pages/HomePage'

const RouterComponent = () => {
  return (
    <Routes>
      <Route path='/' element={<AuthLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='chat' element={<ChatPage />} />
      </Route>
    </Routes>
  )
}

export default RouterComponent
