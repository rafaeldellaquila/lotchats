import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { MessageProps } from '@/@types/common'
import Chat from '@/components/Chat/PrivateChat'

const mockMessages: MessageProps[] = [
  {
    id: 1,
    sender: 'Cristian',
    message: 'Oi, tudo bem?',
    time: '11:57',
    isOwner: false
  },
  {
    id: 2,
    sender: 'Silvio',
    message: 'Tudo Certo sim e por aí?',
    time: '12:00',
    isOwner: true
  },
  {
    id: 3,
    sender: 'Cristian',
    message: 'Tudo certo também, do que você precisa?',
    time: '12:30',
    isOwner: false
  },
  {
    id: 4,
    sender: 'Silvio',
    message: 'Queria comprar 1kg de chá matte',
    time: '12:40',
    isOwner: true
  }
]

const ChatPage: React.FC = () => {
  const navigate = useNavigate()
  const receiver =
    mockMessages.find(message => !message.isOwner)?.sender || undefined
  return (
    <Box sx={{ height: '100%' }}>
      <Chat
        messages={mockMessages}
        receiver={receiver}
        onBack={() => navigate(-1)}
      />
    </Box>
  )
}

export default ChatPage
