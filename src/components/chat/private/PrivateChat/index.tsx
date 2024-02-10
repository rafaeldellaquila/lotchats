import { Box, useTheme } from '@mui/material'

import ChatInput from '../../shared/ChatInput'
import ChatNavBar from '../../shared/ChatNavBar'
import MessageBubble from '../../shared/MessageBubble'

import { MessageProps } from '@/@types/common'

interface ChatProps {
  messages: MessageProps[]
  receiver: string | undefined
  onBack: () => void
}

const Chat: React.FC<ChatProps> = ({ messages, receiver, onBack }) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%'
      }}
    >
      <ChatNavBar receiver={receiver} onBack={onBack} isGroup={false} />
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
          <MessageBubble key={message.id} message={message} />
        ))}
      </Box>
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: '4px',
          border: `2px solid ${theme.palette.primary.main}`,
          m: 2
        }}
      >
        <ChatInput />
      </Box>
    </Box>
  )
}

export default Chat
