import { Box } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'

import PrivateChat from '@/components/chat/private/PrivateChat'

const ChatPage: React.FC = () => {
  const navigate = useNavigate()
  const { chatId } = useParams<{ chatId: string }>() // Extrai o chatId dos parâmetros da URL

  return (
    <Box sx={{ height: '100%' }}>
      {chatId ? (
        <PrivateChat chatId={chatId} onBack={() => navigate(-1)} />
      ) : (
        <h1>Chat não encontrado</h1>
      )}
    </Box>
  )
}

export default ChatPage
