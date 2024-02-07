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
  Divider
} from '@mui/material'
import { useTranslation } from 'react-i18next'

import { IDrawer } from '@/@types/common'
import Drawer from '@/components/shared/Drawer'
import StatusSelect from '@/components/shared/StatusSelect'

const menuItems = [
  { icon: <GroupAddIcon />, text: 'create_group' },
  { icon: <LanguageIcon />, text: 'config' },
  { icon: <MeetingRoomIcon />, text: 'quit' }
]

const UserDrawer: React.FC<IDrawer> = ({ isOpen, toggle }) => {
  const { t } = useTranslation()

  return (
    <Drawer isOpen={isOpen} toggle={toggle} anchor='right'>
      <StatusSelect />
      <Divider sx={{ m: '.5rem', borderColor: 'transparent' }} />
      <List>
        {menuItems.map((item, index) => (
          <ListItem key={index}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              primary={t(item.text)}
              primaryTypographyProps={{
                variant: 'body1',
                color: 'grey.100',
                fontWeight: 600,
                style: {
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default UserDrawer
