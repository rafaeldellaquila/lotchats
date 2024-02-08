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

import { ChatProps } from '@/@types/common'

interface FavoriteListProps {
  FavoriteProps: ChatProps[]
  maxVisible: number
}

const FavoriteList: React.FC<FavoriteListProps> = ({
  FavoriteProps,
  maxVisible
}) => {
  const { t } = useTranslation()
  const visibleFavoriteProps = FavoriteProps.slice(0, maxVisible)

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h1' fontWeight='600' sx={{ mb: 2 }}>
        {t('FavoritePropss')}
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
          msOverflowStyle: 'none'
        }}
      >
        {visibleFavoriteProps.map(FavoriteProps => (
          <ListItem key={FavoriteProps.id}>
            <ListItemAvatar>
              <Badge badgeContent={FavoriteProps.unreadCount} color='primary'>
                <Avatar src={FavoriteProps.avatarUrl}>
                  {FavoriteProps.name[0]}
                </Avatar>
              </Badge>
            </ListItemAvatar>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default FavoriteList
