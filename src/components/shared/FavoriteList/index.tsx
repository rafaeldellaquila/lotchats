import {
  Avatar,
  Badge,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Typography
} from '@mui/material'
import { useTranslation } from 'react-i18next'

import { Favorite } from '@/@types/common'

interface FavoritesListProps {
  favorites: Favorite[]
  maxVisible: number
}

const FavoritesList: React.FC<FavoritesListProps> = ({
  favorites,
  maxVisible
}) => {
  const { t } = useTranslation()
  const visibleFavorites = favorites.slice(0, maxVisible)

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h1' fontWeight='600' sx={{ mb: 2 }}>
        {t('favorites')}
      </Typography>
      <List
        sx={{
          display: 'flex',
          flexWrap: 'nowrap',
          flexDirection: 'row',
          overflow: 'auto',
          width: '100%',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          '-ms-overflow-style': 'none'
        }}
      >
        {visibleFavorites.map(favorite => (
          <ListItem key={favorite.id}>
            <ListItemAvatar>
              <Badge badgeContent={favorite.notificationCount} color='primary'>
                <Avatar src={favorite.avatarUrl}>{favorite.name[0]}</Avatar>
              </Badge>
            </ListItemAvatar>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default FavoritesList
