import {
  Home as HomeIcon,
  Language as LanguageIcon,
  GroupAdd as GroupAddIcon,
  Circle as CircleIcon
} from '@mui/icons-material'
import {
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Badge,
  Paper
} from '@mui/material'
import { useTranslation } from 'react-i18next'

import { primaryTypographyStyles } from '@/components/Navbar/styles'
import { useNavigation } from '@/hooks/utils/useNavigation'

const menuItems = [
  { icon: <HomeIcon />, text: 'home', to: '/' },
  { icon: <LanguageIcon />, text: 'discover', to: '/discover' },
  { icon: <GroupAddIcon />, text: 'create_group', to: 'modal' }
]

const contacts = [
  {
    name: 'John Doeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    avatar: '/path/to/avatar1.jpg',
    status: 'online'
  },
  {
    name: 'Jane Doeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    avatar: '/path/to/avatar2.jpg',
    status: 'offline'
  }
]

const CommunitySideMenu: React.FC = () => {
  const { t } = useTranslation()
  const { handleNavigate } = useNavigation()

  return (
    <Paper elevation={1} sx={{ height: '100%' }}>
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            onClick={() => handleNavigate(item.to)}
            sx={{ cursor: 'pointer' }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              primary={t(item.text)}
              primaryTypographyProps={primaryTypographyStyles()}
            />
          </ListItem>
        ))}
        <Divider sx={{ m: '.5rem', borderColor: 'transparent' }} />
        <Typography variant='h1' sx={{ p: 2 }} color='grey.100'>
          {t('contact')}
        </Typography>
        {contacts.map((contact, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <Badge color='error' overlap='circular' variant='dot'>
                <Avatar src={contact.avatar} sx={{ width: 24, height: 24 }} />
              </Badge>
            </ListItemIcon>
            <ListItemText
              primary={contact.name}
              sx={{
                mr: '1rem'
              }}
              primaryTypographyProps={primaryTypographyStyles()}
            />
            <ListItemIcon>
              <CircleIcon sx={{ width: 8, height: 8 }} />
            </ListItemIcon>
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default CommunitySideMenu
