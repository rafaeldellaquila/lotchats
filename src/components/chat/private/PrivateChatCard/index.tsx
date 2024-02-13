import {
  PersonAddAlt1 as PersonAddIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon
} from '@mui/icons-material'
import { Avatar, Box, Card, CardActionArea, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import { usePrivateChat } from '@/hooks/chat/usePrivateChat'
import { useModal } from '@/hooks/utils/useModal'
import { isContactAdded } from '@/utils/isContactAdded'
import { toggleFavoriteContact } from '@/utils/toggleFavoriteContact'

interface PrivateChatProps {
  avatarUrl: string | undefined
  name: string
  messagePreview?: string
  email?: string
  id: string
}

const PrivateChatCard: React.FC<PrivateChatProps> = ({
  avatarUrl,
  name,
  messagePreview,
  email,
  id
}) => {
  const { toggleAddPersonModal } = useModal()
  const [contactAdded, setContactAdded] = useState<boolean>(false)
  const { handleContactChatClick } = usePrivateChat()
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  const handleToggleFavorite = async () => {
    await toggleFavoriteContact(id)
    setIsFavorite(!isFavorite)
  }

  useEffect(() => {
    let isMounted = true

    const ContactsCheck = async () => {
      const contactAdded = await isContactAdded(id)
      const favoriteStatus = await isContactAdded(id)

      if (isMounted) {
        setContactAdded(contactAdded)
        setIsFavorite(favoriteStatus)
      }
    }

    ContactsCheck()

    return () => {
      isMounted = false
    }
  }, [id])

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        mb: 2,
        p: '1rem',
        width: '100%',
        boxSizing: 'border-box',
        cursor: 'pointer'
      }}
      elevation={0}
    >
      <CardActionArea
        onClick={() => handleContactChatClick(id)}
        sx={{
          display: 'flex',
          flex: 10,
          alignItems: 'center'
        }}
      >
        <Avatar src={avatarUrl} alt={name} sx={{ mr: 2 }}>
          {avatarUrl ? '' : name.charAt(0).toUpperCase()}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant='body1' fontWeight='bold' color='common.black'>
            {name}
          </Typography>
          <Typography variant='body2' fontWeight='bold' color='grey.600'>
            {email}
          </Typography>
          <Typography
            variant='body2'
            color='text.secondary'
            noWrap
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {messagePreview}
          </Typography>
        </Box>
      </CardActionArea>
      {contactAdded && (
        <CardActionArea
          onClick={() => toggleAddPersonModal(id)}
          sx={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            p: 2
          }}
        >
          <PersonAddIcon color='success' />
        </CardActionArea>
      )}

      <CardActionArea
        onClick={handleToggleFavorite}
        sx={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          p: 2
        }}
      >
        {isFavorite ? (
          <FavoriteIcon color='error' />
        ) : (
          <FavoriteBorderIcon color='error' />
        )}
      </CardActionArea>
    </Card>
  )
}

export default PrivateChatCard
