import { Box, Typography, useTheme, SxProps, Theme } from '@mui/material'

import { MessageProps } from '@/@types/common'

interface MessageBubbleProps {
  message: MessageProps
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const theme = useTheme()
  const alignToRight = message.isOwner

  const bubbleStyles: SxProps<Theme> = {
    maxWidth: '80%',
    minWidth: '10%',
    padding: theme.spacing(2),
    margin: theme.spacing(1, 0),
    borderRadius: theme.shape.borderRadius,
    bgcolor: message.isOwner
      ? theme.palette.primary.main
      : theme.palette.grey[200],
    alignSelf: alignToRight ? 'flex-end' : 'flex-start',
    wordBreak: 'break-word',
    marginLeft: message.isOwner ? 'auto' : 0,
    marginRight: message.isOwner ? 0 : 'auto',
    backgroundColor: message.isOwner
      ? theme.palette.primary.main
      : theme.palette.grey[300],
    color: message.isOwner ? theme.palette.primary.contrastText : 'inherit'
  }

  return (
    <Box sx={bubbleStyles}>
      <Typography variant='body1'>{message.message}</Typography>
      <Typography variant='caption'>{message.time}</Typography>
    </Box>
  )
}

export default MessageBubble
