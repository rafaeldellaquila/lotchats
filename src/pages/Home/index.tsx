import { Box, Button } from '@mui/material'

import { Favorite } from '@/@types/common'
import FavoritesList from '@/components/shared/FavoriteList'
import Navbar from '@components/Navbar'

const mockFavorites: Favorite[] = [
  {
    id: 1,
    name: 'John Doe',
    avatarUrl: undefined,
    notificationCount: 2
  },
  {
    id: 2,
    name: 'Jane Doe',
    avatarUrl: undefined,
    notificationCount: 3
  },
  {
    id: 4,
    name: 'John Doe',
    avatarUrl: undefined
  },
  {
    id: 5,
    name: 'John Doe',
    avatarUrl: undefined
  },
  {
    id: 6,
    name: 'John Doe',
    avatarUrl: undefined
  },
  {
    id: 7,
    name: 'John Doe',
    avatarUrl: undefined
  },
  {
    id: 8,
    name: 'John Doe',
    avatarUrl: undefined
  },
  {
    id: 9,
    name: 'John Doe',
    avatarUrl: undefined
  },
  {
    id: 10,
    name: 'John Doe',
    avatarUrl: undefined
  },
  {
    id: 11,
    name: 'John Doe',
    avatarUrl: undefined
  }
]

const Home: React.FC = () => {
  return (
    <Box className='home-container' sx={{ width: '100%' }}>
      <Navbar />
      <FavoritesList favorites={mockFavorites} maxVisible={10} />
      <section className='chat-section'>
        <h2>Chat Privado</h2>

        <Button>Ver todas</Button>
      </section>
      <section className='group-section'>
        <h2>Grupos</h2>
        <Button>Ver todas</Button>
      </section>
    </Box>
  )
}

export default Home
