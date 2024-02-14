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

interface GroupChatProps {
  groupId: string
  onBack: () => void
}

const GroupChat: React.FC<GroupChatProps> = ({ groupId, onBack }) => {
  const db = getFirestore()
  const theme = useTheme()
  const [messages, setMessages] = useState<MessageProps[]>([])
  const [groupInfo, setGroupInfo] = useState({
    name: '',
    avatarUrl: '',
    members: []
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (!groupId) return

    const groupRef = doc(db, 'groups', groupId)

    // Fetch group info and members
    getDoc(groupRef).then(docSnap => {
      if (docSnap.exists()) {
        const data = docSnap.data()
        setGroupInfo({
          name: data.name,
          avatarUrl: data.avatarUrl,
          members: data.members || []
        })
      } else {
        console.error('Group document not found')
      }
    })

    const messagesRef = collection(db, `groups/${groupId}/messages`)
    const q = query(messagesRef, orderBy('timestamp', 'asc'))

    const unsubscribe: () => void = onSnapshot(q, querySnapshot => {
      const fetchedMessages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MessageProps[]

      setMessages(fetchedMessages)
    })

    return () => unsubscribe()
  }, [db, groupId])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <ChatNavBar
        receiver={groupInfo}
        onBack={onBack}
        isGroup={true}
        members={groupInfo.members}
      />
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
          <MessageBubble key={message.id} message={message} isGroup />
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <ChatInput chatId={groupId} isGroup />
    </Box>
  )
}

export default GroupChat
