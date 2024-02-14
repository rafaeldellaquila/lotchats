import { Box, useTheme } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

import ChatInput from '../../shared/ChatInput'
import ChatNavBar from '../../shared/ChatNavBar'
import MessageBubble from '../../shared/MessageBubble'

import { GroupProps, MessageProps } from '@/@types/common'
import { useGroupInfo } from '@/hooks/useGroupInfo'
import { fetchGroupMessages } from '@/hooks/useGroupMessages'

interface GroupChatProps {
  groupId: string
  onBack: () => void
}

const GroupChat: React.FC<GroupChatProps> = ({ groupId, onBack }) => {
  const theme = useTheme()
  const { fetchGroupInfo } = useGroupInfo()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<MessageProps[]>([])
  const [groupInfo, setGroupInfo] =
    useState<Pick<GroupProps, 'name' | 'avatarUrl' | 'members'>>()

  useEffect(() => {
    fetchGroupInfo(groupId).then(res => {
      setGroupInfo(res)
    })
  }, [groupId, fetchGroupInfo])

  useEffect(() => {
    const unsubscribe = fetchGroupMessages(groupId, setMessages)
    return () => unsubscribe()
  }, [groupId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (!groupInfo) {
    return <h1>Loading</h1>
  }

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
        members={groupInfo?.members || []}
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
