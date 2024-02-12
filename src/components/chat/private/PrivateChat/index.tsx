import { Box, useTheme } from '@mui/material'
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  orderBy,
  query
} from 'firebase/firestore'
import { useEffect, useState } from 'react'

import ChatInput from '../../shared/ChatInput'
import ChatNavBar from '../../shared/ChatNavBar'
import MessageBubble from '../../shared/MessageBubble'

import { MessageProps } from '@/@types/common'
import { auth } from '@/firebase'

interface ChatProps {
  chatId: string
  onBack: () => void
}

const PrivateChat: React.FC<ChatProps> = ({ chatId, onBack }) => {
  const db = getFirestore()
  const theme = useTheme()
  const [messages, setMessages] = useState<MessageProps[]>([])
  const [receiverName, setReceiverName] = useState<string>('')
  const [receiverId, setReceiverId] = useState<string>('')

  useEffect(() => {
    const chatRef = doc(db, `chats`, chatId)
    getDoc(chatRef).then(docSnap => {
      if (docSnap.exists()) {
        const chatData = docSnap.data()
        const members = chatData.members || []
        const receiverId = members.find(
          (p: string) => p !== auth.currentUser?.uid
        )

        if (receiverId) {
          const receiverRef = doc(db, 'users', receiverId)
          getDoc(receiverRef).then(userSnap => {
            if (userSnap.exists()) {
              console.log('userSnap.data()', userSnap.data())
              setReceiverName(userSnap.data().name)
              setReceiverId(receiverId)
            }
          })
        }
      }
    })

    const messagesRef = collection(db, `chats/${chatId}/messages`)
    const q = query(messagesRef, orderBy('timestamp', 'asc'))

    const unsubscribe = onSnapshot(q, querySnapshot => {
      const fetchedMessages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MessageProps[]
      setMessages(fetchedMessages)
    })

    return () => unsubscribe()
  }, [db, chatId])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%'
      }}
    >
      <ChatNavBar receiver={receiverName} onBack={onBack} isGroup={false} />
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
          <MessageBubble key={message.id} message={message} />
        ))}
      </Box>
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: '4px',
          border: `2px solid ${theme.palette.primary.main}`,
          m: 2
        }}
      >
        <ChatInput chatId={receiverId} />
      </Box>
    </Box>
  )
}

export default PrivateChat
