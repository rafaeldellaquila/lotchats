import { Close as CloseIcon } from '@mui/icons-material'
import {
  Drawer as MaterialDrawer,
  IconButton,
  DrawerProps
} from '@mui/material'

interface CustomDrawerProps extends DrawerProps {
  isOpen: boolean
  toggle: () => void
  anchor?: 'left' | 'right'
  children?: React.ReactNode
}

const Drawer: React.FC<CustomDrawerProps> = ({
  isOpen,
  toggle,
  anchor = 'left',
  children
}) => {
  return (
    <MaterialDrawer
      anchor={anchor}
      open={isOpen}
      onClose={toggle}
      PaperProps={{
        sx: { maxWidth: '12rem', width: '100%' }
      }}
    >
      <IconButton
        aria-label='close community drawer'
        onClick={toggle}
        sx={{ justifyContent: 'flex-start', p: '8px 16px' }}
      >
        <CloseIcon />
      </IconButton>
      {children}
    </MaterialDrawer>
  )
}

export default Drawer
