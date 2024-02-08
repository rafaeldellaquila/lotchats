import { Box, Button } from '@mui/material'

import { ChatProps } from '@/@types/common'
import FavoriteList from '@/components/shared/FavoriteList'
import Navbar from '@components/Navbar'

const mockFavoritePropss: ChatProps[] = [
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

const Home: React.FC = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Navbar />
      <FavoriteList FavoriteProps={mockFavoritePropss} maxVisible={10} />
      <section>
        <h2>Chat Privado</h2>
        <Button>Ver todas</Button>
      </section>
      <section>
        <h2>Grupos</h2>
        <Button>Ver todas</Button>
      </section>
    </Box>
  )
}

export default Home
