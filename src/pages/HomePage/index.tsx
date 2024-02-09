import { useTranslation } from 'react-i18next'

import { ChatProps, GroupChatProps, PreviewChatProps } from '@/@types/common'
import ChatCardList from '@/components/Chat/ChatCardList'
import FavoriteList from '@/components/shared/FavoriteList'

const mockFavoriteProps: ChatProps[] = [
  {
    id: 1,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 2,
    email: 'john@doe.com',
    celNumber: '11922396312'
  },
  {
    id: 2,
    name: 'Jane Doe',
    avatarUrl: undefined,
    unreadCount: 3,
    email: 'john@doe.com',
    celNumber: '11922396312'
  },
  {
    id: 4,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 0,
    email: 'john@doe.com',
    celNumber: '11922396312'
  },
  {
    id: 5,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 0,
    email: 'john@doe.com',
    celNumber: '11922396312'
  },
  {
    id: 6,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 0,
    email: 'john@doe.com',
    celNumber: '11922396312'
  },
  {
    id: 7,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 0,
    email: 'john@doe.com',
    celNumber: '11922396312'
  },
  {
    id: 8,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 0,
    email: 'john@doe.com',
    celNumber: '11922396312'
  },
  {
    id: 9,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 0,
    email: 'john@doe.com',
    celNumber: '11922396312'
  },
  {
    id: 10,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 0,
    email: 'john@doe.com',
    celNumber: '11922396312'
  },
  {
    id: 11,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 0,
    email: 'john@doe.com',
    celNumber: '11922396312'
  }
]

const chats: PreviewChatProps[] = [
  {
    isGroupChat: false,
    id: 1,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 2,
    messagePreview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in justo arcu. Nullam pellentesque ipsum mattis ligula aliquet consequat.',
    time: '00:00'
  },
  {
    isGroupChat: false,
    id: 2,
    name: 'Jane Doe',
    avatarUrl: undefined,
    unreadCount: 3,
    messagePreview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in justo arcu. Nullam pellentesque ipsum mattis ligula aliquet consequat.',
    time: '00:00'
  },
  {
    isGroupChat: false,
    id: 4,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 0,
    messagePreview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in justo arcu. Nullam pellentesque ipsum mattis ligula aliquet consequat.',
    time: '00:00'
  },
  {
    isGroupChat: false,
    id: 5,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 0,
    messagePreview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in justo arcu. Nullam pellentesque ipsum mattis ligula aliquet consequat.',
    time: '00:00'
  },
  {
    isGroupChat: false,
    id: 6,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 0,
    messagePreview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in justo arcu. Nullam pellentesque ipsum mattis ligula aliquet consequat.',
    time: '00:00'
  },
  {
    isGroupChat: false,
    id: 7,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 0,
    messagePreview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in justo arcu. Nullam pellentesque ipsum mattis ligula aliquet consequat.',
    time: '00:00'
  },
  {
    isGroupChat: false,
    id: 8,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 0,
    messagePreview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in justo arcu. Nullam pellentesque ipsum mattis ligula aliquet consequat.',
    time: '00:00'
  },
  {
    isGroupChat: false,
    id: 9,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 0,
    messagePreview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in justo arcu. Nullam pellentesque ipsum mattis ligula aliquet consequat.',
    time: '00:00'
  },
  {
    isGroupChat: false,
    id: 10,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 0,
    messagePreview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in justo arcu. Nullam pellentesque ipsum mattis ligula aliquet consequat.',
    time: '00:00'
  },
  {
    isGroupChat: false,
    id: 11,
    name: 'John Doe',
    avatarUrl: undefined,
    unreadCount: 0,
    messagePreview:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus in justo arcu. Nullam pellentesque ipsum mattis ligula aliquet consequat.',
    time: '00:00'
  }
]

