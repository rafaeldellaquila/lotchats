import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import LoginForm from '@/components/user/LoginForm'
import { auth } from '@/firebase'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigate('/home')
      } else {
        return
      }
    })

    return () => unsubscribe()
  }, [navigate])

  return (
    <>
      <LoginForm />
    </>
  )
}

export default LoginPage
