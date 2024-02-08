import { Box, Button, Typography } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import ChatCard from '../ChatCard'

import { PreviewChatProps } from '@/@types/common'

interface ChatCardListProps {
  title: string
  chats: PreviewChatProps[]
}

const ChatCardList: React.FC<ChatCardListProps> = ({ chats, title }) => {
  const { t } = useTranslation()
  const [visibleCount, setVisibleCount] = useState(3)
  const initialState = 3 // Estado inicial do número de chats visíveis

  const showMoreOrLessChats = () => {
    if (visibleCount >= chats.length) {
      setVisibleCount(initialState) // Se já estiverem todos visíveis, volta para o estado inicial
    } else {
      setVisibleCount(prevCount => prevCount + 3) // Caso contrário, mostra mais 3 chats
    }
  }

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h1' fontWeight='600' sx={{ mb: 2 }}>
        {title}
      </Typography>
      {chats.slice(0, visibleCount).map(chat => (
        <ChatCard
          id={chat.id}
          key={chat.id}
          avatarUrl={chat.avatarUrl}
          name={chat.name}
          messagePreview={chat.messagePreview}
          unreadCount={chat.unreadCount}
          time={chat.time}
        />
      ))}
      <Button onClick={showMoreOrLessChats} variant='outlined'>
        {visibleCount >= chats.length ? t('see_less') : t('see_all')}
      </Button>
    </Box>
  )
}

export default ChatCardList
