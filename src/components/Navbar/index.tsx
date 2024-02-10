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
import { useLocation } from 'react-router-dom'

import CommunitySideMenu from '../shared/CommunitySideMenu'
import Drawer from '../shared/Drawer'
import UserSideMenu from '../shared/UserSideMenu'

import { useMediaQuery } from '@/hooks/utils/useMediaQueries'
import { useModal } from '@/hooks/utils/useModal'
import { useToggle } from '@/hooks/utils/useToggle'

const NavBar: React.FC = () => {
  const { t } = useTranslation()
  const [isLargeScreen] = useMediaQuery()
  const { pathname } = useLocation()
  const { toggleSearchModal } = useModal()

  const [isCommunityDrawerOpen, toggleCommunityDrawer] = useToggle()
  const [isUserDrawerOpen, toggleUserDrawer] = useToggle()

  const handleTitles = () => {
    if (pathname === '/') return t('home')
    if (pathname === '/discover') return t('discover')
    if (pathname === '/chat') return ' '
    return
  }

  return (
    <Box>
      <AppBar position='static' color='transparent' elevation={0}>
        <Toolbar>
          {!isLargeScreen && (
            <>
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
              <Drawer
                isOpen={isCommunityDrawerOpen}
                toggle={toggleCommunityDrawer}
                anchor='left'
              >
                <CommunitySideMenu />
              </Drawer>
            </>
          )}

          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1 }}
            fontWeight={600}
          >
            {handleTitles()}
          </Typography>

          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='search'
            sx={{ mr: 2 }}
            onClick={toggleSearchModal}
          >
            <SearchIcon />
          </IconButton>

          {!isLargeScreen && (
            <>
              <Avatar onClick={toggleUserDrawer}>H</Avatar>
              <Drawer
                isOpen={isUserDrawerOpen}
                toggle={toggleUserDrawer}
                anchor='right'
              >
                <UserSideMenu />
              </Drawer>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavBar
