import { Route, Routes } from 'react-router-dom'

import AuthLayout from '@/layout/AuthLayout'
import ChatPage from '@/pages/Auth/ChatPage'
import ConfigPage from '@/pages/Auth/ConfigPage'
import DiscoverPage from '@/pages/Auth/DiscoverPage'
import GroupChatPage from '@/pages/Auth/GroupChatPage'
import HomePage from '@/pages/Auth/HomePage'
import LoginPage from '@/pages/Unauth/LoginPage'
import RegisterPage from '@/pages/Unauth/RegisterPage'

const RouterComponent = () => {
  return (
    <Routes>
      <Route path='/' element={<AuthLayout />}>
        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/chat' element={<ChatPage />} />
        <Route path='/groupchat' element={<GroupChatPage />} />
        <Route path='/discover' element={<DiscoverPage />} />
        <Route path='/config' element={<ConfigPage />} />
      </Route>
    </Routes>
  )
}

export default RouterComponent
