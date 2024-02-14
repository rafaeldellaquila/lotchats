import { Box, useTheme } from '@mui/material'
import { useEffect, useRef } from 'react'

import ChatInput from '../../shared/ChatInput'
import ChatNavBar from '../../shared/ChatNavBar'
import MessageBubble from '../../shared/MessageBubble'

import { ChatProps } from '@/@types/common'
import { useChatMessages } from '@/hooks/useChatMessages'
import { useReceiverInfo } from '@/hooks/useReceiverInfo'

const PrivateChat: React.FC<ChatProps> = ({ chatId, onBack }) => {
  const theme = useTheme()
  const messages = useChatMessages(chatId)
  const receiverContact = useReceiverInfo(chatId)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ChatNavBar receiver={receiverContact} onBack={onBack} isGroup={false} />
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: theme.spacing(2),
          display: 'flex',
          flexDirection: 'column',
          '& > *:not(:first-of-type)': { marginTop: theme.spacing(1) }
        }}
      >
        {messages.map(message => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <ChatInput chatId={chatId} />
    </Box>
  )
}

export default PrivateChat
