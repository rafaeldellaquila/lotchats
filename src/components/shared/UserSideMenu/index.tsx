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

import { primaryTypographyStyles } from '@/components/Navbar/styles'
import StatusSelect from '@/components/shared/StatusSelect'

const menuItems = [
  { icon: <GroupAddIcon />, text: 'create_group' },
  { icon: <LanguageIcon />, text: 'config' },
  { icon: <MeetingRoomIcon color='error' />, text: 'quit' }
]

const UserSideMenu: React.FC = () => {
  const { t } = useTranslation()

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
      <StatusSelect />
      <Divider sx={{ m: '.5rem', borderColor: 'transparent' }} />
      <List sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {menuItems.map((item, index) => (
          <ListItem key={index}>
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