const groupChats: GroupChatProps[] = [
  {
    id: 1,
    isGroupChat: true,
    groupName: 'Equipe Dev',
    avatarUrl: undefined,
    tags: ['desenvolvimento', 'front-end', 'back-end'],
    time: '00:00',
    qtyMember: 3,
    members: [
      {
        name: 'Rafael',
        id: 1,
        email: 'Rafael@email.com',
        avatarUrl: undefined,
        celNumber: '11922396312'
      },
      {
        name: 'Xulia',
        id: 2,
        email: 'Xulia@email.com',
        avatarUrl: undefined,
        celNumber: '11922396312'
      },
      {
        name: 'Eduardo',
        id: 2,
        email: 'Eduardo@email.com',
        avatarUrl: undefined,
        celNumber: '11922396312'
      }
    ]
  },
  {
    id: 2,
    isGroupChat: true,
    groupName: 'Games',
    avatarUrl: undefined,
    tags: ['jogos', 'jogos-online', 'gamers'],
    time: '00:00',
    qtyMember: 3,
    members: [
      {
        name: 'Rafael',
        id: 1,
        email: 'Rafael@email.com',
        avatarUrl: undefined,
        celNumber: '11922396312'
      },
      {
        name: 'Xulia',
        id: 2,
        email: 'Xulia@email.com',
        avatarUrl: undefined,
        celNumber: '11922396312'
      },
      {
        name: 'Eduardo',
        id: 2,
        email: 'Eduardo@email.com',
        avatarUrl: undefined,
        celNumber: '11922396312'
      }
    ]
  },
  {
    id: 4,
    isGroupChat: true,
    groupName: 'Relacionamento',
    avatarUrl: undefined,
    tags: ['relacionamento', 'amizade', 'namoro'],
    time: '00:00',
    qtyMember: 3,
    members: [
      {
        name: 'Rafael',
        id: 1,
        email: 'Rafael@email.com',
        avatarUrl: undefined,
        celNumber: '11922396312'
      },
      {
        name: 'Xulia',
        id: 2,
        email: 'Xulia@email.com',
        avatarUrl: undefined,
        celNumber: '11922396312'
      },
      {
        name: 'Eduardo',
        id: 2,
        email: 'Eduardo@email.com',
        avatarUrl: undefined,
        celNumber: '11922396312'
      }
    ]
  },
  {
    id: 5,
    isGroupChat: true,
    groupName: 'Primeiro emprego',
    avatarUrl: undefined,
    tags: ['estagio', 'trainee', 'junior', 'emprego', 'vagas'],
    time: '00:00',
    qtyMember: 3,
    members: [
      {
        name: 'Rafael',
        id: 1,
        email: 'Rafael@email.com',
        avatarUrl: undefined,
        celNumber: '11922396312'
      },
      {
        name: 'Xulia',
        id: 2,
        email: 'Xulia@email.com',
        avatarUrl: undefined,
        celNumber: '11922396312'
      },
      {
        name: 'Eduardo',
        id: 2,
        email: 'Eduardo@email.com',
        celNumber: '11922396312',
        avatarUrl: undefined
      }
    ]
  },
  {
    id: 6,
    groupName: 'Senhor dos anéis',
    isGroupChat: true,
    avatarUrl: undefined,
    tags: ['filmes', 'livros', 'senhor-dos-aneis'],
    time: '00:00',
    qtyMember: 3,
    members: [
      {
        name: 'Rafael',
        id: 1,
        email: 'Rafael@email.com',
        celNumber: '11922396312',
        avatarUrl: undefined
      },
      {
        name: 'Xulia',
        id: 2,
        email: 'Xulia@email.com',
        celNumber: '11922396312',
        avatarUrl: undefined
      },
      {
        name: 'Eduardo',
        id: 2,
        email: 'Eduardo@email.com',
        celNumber: '11922396312',
        avatarUrl: undefined
      }
    ]
  },
  {
    id: 7,
    groupName: 'Filmes anos 00',
    isGroupChat: true,
    avatarUrl: undefined,
    tags: ['filmes', '2000', 'offtopic'],
    time: '00:00',
    qtyMember: 3,
    members: [
      {
        name: 'Rafael',
        id: 1,
        email: 'Rafael@email.com',
        celNumber: '11922396312',
        avatarUrl: undefined
      },
      {
        name: 'Xulia',
        id: 2,
        email: 'Xulia@email.com',
        celNumber: '11922396312',
        avatarUrl: undefined
      },
      {
        name: 'Eduardo',
        id: 2,
        email: 'Eduardo@email.com',
        celNumber: '11922396312',
        avatarUrl: undefined
      }
    ]
  },
  {
    id: 8,
    groupName: 'Grupo de DIY',
    isGroupChat: true,
    avatarUrl: undefined,
    tags: ['diy', 'casa', 'reforma'],
    time: '00:00',
    qtyMember: 3,
    members: [
      {
        name: 'Rafael',
        id: 1,
        email: 'Rafael@email.com',
        celNumber: '11922396312',
        avatarUrl: undefined
      },
      {
        name: 'Xulia',
        id: 2,
        email: 'Xulia@email.com',
        celNumber: '11922396312',
        avatarUrl: undefined
      },
      {
        name: 'Eduardo',
        id: 2,
        email: 'Eduardo@email.com',
        celNumber: '11922396312',
        avatarUrl: undefined
      }
    ]
  },
  {
    id: 9,
    groupName: 'Viciados em Café',
    isGroupChat: true,
    avatarUrl: undefined,
    tags: ['baristas', 'cafe', 'cafeterias'],
    time: '00:00',
    qtyMember: 3,
    members: [
      {
        name: 'Rafael',
        id: 1,
        email: 'Rafael@email.com',
        celNumber: '11922396312',
        avatarUrl: undefined
      },
      {
        name: 'Xulia',
        id: 2,
        email: 'Xulia@email.com',
        celNumber: '11922396312',
        avatarUrl: undefined
      },
      {
        name: 'Eduardo',
        id: 2,
        email: 'Eduardo@email.com',
        celNumber: '11922396312',
        avatarUrl: undefined
      }
    ]
  },
  {
    id: 10,
    groupName: 'Bairro Jardim Aeroporto',
    isGroupChat: true,
    avatarUrl: undefined,
    tags: ['vizinhanca', 'seguranca', 'eventos'],
    time: '00:00',
    qtyMember: 3,
    members: [
      {
        name: 'Rafael',
        id: 1,
        email: 'Rafael@email.com',
        celNumber: '11922396312',
        avatarUrl: undefined
      },
      {
        name: 'Xulia',
        id: 2,
        email: 'Xulia@email.com',
        celNumber: '11922396312',
        avatarUrl: undefined
      },
      {
        name: 'Eduardo',
        id: 2,
        email: 'Eduardo@email.com',
        celNumber: '11922396312',
        avatarUrl: undefined
      }
    ]
  },
  {
    id: 11,
    groupName: 'Grupo da rua 2',
    isGroupChat: true,
    avatarUrl: undefined,
    tags: ['vizinhança', 'eventos', 'seguranca'],
    time: '00:00',
    qtyMember: 3,
    members: [
      {
        name: 'Rafael',
        id: 1,
        email: 'Rafael@email.com',
        celNumber: '11922396312',
        avatarUrl: undefined
      },
      {
        name: 'Xulia',
        id: 2,
        email: 'Xulia@email.com',
        celNumber: '11922396312',
        avatarUrl: undefined
      },
      {
        name: 'Eduardo',
        id: 2,
        email: 'Eduardo@email.com',
        celNumber: '11922396312',
        avatarUrl: undefined
      }
    ]
  }
]

const HomePage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <FavoriteList FavoriteProps={mockFavoriteProps} maxVisible={10} />
      <ChatCardList title={t('private_chats')} chats={chats} />
      <ChatCardList title={t('group_chats')} chats={groupChats} />
    </>
  )
}

export default HomePage
