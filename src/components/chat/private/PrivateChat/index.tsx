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
import { useEffect, useRef, useState } from 'react'

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
  const [receiverContact, setReceiverContact] = useState<{
    name: string
    avatarUrl: string
  }>({
    name: '',
    avatarUrl: ''
  })

  console.log(chatId)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (!chatId) return

    const chatRef = doc(db, `chats`, chatId)
    const messagesRef = collection(db, `chats/${chatId}/messages`)
    const q = query(messagesRef, orderBy('timestamp', 'asc'))

    const unsubscribe = onSnapshot(q, querySnapshot => {
      const fetchedMessages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MessageProps[]

      setMessages(fetchedMessages)
    })

    getDoc(chatRef)
      .then(docSnap => {
        if (docSnap.exists()) {
          const chatData = docSnap.data()
          const members = chatData.members || []

          const localReceiverId = members.find(
            (id: string) => id !== auth.currentUser?.uid
          )

          if (localReceiverId) {
            const receiverRef = doc(db, 'users', localReceiverId)
            getDoc(receiverRef)
              .then(userSnap => {
                if (userSnap.exists()) {
                  setReceiverContact({
                    name: userSnap.data().name,
                    avatarUrl: userSnap.data().avatarUrl
                  })
                } else {
                  console.error('Receiver user not found')
                }
              })
              .catch(error => {
                console.error('Error fetching receiver user:', error)
              })
          }
        } else {
          console.error('Chat document not found')
        }
      })
      .catch(error => {
        console.error('Error fetching chat document:', error)
      })

    return () => unsubscribe()
  }, [db, chatId])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <ChatNavBar receiver={receiverContact} onBack={onBack} isGroup={false} />
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          padding: theme.spacing(2),
          '& > *:not(:first-of-type)': {
            marginTop: theme.spacing(1)
          }
        }}
      >
        {messages.map(message => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <Box
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderRadius: '4px',
          border: `2px solid ${theme.palette.primary.main}`,
          margin: 2
        }}
      >
        <ChatInput chatId={chatId} />
      </Box>
    </Box>
  )
}

export default PrivateChat
