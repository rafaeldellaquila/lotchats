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
  MenuItem
} from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface ChatNavBarProps {
  receiver: string | undefined
  onBack: () => void
}

const ChatNavBar: React.FC<ChatNavBarProps> = ({ receiver, onBack }) => {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
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
          <MenuItem onClick={handleClose}>{t('invite_group')}</MenuItem>
          <MenuItem onClick={handleClose}>{t('search')}</MenuItem>
          <MenuItem onClick={handleClose}>{t('mute_notifications')}</MenuItem>
          <MenuItem onClick={handleClose}>{t('clear_history')}</MenuItem>
          <MenuItem onClick={handleClose}>{t('block_user')}</MenuItem>
          <MenuItem onClick={handleClose}>{t('delete_contact')}</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default ChatNavBar
