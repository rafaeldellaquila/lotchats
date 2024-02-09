import { Box } from '@mui/material'
import { Outlet, useLocation } from 'react-router-dom'

import CommunitySideMenu from '@/components/shared/CommunitySideMenu'
import UserSideMenu from '@/components/shared/UserSideMenu'
import { useMediaQuery } from '@/hooks/utils/useMediaQueries'
import Navbar from '@components/Navbar'

const AuthLayout: React.FC = () => {
  const [isLargeScreen] = useMediaQuery()
  const { pathname } = useLocation()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          overflow: 'auto',
          flexDirection: isLargeScreen ? 'row' : 'column'
        }}
      >
        {!isLargeScreen && <Navbar />}
        {isLargeScreen && (
          <Box sx={{ width: 250 }}>
            <CommunitySideMenu />
          </Box>
        )}
        <Box sx={{ flexGrow: 1, overflow: 'auto', p: 3 }}>
          {isLargeScreen && pathname !== '/chat' && <Navbar />}
          <Outlet />
        </Box>
        {isLargeScreen && (
          <Box sx={{ width: 250 }}>
            <UserSideMenu />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default AuthLayout
