import { Send as SendIcon } from '@mui/icons-material'
import { Box, IconButton, InputBase } from '@mui/material'
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp
} from 'firebase/firestore'
import { useState } from 'react'

import { auth } from '@/firebase'

const ChatInput: React.FC<{ chatId: string }> = ({ chatId }) => {
  const [message, setMessage] = useState('')
  const db = getFirestore()

  const sendMessage = async () => {
    if (message.trim() === '') return
    const messagesRef = collection(db, `chats/${chatId}/messages`)
    await addDoc(messagesRef, {
      text: message,
      senderId: auth.currentUser?.uid,
      timestamp: serverTimestamp()
    })
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
