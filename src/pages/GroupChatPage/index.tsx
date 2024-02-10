import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { MessageProps } from '@/@types/common'
import GroupChat from '@/components/chat/group/GroupChat'

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
  },
  {
    id: 5,
    sender: 'Marcos',
    message: 'Oi, tudo bem?',
    time: '11:57',
    isOwner: false
  },
  {
    id: 6,
    sender: 'Silvio',
    message: 'Tudo Certo sim e por aí?',
    time: '12:00',
    isOwner: true
  },
  {
    id: 7,
    sender: 'Marcos',
    message: 'Tudo certo também, do que você precisa?',
    time: '12:30',
    isOwner: false
  },
  {
    id: 8,
    sender: 'Julia',
    message: 'Queria comprar 1kg de chá matte',
    time: '12:40',
    isOwner: false
  }
]

const mockMembers = ['Cristian', 'Silvio', 'Julia', 'Marcos']

const GroupChatPage: React.FC = () => {
  const navigate = useNavigate()
  const groupName = 'Grupo de Chá'

  return (
    <Box sx={{ height: '100%' }}>
      <GroupChat
        groupName={groupName}
        messages={mockMessages}
        members={mockMembers}
        onBack={() => navigate(-1)}
      />
    </Box>
  )
}

export default GroupChatPage
