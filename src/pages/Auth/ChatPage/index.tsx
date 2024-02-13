import { Box } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

import PrivateChat from '@/components/chat/private/PrivateChat'

const ChatPage: React.FC = () => {
  const navigate = useNavigate()
  const { chatid } = useParams<{ chatid: string }>()

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      <PrivateChat chatId={chatid as string} onBack={() => navigate(-1)} />
    </Box>
  )
}

export default ChatPage
