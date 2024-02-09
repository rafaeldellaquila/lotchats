import { Send as SendIcon } from '@mui/icons-material'
import { Box, IconButton, InputBase } from '@mui/material'
import { useState } from 'react'

const ChatInput: React.FC = () => {
  const [message, setMessage] = useState('')

  const sendMessage = () => {
    console.log(message) // Implementar lógica de mensagens
    setMessage('')
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
      <InputBase
        fullWidth
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder='Message'
        multiline
        maxRows={4}
        sx={{ ml: 1, flex: 1 }}
      />
      <IconButton color='primary' onClick={sendMessage}>
        <SendIcon />
      </IconButton>
    </Box>
  )
}

export default ChatInput
