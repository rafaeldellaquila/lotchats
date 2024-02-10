import {
  MoreVert as MoreVertIcon,
  ChevronLeft as ChevronLeftIcon
} from '@mui/icons-material'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText
} from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import MenuItemComponent from './ChatNavMenu/index' // Ajuste o caminho conforme necessário

import { useNavigation } from '@/hooks/utils/useNavigation'

interface ChatNavBarProps {
  receiver: string | undefined
  onBack: () => void
  members?: string[]
  isGroup: boolean
}

const ChatNavBar: React.FC<ChatNavBarProps> = ({
  receiver,
  onBack,
  members,
  isGroup
}) => {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [membersDialogOpen, setMembersDialogOpen] = useState(false)
  const { handleNavigate } = useNavigation()

  const menuItems = [
    { text: 'home', onClick: () => handleNavigate('/') },
    {
      text: 'discover',
      onClick: () => handleNavigate('/discover')
    },
    {
      text: 'create_group',
      onClick: () => handleNavigate('modal')
    }
  ]

  if (isGroup) {
    menuItems.push({
      text: 'view_members',
      onClick: () => setMembersDialogOpen(!membersDialogOpen)
    })
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMembersDialogToggle = () => {
    setMembersDialogOpen(!membersDialogOpen)
  }

  return (
    <AppBar position='static' elevation={0} color='transparent'>
      <Toolbar>
        <IconButton edge='start' color='inherit' onClick={onBack}>
          <ChevronLeftIcon />
        </IconButton>
        <Typography
          variant='h6'
          component='div'
          sx={{ flexGrow: 1 }}
          fontWeight={600}
        >
          {receiver}
        </Typography>
        <IconButton color='inherit' onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {menuItems.map((item, index) => (
            <MenuItemComponent
              key={index}
              text={t(item.text)}
              onClick={item.onClick}
            />
          ))}
        </Menu>
        {members && (
          <Dialog open={membersDialogOpen} onClose={handleMembersDialogToggle}>
            <DialogTitle>{t('group_members')}</DialogTitle>
            <DialogContent>
              <List>
                {members.map((member, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={member} />
                  </ListItem>
                ))}
              </List>
            </DialogContent>
          </Dialog>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default ChatNavBar
