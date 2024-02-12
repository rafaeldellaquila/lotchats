import { PersonAddAlt1 as PersonAddIcon } from '@mui/icons-material'
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardActionArea,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'

import { PrivateChatProps } from '@/@types/common'
import { useModal } from '@/hooks/utils/useModal'
import { checkContactAdded } from '@/utils/checkContactAdded'

const PrivateChatCard: React.FC<PrivateChatProps> = ({
  avatarUrl,
  name,
  messagePreview,
  unreadCount,
  time,
  email,
  id
}) => {
  const { toggleAddPersonModal } = useModal()
  const [isContactAdded, setIsContactAdded] = useState<boolean>(false)

  const handleCardClick = () => {
    console.log('clique')
  }

  useEffect(() => {
    const checkIfContactIsAdded = async () => {
      const contactAdded = await checkContactAdded(id)
      setIsContactAdded(contactAdded)
    }

    checkIfContactIsAdded()
  }, [id, toggleAddPersonModal])

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
        onClick={handleCardClick}
        sx={{
          display: 'flex',
          flex: 10,
          alignItems: 'center'
        }}
      >
        <Badge
          badgeContent={unreadCount}
          color='error'
          sx={{
            mr: 2
          }}
        >
          <Avatar src={avatarUrl} alt={name}>
            {avatarUrl ? '' : name.charAt(0).toUpperCase()}
          </Avatar>
        </Badge>
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
        <Typography
          variant='body2'
          color='text.secondary'
          fontWeight='bold'
          textAlign='right'
          sx={{
            ml: 'auto',
            whiteSpace: 'nowrap',
            alignSelf: 'self-start',
            mt: 0.5
          }}
        >
          {time}
        </Typography>
      </CardActionArea>
      {!isContactAdded && (
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
    </Card>
  )
}

export default PrivateChatCard
