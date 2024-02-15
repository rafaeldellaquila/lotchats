import { Send as SendIcon } from '@mui/icons-material'
import { Box, IconButton, TextField } from '@mui/material'
import {
  addDoc,
  collection,
  getFirestore,
  serverTimestamp
} from 'firebase/firestore'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { auth } from '@/firebase'
import { useUserName } from '@/hooks/useUserName'

interface ChatInputProps {
  chatId: string
  isGroup?: boolean
}

const ChatInput: React.FC<ChatInputProps> = ({ chatId, isGroup = false }) => {
  const [message, setMessage] = useState('')
  const senderName = useUserName()
  const { t } = useTranslation()

  const sendMessage = async () => {
    if (message.trim() === '') return

    const db = getFirestore()
    const messagesRef = collection(
      db,
      `${isGroup ? 'groups' : 'chats'}/${chatId}/messages`
    )
    await addDoc(messagesRef, {
      text: message,
      senderId: auth.currentUser?.uid,
      senderName,
      timestamp: serverTimestamp(),
      ...(isGroup && { isGroupMessage: true })
    })

    setMessage('')
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage()
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
      <TextField
        fullWidth
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder={t('type_message')}
        onKeyDown={handleKeyPress}
        multiline
        color='primary'
        maxRows={4}
        sx={{ ml: 1, flex: 1 }}
        variant='standard'
      />
      <IconButton color='primary' onClick={sendMessage}>
        <SendIcon />
      </IconButton>
    </Box>
  )
}

export default ChatInput
