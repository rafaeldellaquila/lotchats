import {
  Language as LanguageIcon,
  GroupAdd as GroupAddIcon,
  MeetingRoom as MeetingRoomIcon
} from '@mui/icons-material'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Typography,
  Box,
  Paper
} from '@mui/material'
import { signOut } from 'firebase/auth'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { primaryTypographyStyles } from '@/components/shared/Navbar/styles'
import { auth } from '@/firebase'
import { useModal } from '@/hooks/useModal'
import { setLoading, setUser } from '@/redux/slices/authSlice'

const UserSideMenu: React.FC = () => {
  const { t } = useTranslation()
  const { toggleCreateGroupModal } = useModal()

  const [currentUser, setCurrentUser] = useState({
    name: '',
    avatarUrl: ''
  })

  const db = getFirestore()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      dispatch(setUser(null))
      dispatch(setLoading(false))
      navigate('/')
    } catch (error) {
      console.error(error)
      // Tratar o erro
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const userAuth = auth.currentUser
      if (userAuth) {
        const userRef = doc(db, 'users', userAuth.uid)
        const userSnap = await getDoc(userRef)
        if (userSnap.exists()) {
          const userData = userSnap.data()
          setCurrentUser({ name: userData.name, avatarUrl: userData.avatarUrl })
        } else {
          console.error(t('user_not_found'))
        }
      }
    }

    fetchUserData()
  }, [db, t])

  return (
    <Paper
      sx={{
        height: '100%',
        overflow: 'hidden',
        backgroundColor: 'common.white'
      }}
      elevation={1}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          p: '1rem'
        }}
      >
        <Avatar
          sx={{ mr: '1rem' }}
          src={currentUser.avatarUrl}
          alt={currentUser.name}
        />
        <Typography variant='body1' fontWeight='600'>
          {currentUser.name}
        </Typography>
      </Box>
      <Divider sx={{ m: '.5rem', borderColor: 'transparent' }} />
      <List sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <ListItem
          onClick={() => toggleCreateGroupModal()}
          sx={{ cursor: 'pointer' }}
        >
          <ListItemIcon>
            <GroupAddIcon />
          </ListItemIcon>
          <ListItemText
            primary={t('create_group')}
            primaryTypographyProps={primaryTypographyStyles({
              color: 'grey.100'
            })}
          />
        </ListItem>
        <ListItem
          onClick={() => navigate('/config')}
          sx={{ cursor: 'pointer' }}
        >
          <ListItemIcon>
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText
            primary={t('config')}
            primaryTypographyProps={primaryTypographyStyles({
              color: 'grey.100'
            })}
          />
        </ListItem>
        <ListItem onClick={() => handleLogout()} sx={{ cursor: 'pointer' }}>
          <ListItemIcon>
            <MeetingRoomIcon color='error' />
          </ListItemIcon>
          <ListItemText
            primary={t('quit')}
            primaryTypographyProps={primaryTypographyStyles({
              color: 'error'
            })}
          />
        </ListItem>
      </List>
    </Paper>
  )
}

export default UserSideMenu
