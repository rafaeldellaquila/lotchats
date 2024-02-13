import { getAuth, signOut } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { useNavigate as useNavigateRouter } from 'react-router-dom'

import { useModal } from './useModal'

import { setLoading, setUser } from '@/redux/slices/authSlice'

export const useNavigation = () => {
  const navigate = useNavigateRouter()
  const { toggleCreateGroupModal } = useModal()
  const dispatch = useDispatch()
  const auth = getAuth()

  const handleNavigate = async (to: string | number) => {
    if (to === 'modal') toggleCreateGroupModal()
    if (to === 'logout') {
      try {
        await signOut(auth)
        dispatch(setUser(null))
        dispatch(setLoading(false))
        navigate('/')
      } catch (error) {
        console.error('Falha ao realizar logout', error)
        // Tratar o erro
      }
    }

    if (to === 0) return navigate(0)
    else navigate(to as string)
  }

  return { handleNavigate }
}
