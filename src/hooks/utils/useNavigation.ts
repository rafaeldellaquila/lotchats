import { getAuth, signOut } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { useNavigate as useNavigateRouter } from 'react-router-dom'

import { useModal } from './useModal'

import { setLoading, setUser } from '@/redux/slices/authSlice'

export const useNavigation = () => {
  const navigate = useNavigateRouter()
  const { toggleCreateGroupModal } = useModal()
  const dispatch = useDispatch() // Hook do Redux para despachar ações
  const auth = getAuth() // Inicializa o Firebase Auth

  const handleNavigate = async (to: string | number) => {
    if (to === 'modal') {
      toggleCreateGroupModal()
    } else if (to === 'logout') {
      try {
        await signOut(auth) // Realiza o logout no Firebase Auth
        dispatch(setUser(null)) // Limpa o estado do usuário no Redux
        dispatch(setLoading(false)) // Opcional: Define o estado de carregamento como falso
        navigate('/') // Redireciona para a página de login ou inicial após o logout
      } catch (error) {
        console.error('Falha ao realizar logout', error)
        // Tratar o erro conforme necessário
      }
    } else if (to === 0) {
      return navigate(0) // Recarrega a página
    } else {
      navigate(to as string) // Navega para a rota especificada
    }
  }

  return { handleNavigate }
}
