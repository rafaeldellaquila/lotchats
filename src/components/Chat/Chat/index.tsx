import { Box, useTheme } from '@mui/material'

import ChatInput from '../ChatInput'
import ChatNavBar from '../ChatNavBar'
import MessageBubble from '../MessageBubble'

import { MessageProps } from '@/@types/common'

interface ChatProps {
  messages: MessageProps[]
  receiver: string | undefined
  onBack: () => void
}

const Chat: React.FC<ChatProps> = ({ messages, receiver, onBack }) => {
  const theme = useTheme()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ChatNavBar receiver={receiver} onBack={onBack} />
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: theme.spacing(2),
          display: 'flex',
          flexDirection: 'column',
          '& > *:not(:first-of-type)': {
            marginTop: theme.spacing(1)
          }
        }}
      >
        {messages.map(message => (
          <MessageBubble
            key={message.id}
            message={message}
            sx={{
              maxWidth: '75%',
              marginLeft: message.isOwner ? 'auto' : 0,
              marginRight: message.isOwner ? 0 : 'auto',
              backgroundColor: message.isOwner
                ? theme.palette.primary.main
                : theme.palette.grey[300],
              color: message.isOwner
                ? theme.palette.primary.contrastText
                : 'inherit',
              borderRadius: theme.shape.borderRadius,
              padding: theme.spacing(1, 2)
            }}
          />
        ))}
      </Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: theme.palette.background.paper,
          border: `2px solid ${theme.palette.primary.main}`,
          borderRadius: '.5rem',
          zIndex: 1000,
          m: 2
        }}
      >
        <ChatInput />
      </Box>
    </Box>
  )
}

export default Chat
