import { Route, Routes } from 'react-router-dom'

import AuthLayout from '@/layout/AuthLayout'
import ChatPage from '@/pages/ChatPage'
import ConfigPage from '@/pages/ConfigPage'
import DiscoverPage from '@/pages/DiscoverPage'
import GroupChatPage from '@/pages/GroupChatPage'
import HomePage from '@/pages/HomePage'

const RouterComponent = () => {
  return (
    <Routes>
      <Route path='/' element={<AuthLayout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/chat' element={<ChatPage />} />
        <Route path='/groupchat' element={<GroupChatPage />} />
        <Route path='/discover' element={<DiscoverPage />} />
        <Route path='/config' element={<ConfigPage />} />
      </Route>
    </Routes>
  )
}

export default RouterComponent
