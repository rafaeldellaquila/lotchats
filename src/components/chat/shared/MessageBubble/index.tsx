import { Box, Typography, useTheme, SxProps, Theme } from '@mui/material'

import { MessageProps } from '@/@types/common'
import { auth } from '@/firebase'

interface MessageBubbleProps {
  message: MessageProps
  isGroup?: boolean
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isGroup = false
}) => {
  const theme = useTheme()
  const isOwner = message.senderId === auth.currentUser?.uid
  const alignToRight = isOwner

  const timestampDate = message.timestamp
    ? message.timestamp.toDate()
    : new Date()

  const formattedTime = timestampDate
    ? `${timestampDate.getHours().toString().padStart(2, '0')}:${timestampDate.getMinutes().toString().padStart(2, '0')}`
    : 'Horário Indisponível'

  const bubbleStyles: SxProps<Theme> = {
    maxWidth: '80%',
    minWidth: '10%',
    padding: theme.spacing(2),
    margin: theme.spacing(1, 0),
    borderRadius: theme.shape.borderRadius,
    bgcolor: isOwner ? theme.palette.primary.main : theme.palette.grey[200],
    alignSelf: alignToRight ? 'flex-end' : 'flex-start',
    wordBreak: 'break-word',
    marginLeft: isOwner ? 'auto' : 0,
    marginRight: isOwner ? 0 : 'auto',
    backgroundColor: isOwner
      ? theme.palette.primary.main
      : theme.palette.grey[300],
    color: isOwner ? theme.palette.primary.contrastText : 'inherit'
  }

  return (
    <Box sx={bubbleStyles}>
      {isGroup && (
        <Typography variant='body2' fontWeight={'bold'}>
          {message.senderId}
        </Typography>
      )}
      <Typography variant='body1'>{message.text}</Typography>
      <Typography variant='caption'>{formattedTime}</Typography>
    </Box>
  )
}

export default MessageBubble
