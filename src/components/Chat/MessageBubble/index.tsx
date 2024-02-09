import { Box, Typography, useTheme, SxProps, Theme } from '@mui/material'

import { MessageProps } from '@/@types/common'

interface MessageBubbleProps {
  message: MessageProps
  sx?: SxProps<Theme>
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, sx }) => {
  const theme = useTheme()
  const alignToRight = message.isOwner

  const bubbleStyles: SxProps<Theme> = {
    maxWidth: '80%',
    minWidth: '10%',
    padding: theme.spacing(1),
    margin: theme.spacing(1, 0),
    borderRadius: theme.shape.borderRadius,
    bgcolor: message.isOwner
      ? theme.palette.primary.main
      : theme.palette.grey[200],
    color: message.isOwner
      ? theme.palette.common.white
      : theme.palette.text.primary,
    alignSelf: alignToRight ? 'flex-end' : 'flex-start',
    wordBreak: 'break-word',
    ...sx
  }

  return (
    <Box sx={bubbleStyles}>
      <Typography variant='body1'>{message.message}</Typography>
      <Typography variant='caption'>{message.time}</Typography>
    </Box>
  )
}

export default MessageBubble
