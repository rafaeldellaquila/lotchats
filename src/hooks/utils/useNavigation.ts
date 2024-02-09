import { useNavigate as useNavigateRouter } from 'react-router-dom'

export const useNavigation = () => {
  const navigate = useNavigateRouter()

  const handleNavigate = (to: string) => {
    if (to === 'modal') console.log('Componente modal')
    else if (to === 'logout') console.log('Implementar logoff')
    else if (to !== 'modal') navigate(to)
    else console.log('Implementar')
  }

  return { handleNavigate }
}
