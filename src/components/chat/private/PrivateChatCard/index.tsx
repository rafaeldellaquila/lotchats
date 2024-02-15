import { PersonAddAlt1 as PersonAddIcon } from '@mui/icons-material'
import { Avatar, Box, Card, CardActionArea, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import { PreviewChatProps } from '@/@types/common'
import { useModal } from '@/hooks/useModal'
import { usePrivateChat } from '@/hooks/usePrivateChat'
import { isContactAdded } from '@/utils/isContactAdded'

const PrivateChatCard: React.FC<PreviewChatProps> = ({
  avatarUrl,
  name,
  messagePreview,
  email,
  id
}) => {
  const { toggleAddPersonModal } = useModal()
  const [contactAdded, setContactAdded] = useState<boolean>(false)
  const { handleContactChatClick } = usePrivateChat()

  useEffect(() => {
    console.log('id private chat card', id)
    let isMounted = true

    const ContactsCheck = async () => {
      const contactAdded = await isContactAdded(id)
      if (isMounted) {
        setContactAdded(contactAdded)
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
          p: '1rem',
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
            p: '1rem',
            alignItems: 'center'
          }}
        >
          <PersonAddIcon color='success' />
        </CardActionArea>
      )}
    </Card>
  )
}

export default PrivateChatCard
