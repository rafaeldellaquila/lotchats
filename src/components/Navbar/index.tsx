import { Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material'
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Avatar
} from '@mui/material'
import { useTranslation } from 'react-i18next'

import CommunityDrawer from './CommunityDrawer'
import UserDrawer from './UserDrawer'

import { useToggle } from '@/hooks/utils/useToggle'

const NavBar: React.FC = () => {
  const { t } = useTranslation()
  const [isCommunityDrawerOpen, toggleCommunityDrawer] = useToggle()
  const [isUserDrawerOpen, toggleUserDrawer] = useToggle()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={toggleCommunityDrawer}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            {t('home')}
          </Typography>

          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='search'
            sx={{ mr: 2 }}
          >
            <SearchIcon />
          </IconButton>

          <Avatar onClick={toggleUserDrawer}>H</Avatar>
        </Toolbar>
      </AppBar>

      <CommunityDrawer
        isOpen={isCommunityDrawerOpen}
        toggle={toggleCommunityDrawer}
      />
      <UserDrawer isOpen={isUserDrawerOpen} toggle={toggleUserDrawer} />
    </Box>
  )
}

export default NavBar
