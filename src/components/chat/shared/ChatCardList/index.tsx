import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import GroupChatCard from '../../group/GroupChatCard'
import PrivateChatCard from '../../private/PrivateChatCard'

import { PreviewChatProps } from '@/@types/common'

interface ChatCardListProps {
  title: string
  chats: PreviewChatProps[]
}

const ChatCardList: React.FC<ChatCardListProps> = ({ chats, title }) => {
  const { t } = useTranslation()
  const [visibleCount, setVisibleCount] = useState(3)
  const initialState = 3

  const handleLoadChats = () => {
    setVisibleCount(prevCount =>
      prevCount >= chats.length ? initialState : prevCount + 3
    )
  }

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      {chats.length > 0 && (
        <Typography variant='h1' fontWeight='600' sx={{ mb: 2 }}>
          {title}
        </Typography>
      )}
      {chats.slice(0, visibleCount).map(chat => {
        if (chat.isGroup) {
          return (
            <GroupChatCard
              key={chat.id}
              id={chat.id}
              avatarUrl={chat.avatarUrl}
              name={chat.name}
              description={chat.description}
              members={chat.members!}
            />
          )
        } else {
          return (
            <PrivateChatCard
              key={chat.id}
              id={chat.id}
              avatarUrl={chat.avatarUrl}
              name={chat.name}
              messagePreview={chat.messagePreview}
            />
          )
        }
      })}
      {chats.length > 3 && (
        <Button onClick={handleLoadChats} variant='outlined'>
          {visibleCount >= chats.length ? t('see_less') : t('see_more')}
        </Button>
      )}
    </Box>
  )
}

export default ChatCardList
