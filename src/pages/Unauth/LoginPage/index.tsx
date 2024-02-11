import { useEffect } from 'react'

import LoginForm from '@/components/user/LoginForm'
import { auth } from '@/firebase'
import { useNavigation } from '@/hooks/utils/useNavigation'

const LoginPage: React.FC = () => {
  const { handleNavigate } = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        handleNavigate('/home')
      } else {
        return
      }
    })

    return () => unsubscribe()
  }, [handleNavigate])

  return (
    <>
      <LoginForm />
    </>
  )
}

export default LoginPage
