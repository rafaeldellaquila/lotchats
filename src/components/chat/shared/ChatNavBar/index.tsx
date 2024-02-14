import {
  MoreVert as MoreVertIcon,
  ChevronLeftTwoTone as ChevronLeftIcon
} from '@mui/icons-material'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  Menu,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Box
} from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import MenuItemComponent from './ChatNavMenu'

import { ChatNavBarProps, GroupMemberProps } from '@/@types/common'
import { auth } from '@/firebase'
import { usePrivateChat } from '@/hooks/usePrivateChat'

const ChatNavBar: React.FC<ChatNavBarProps> = ({
  receiver,
  onBack,
  members
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [membersDialogOpen, setMembersDialogOpen] = useState(false)
  const { handleContactChatClick } = usePrivateChat()
  const currentUser = auth.currentUser
  const groupMembers: GroupMemberProps[] = members ? members : []

  const handleMembersDialogToggle = () =>
    setMembersDialogOpen(!membersDialogOpen)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const menuItems = [
    { text: 'search', action: () => navigate('/') },
    { text: 'block', action: () => {} },
    { text: 'invite_group', action: () => {} }
  ]

  return (
    <AppBar position='static' elevation={0} color='transparent'>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center'
          }}
        >
          <IconButton edge='start' onClick={onBack} sx={{ mr: 2 }}>
            <ChevronLeftIcon />
          </IconButton>
          <Avatar src={receiver.avatarUrl} alt={receiver.name} sx={{ mr: 2 }} />
          <Typography variant='h6'>{receiver.name}</Typography>
        </Box>
        <IconButton onClick={e => setAnchorEl(e.currentTarget)}>
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
              onClick={item.action}
            />
          ))}
        </Menu>
        <Dialog open={membersDialogOpen} onClose={handleMembersDialogToggle}>
          <DialogTitle>{t('group_members')}</DialogTitle>
          <DialogContent>
            <List>
              {groupMembers.map(member => (
                <ListItemButton
                  key={member.id}
                  onClick={() => handleContactChatClick(member.id)}
                  disabled={member.id === currentUser?.uid}
                  sx={{ cursor: 'pointer' }}
                >
                  <ListItemAvatar>
                    <Avatar src={member.avatarUrl} alt={member.name} />
                  </ListItemAvatar>
                  <ListItemText primary={member.name} />
                </ListItemButton>
              ))}
            </List>
          </DialogContent>
        </Dialog>
      </Toolbar>
    </AppBar>
  )
}

export default ChatNavBar
