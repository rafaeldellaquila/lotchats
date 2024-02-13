import { Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material'
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  Avatar,
  CircularProgress
} from '@mui/material'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import CommunitySideMenu from '../../community/CommunitySideMenu'
import UserSideMenu from '../../user/UserSideMenu'
import Drawer from '../Drawer'

import { auth } from '@/firebase'
import { useMediaQuery } from '@/hooks/utils/useMediaQueries'
import { useModal } from '@/hooks/utils/useModal'
import { useToggle } from '@/hooks/utils/useToggle'

const NavBar: React.FC = () => {
  const { t } = useTranslation()
  const [isLargeScreen] = useMediaQuery()
  const { pathname } = useLocation()
  const { toggleSearchModal } = useModal()
  const db = getFirestore()
  const [currentUser, setCurrentUser] = useState<{
    name: string
    avatarUrl: string
  }>()

  const [isLoading, setIsLoading] = useState<boolean>()
  const [isCommunityDrawerOpen, toggleCommunityDrawer] = useToggle()
  const [isUserDrawerOpen, toggleUserDrawer] = useToggle()

  const handleTitles = () => {
    if (pathname === '/') return t('home')
    if (pathname === '/discover') return t('discover')
    if (pathname.toString().includes('chat')) return ' '
    return
  }

  useEffect(() => {
    setIsLoading(false)
    const fetchUserData = async () => {
      const userAuth = auth.currentUser
      if (userAuth) {
        const userRef = doc(db, 'users', userAuth.uid)
        const userSnap = await getDoc(userRef)
        if (userSnap.exists()) {
          const userData = userSnap.data()
          setCurrentUser({ name: userData.name, avatarUrl: userData.avatarUrl })
        } else {
          console.log('Usuário não encontrado')
        }
      }
    }

    setIsLoading(true)
    fetchUserData()
  }, [db])

  if (isLoading && currentUser === undefined) {
    return <CircularProgress />
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
              <Avatar
                onClick={toggleUserDrawer}
                sx={{ mr: '1rem' }}
                src={currentUser !== undefined ? currentUser.avatarUrl : ' '}
                alt={currentUser !== undefined ? currentUser.name : ' '}
              />
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
