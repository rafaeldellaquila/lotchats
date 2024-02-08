// import { Box, useMediaQuery, useTheme } from '@mui/material'

// import CommunitySideMenu from '@/components/shared/CommunitySideMenu'
// import UserSideMenu from '@/components/shared/UserSideMenu'
// import Navbar from '@components/Navbar'

// const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const isLargeScreen = useMediaQuery(useTheme().breakpoints.up('lg'))
//   return (
//     <Box>
//       <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
//         <Navbar />
//         <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
//           {isLargeScreen && <CommunitySideMenu />}
//           <Box>{children}</Box>
//           {isLargeScreen && <UserSideMenu />}
//         </Box>
//       </Box>
//     </Box>
//   )
// }

// export default AuthLayout
import { Box, useMediaQuery, useTheme } from '@mui/material'

import CommunitySideMenu from '@/components/shared/CommunitySideMenu'
import UserSideMenu from '@/components/shared/UserSideMenu'
import Navbar from '@components/Navbar'

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme = useTheme()
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'))

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
          {isLargeScreen && <Navbar />}

          {children}
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
