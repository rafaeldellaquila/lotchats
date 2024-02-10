import { useNavigate as useNavigateRouter } from 'react-router-dom'

import { useModal } from './useModal'

export const useNavigation = () => {
  const navigate = useNavigateRouter()
  const { toggleCreateGroupModal } = useModal()

  const handleNavigate = (to: string) => {
    if (to === 'modal') toggleCreateGroupModal()
    else if (to === 'logout') console.log('Implementar logoff')
    else navigate(to)
  }

  return { handleNavigate }
}
