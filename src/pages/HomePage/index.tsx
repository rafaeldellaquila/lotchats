import { useTranslation } from 'react-i18next'

import { ChatProps, PreviewChatProps } from '@/@types/common'
import ChatCardList from '@/components/Chat/ChatCardList'
import FavoriteList from '@/components/shared/FavoriteList'

const mockFavoriteProps: ChatProps[] = [
  {
    id: 1,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 2
  },
  {
    id: 2,
    name: 'Jane Doe',
    avatarUrl: undefined,
    unreadCount: 3
  },
  {
    id: 4,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 0
  },
  {
    id: 5,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 0
  },
  {
    id: 6,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 0
  },
  {
    id: 7,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 0
  },
  {
    id: 8,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 0
  },
  {
    id: 9,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 0
  },
  {
    id: 10,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 0
  },
  {
    id: 11,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 0
  }
]

const chats: PreviewChatProps[] = [
  {
    id: 1,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 2,
    messagePreview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in justo arcu. Nullam pellentesque ipsum mattis ligula aliquet consequat.',
    time: '00:00'
  },
  {
    id: 2,
    name: 'Jane Doe',
    avatarUrl: undefined,
    unreadCount: 3,
    messagePreview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in justo arcu. Nullam pellentesque ipsum mattis ligula aliquet consequat.',
    time: '00:00'
  },
  {
    id: 4,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 0,
    messagePreview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in justo arcu. Nullam pellentesque ipsum mattis ligula aliquet consequat.',
    time: '00:00'
  },
  {
    id: 5,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 0,
    messagePreview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in justo arcu. Nullam pellentesque ipsum mattis ligula aliquet consequat.',
    time: '00:00'
  },
  {
    id: 6,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 0,
    messagePreview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in justo arcu. Nullam pellentesque ipsum mattis ligula aliquet consequat.',
    time: '00:00'
  },
  {
    id: 7,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 0,
    messagePreview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in justo arcu. Nullam pellentesque ipsum mattis ligula aliquet consequat.',
    time: '00:00'
  },
  {
    id: 8,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 0,
    messagePreview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in justo arcu. Nullam pellentesque ipsum mattis ligula aliquet consequat.',
    time: '00:00'
  },
  {
    id: 9,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 0,
    messagePreview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in justo arcu. Nullam pellentesque ipsum mattis ligula aliquet consequat.',
    time: '00:00'
  },
  {
    id: 10,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 0,
    messagePreview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in justo arcu. Nullam pellentesque ipsum mattis ligula aliquet consequat.',
    time: '00:00'
  },
  {
    id: 11,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 0,
    messagePreview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in justo arcu. Nullam pellentesque ipsum mattis ligula aliquet consequat.',
    time: '00:00'
  }
]

const HomePage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <FavoriteList FavoriteProps={mockFavoriteProps} maxVisible={10} />
      <ChatCardList title={t('private_chats')} chats={chats} />
      <ChatCardList title={t('group_chats')} chats={chats} />
    </>
  )
}

export default HomePage
