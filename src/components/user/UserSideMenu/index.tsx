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
import { useTranslation } from 'react-i18next'

import { primaryTypographyStyles } from '@/components/shared/Navbar/styles'
import { useNavigation } from '@/hooks/utils/useNavigation'

const menuItems = [
  { icon: <GroupAddIcon />, text: 'create_group', to: 'modal' },
  { icon: <LanguageIcon />, text: 'config', to: '/config' },
  { icon: <MeetingRoomIcon color='error' />, text: 'quit', to: 'logout' }
]

const UserSideMenu: React.FC = () => {
  const { t } = useTranslation()
  const { handleNavigate } = useNavigation()

  return (
    <Paper sx={{ height: '100%', overflow: 'hidden' }} elevation={1}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          p: '1rem'
        }}
      >
        <Avatar sx={{ mr: '1rem' }}>H</Avatar>
        <Typography variant='body1' fontWeight='600'>
          John Doe
        </Typography>
      </Box>
      <Divider sx={{ m: '.5rem', borderColor: 'transparent' }} />
      <List sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            onClick={() => handleNavigate(item.to)}
            sx={{ cursor: 'pointer' }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              primary={t(item.text)}
              primaryTypographyProps={primaryTypographyStyles({
                color: index === menuItems.length - 1 ? 'error' : 'grey.100'
              })}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default UserSideMenu
