import { Box, useTheme } from '@mui/material'

import ChatInput from '../ChatInput'
import ChatNavBar from '../ChatNavBar'
import MessageBubble from '../MessageBubble'

import { MessageProps } from '@/@types/common'

interface GroupChatProps {
  groupName: string
  messages: MessageProps[]
  members: string[]
  onBack: () => void
}

// Criar componente com scroll interno do chat sem alterar o input
const GroupChat: React.FC<GroupChatProps> = ({
  groupName,
  messages,
  members,
  onBack
}) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%'
      }}
    >
      <ChatNavBar
        receiver={groupName}
        onBack={onBack}
        members={members}
        isGroup
      />

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
          <MessageBubble key={message.id} message={message} isGroup />
        ))}
      </Box>
      <ChatInput />
    </Box>
  )
}

export default GroupChat
