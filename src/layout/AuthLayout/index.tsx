import { Box } from '@mui/material'
import { Outlet, useLocation } from 'react-router-dom'

import CommunitySideMenu from '@/components/community/CommunitySideMenu'
import Navbar from '@/components/shared/Navbar'
import UserSideMenu from '@/components/user/UserSideMenu'
import { useMediaQuery } from '@/hooks/utils/useMediaQueries'

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
          <Box sx={{ width: '12rem' }}>
            <CommunitySideMenu />
          </Box>
        )}
        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          {isLargeScreen && pathname !== '/chat' && <Navbar />}
          <Outlet />
        </Box>
        {isLargeScreen && (
          <Box sx={{ width: '12rem' }}>
            <UserSideMenu />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default AuthLayout
