import { MenuItem, ListItemText } from '@mui/material'

interface MenuItemComponentProps {
  text: string
  onClick: () => void
}

const MenuItemComponent: React.FC<MenuItemComponentProps> = ({
  text,
  onClick
}) => {
  return (
    <MenuItem onClick={onClick}>
      <ListItemText primary={text} />
    </MenuItem>
  )
}

export default MenuItemComponent
