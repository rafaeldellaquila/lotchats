import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import ProtectedRoute from './ProtectedRoutes'

import AuthLayout from '@/layout/AuthLayout'
import UnauthLayout from '@/layout/UnauthLayout'
import ChatPage from '@/pages/Auth/ChatPage'
import ConfigPage from '@/pages/Auth/ConfigPage'
import DiscoverPage from '@/pages/Auth/DiscoverPage'
import GroupChatPage from '@/pages/Auth/GroupChatPage'
import HomePage from '@/pages/Auth/HomePage'
import LoginPage from '@/pages/Unauth/LoginPage'
import RegisterPage from '@/pages/Unauth/RegisterPage'
import { setLoading, setUser } from '@/redux/slices/authSlice'

const RouterComponent = () => {
  const dispatch = useDispatch()

  const auth = getAuth()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      dispatch(setLoading(true))
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        }
        dispatch(setUser(userData))
      } else {
        dispatch(setUser(null))
      }
      dispatch(setLoading(false))
    })

    return () => unsubscribe()
  }, [auth, dispatch])

  return (
    <Routes>
      <Route element={<UnauthLayout />}>
        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AuthLayout />}>
          <Route path='/home' element={<HomePage />} />
          <Route path='/privatechat/:chatid' element={<ChatPage />} />
          <Route path='/groupchat' element={<GroupChatPage />} />
          <Route path='/discover' element={<DiscoverPage />} />
          <Route path='/config' element={<ConfigPage />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default RouterComponent
