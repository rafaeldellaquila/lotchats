import { Box, useTheme } from '@mui/material'
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  getDoc
} from 'firebase/firestore'
import { useEffect, useState, useRef } from 'react'

import ChatInput from '../../shared/ChatInput'
import ChatNavBar from '../../shared/ChatNavBar'
import MessageBubble from '../../shared/MessageBubble'

import { MessageProps, GroupMemberProps } from '@/@types/common'

interface GroupChatProps {
  groupId: string
  onBack: () => void
}

const GroupChat: React.FC<GroupChatProps> = ({ groupId, onBack }) => {
  const db = getFirestore()
  const theme = useTheme()
  const [messages, setMessages] = useState<MessageProps[]>([])
  const [members, setMembers] = useState<GroupMemberProps[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [groupInfos, setGroupInfos] = useState({
    name: '',
    avatarUrl: ''
  })

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (!groupId) return

    const messagesRef = collection(db, `groups/${groupId}/messages`)
    const q = query(messagesRef, orderBy('timestamp', 'asc'))

    const unsubscribeMessages = onSnapshot(q, querySnapshot => {
      const fetchedMessages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as MessageProps[]

      setMessages(fetchedMessages)
    })

    const groupRef = doc(db, 'groups', groupId)
    getDoc(groupRef).then(docSnap => {
      if (docSnap.exists()) {
        const groupData = docSnap.data()
        setMembers(groupData.members || [])
        setGroupInfos({
          name: groupData.name || '',
          avatarUrl: groupData.avatarUrl || ''
        })
      } else {
        console.error('Group document not found')
      }
    })

    return () => {
      unsubscribeMessages()
    }
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
        receiver={groupInfos}
        onBack={onBack}
        members={members}
        isGroup={true}
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
          <MessageBubble key={message.id} message={message} isGroup={true} />
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <ChatInput chatId={groupId} />
    </Box>
  )
}

export default GroupChat
