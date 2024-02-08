import { Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material'
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Avatar,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { useTranslation } from 'react-i18next'

import CommunitySideMenu from '../shared/CommunitySideMenu'
import Drawer from '../shared/Drawer'
import SearchModal from '../shared/SearchModal'
import UserSideMenu from '../shared/UserSideMenu'

import { useToggle } from '@/hooks/utils/useToggle'

const NavBar: React.FC = () => {
  const { t } = useTranslation()
  const isLargeScreen = useMediaQuery(useTheme().breakpoints.up('lg'))
  const [isCommunityDrawerOpen, toggleCommunityDrawer] = useToggle()
  const [isUserDrawerOpen, toggleUserDrawer] = useToggle()
  const [isModalOpen, toggleModalOpen] = useToggle()

  return (
    <Box sx={{ flexGrow: 1 }}>
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

          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            {t('home')}
          </Typography>

          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='search'
            sx={{ mr: 2 }}
            onClick={toggleModalOpen}
          >
            <SearchIcon />
          </IconButton>
          <SearchModal isOpen={isModalOpen} toggle={toggleModalOpen} />

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
