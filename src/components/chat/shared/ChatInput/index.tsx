import { Send as SendIcon } from '@mui/icons-material'
import { Box, IconButton, InputBase } from '@mui/material'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  serverTimestamp
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { auth } from '@/firebase'

const ChatInput: React.FC<{ chatId: string; isGroup?: boolean }> = ({
  chatId,
  isGroup = false
}) => {
  const db = getFirestore()
  const { t } = useTranslation()
  const [message, setMessage] = useState('')
  const [senderName, setSenderName] = useState('')

  const sendMessage = async () => {
    if (message.trim() === '') return

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

  useEffect(() => {
    const fetchUserName = async () => {
      const userAuth = auth.currentUser
      if (userAuth) {
        const userRef = doc(db, 'users', userAuth.uid)
        const docSnap = await getDoc(userRef)
        if (docSnap.exists()) {
          setSenderName(docSnap.data().name)
        } else {
          console.error(t('user_not_found'))
        }
      }
    }

    fetchUserName()
  }, [db, t])

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', padding: '8px' }}>
      <InputBase
        fullWidth
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder='Message'
        onKeyDown={handleKeyPress}
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
