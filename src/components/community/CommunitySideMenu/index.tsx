// CommunitySideMenu.tsx
import {
  Home as HomeIcon,
  Language as LanguageIcon,
  GroupAdd as GroupAddIcon
} from '@mui/icons-material'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import ContactList from '../ContactList'

import { useContacts } from '@/hooks/useContacts'
import { useModal } from '@/hooks/useModal'

const CommunitySideMenu: React.FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { toggleCreateGroupModal } = useModal()
  const contacts = useContacts()

  const menuItems = [
    { icon: <HomeIcon />, text: 'home', action: () => navigate('/home') },
    {
      icon: <LanguageIcon />,
      text: 'discover',
      action: () => navigate('/discover')
    },
    {
      icon: <GroupAddIcon />,
      text: 'create_group',
      action: toggleCreateGroupModal
    }
  ]

  return (
    <Paper
      elevation={1}
      sx={{ height: '100%', backgroundColor: 'common.white' }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            onClick={item.action}
            sx={{ cursor: 'pointer' }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={t(item.text)} />
          </ListItem>
        ))}
      </List>
      <Divider sx={{ m: '.5rem', borderColor: 'transparent' }} />
      <ContactList contacts={contacts} />
    </Paper>
  )
}

export default CommunitySideMenu
