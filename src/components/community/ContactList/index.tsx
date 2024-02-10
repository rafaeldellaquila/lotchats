import { Circle as CircleIcon } from '@mui/icons-material'
import {
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge
} from '@mui/material'
import { useTranslation } from 'react-i18next'

import { primaryTypographyStyles } from '@/components/shared/Navbar/styles'
import { useNavigation } from '@/hooks/utils/useNavigation'

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

const ContactList: React.FC = () => {
  const { t } = useTranslation()
  const { handleNavigate } = useNavigation()

  return (
    <List>
      <Typography variant='h1' sx={{ p: 2 }} color='grey.100'>
        {t('contacts')}
      </Typography>
      {contacts.map((contact, index) => (
        <ListItem
          key={index}
          onClick={() => handleNavigate('/chat')}
          sx={{ cursor: 'pointer' }}
        >
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
  )
}

export default ContactList
