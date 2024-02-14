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
  ListItemText,
  Box,
  Avatar,
  ListItemAvatar,
  ListItemButton
} from '@mui/material'
import { doc, getDoc, getFirestore } from 'firebase/firestore'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import MenuItemComponent from './ChatNavMenu'

import { GroupMemberProps } from '@/@types/common'
import { auth } from '@/firebase'
import { usePrivateChat } from '@/hooks/chat/usePrivateChat'

interface ReceiverProps {
  name: string
  avatarUrl: string
}
interface ChatNavBarProps {
  receiver: ReceiverProps
  onBack: () => void
  members?: GroupMemberProps[]
  isGroup: boolean
}

const ChatNavBar: React.FC<ChatNavBarProps> = ({
  receiver,
  onBack,
  members
}) => {
  const { t } = useTranslation()
  const { handleContactChatClick } = usePrivateChat()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [membersDialogOpen, setMembersDialogOpen] = useState(false)
  const [groupMembers, setGroupMembers] = useState<GroupMemberProps[]>()
  const currentUser = auth.currentUser
  const navigate = useNavigate()
  const db = getFirestore()
  const menuItems = [
    { text: 'search', onClick: () => navigate('/') },
    {
      text: 'block',
      onClick: () => {}
    },
    {
      text: 'invite_group',
      onClick: () => {}
    }
  ]

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMembersDialogToggle = async () => {
    if (!membersDialogOpen && members) {
      const memberDetailsPromise = members.map(async member => {
        const userDocRef = doc(db, 'users', member.id)
        const userDocSnap = await getDoc(userDocRef)
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data()
          return {
            id: member.id,
            name: userData.name,
            avatarUrl: userData.avatarUrl
          }
        }
        return null
      })

      const memberDetails = await Promise.all(memberDetailsPromise)
      const filteredMemberDetails = memberDetails.filter(
        member => member !== null
      ) as GroupMemberProps[]
      setGroupMembers(filteredMemberDetails)
    }
    setMembersDialogOpen(!membersDialogOpen)
  }

  return (
    <AppBar position='static' elevation={0} color='transparent'>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton edge='start' color='inherit' onClick={onBack}>
            <ChevronLeftIcon />
          </IconButton>
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={handleMembersDialogToggle}
          >
            <Avatar
              src={receiver.avatarUrl}
              sx={{ width: 40, height: 40, marginRight: 2 }}
              alt={receiver.name}
            />
            <Typography variant='h1' fontWeight={600}>
              {receiver.name}
            </Typography>
          </Box>
        </Box>
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
        {members !== undefined && (
          <Dialog open={membersDialogOpen} onClose={handleMembersDialogToggle}>
            <DialogTitle>{t('group_members')}</DialogTitle>
            <DialogContent>
              {groupMembers !== undefined && (
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
              )}
            </DialogContent>
          </Dialog>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default ChatNavBar
