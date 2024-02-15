import { Box, Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import GroupChatCard from '../../group/GroupChatCard'
import PrivateChatCard from '../../private/PrivateChatCard'

import { ChatCardListProps, PreviewChatProps } from '@/@types/common'

const ChatCardList: React.FC<ChatCardListProps> = ({ chats, title }) => {
  const { t } = useTranslation()
  const [visibleCount, setVisibleCount] = useState(3)
  const [groups, setGroups] = useState<PreviewChatProps[]>([])
  const [users, setUsers] = useState<PreviewChatProps[]>([])

  useEffect(() => {
    const groups = chats.filter(chat => chat.isGroup)
    const users = chats.filter(chat => !chat.isGroup)
    setGroups(groups)
    setUsers(users)
    console.log('groups', groups)
    console.log('users', users)
  }, [chats])

  const handleLoadChats = () => {
    setVisibleCount(prevCount => prevCount + 3)
  }

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      {title && (
        <Typography variant='h1' fontWeight='600' sx={{ mb: 2 }}>
          {title}
        </Typography>
      )}
      {users.slice(0, visibleCount).map(chat => (
        <PrivateChatCard
          key={chat.id}
          id={chat.id}
          avatarUrl={chat.avatarUrl}
          name={chat.name}
          messagePreview={chat.messagePreview}
        />
      ))}
      {groups.slice(0, visibleCount).map(chat => (
        <GroupChatCard
          key={chat.id}
          id={chat.id}
          avatarUrl={chat.avatarUrl}
          name={chat.name}
          description={chat.description!}
          members={chat.members!}
        />
      ))}
      {(users.length > 3 || groups.length > 3) && (
        <Button onClick={handleLoadChats} variant='outlined'>
          {visibleCount >= chats.length ? t('see_less') : t('see_more')}
        </Button>
      )}
    </Box>
  )
}

export default ChatCardList
