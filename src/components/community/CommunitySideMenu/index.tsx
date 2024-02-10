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

import ContactList from '../ContactList'

import { primaryTypographyStyles } from '@/components/shared/Navbar/styles'
import { useNavigation } from '@/hooks/utils/useNavigation'

const menuItems = [
  { icon: <HomeIcon />, text: 'home', to: '/' },
  { icon: <LanguageIcon />, text: 'discover', to: '/discover' },
  { icon: <GroupAddIcon />, text: 'create_group', to: 'modal' }
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
      </List>
      <Divider sx={{ m: '.5rem', borderColor: 'transparent' }} />
      <ContactList />
    </Paper>
  )
}

export default CommunitySideMenu
