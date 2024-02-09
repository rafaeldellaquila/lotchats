import { useTranslation } from 'react-i18next'

import { GroupChatProps } from '@/@types/common'
import ChatCardList from '@/components/Chat/ChatCardList'

const chats: GroupChatProps[] = [
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
        celNumber: '1198327312'
      },
      {
        name: 'Xulia',
        id: 2,
        email: 'Xulia@email.com',
        avatarUrl: undefined,
        celNumber: '11932817312'
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
        avatarUrl: undefined,
        celNumber: '11922396312'
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
  }
]

const DiscoverPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <ChatCardList title={t('group_chats')} chats={chats} />
    </>
  )
}

export default DiscoverPage
