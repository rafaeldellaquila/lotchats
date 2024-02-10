import { Outlet } from 'react-router-dom'

const UnauthLayout: React.FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default UnauthLayout
