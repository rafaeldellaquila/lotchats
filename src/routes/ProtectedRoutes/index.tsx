import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

import { RootState } from '@/redux/store'

const ProtectedRoute: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user)
  return user ? <Outlet /> : <Navigate to='/' />
}

export default ProtectedRoute
