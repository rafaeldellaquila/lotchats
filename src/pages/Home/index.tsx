import { Button } from '@mantine/core'

import AvatarList from '@/components/AvatarList'
import ChatCard from '@/components/ChatCard'
import SearchModal from '@/components/SearchModal'
import { useToggle } from '@/hooks/utils/useToggle'
import Navbar from '@components/Navbar'

const Home: React.FC = () => {
  const [isDrawerOpen, toggleDrawer] = useToggle()
  const [isSearchModalOpen, toggleSearchModal] = useToggle()

  return (
    <div className='home-container'>
      <Navbar onMenuClick={toggleDrawer} onSearchClick={toggleSearchModal} />
      <AvatarList />
      <section className='chat-section'>
        <h2>Chat Privado</h2>
        <ChatCard />
        <ChatCard />
        <Button>Ver todas</Button>
      </section>
      <section className='group-section'>
        <h2>Grupos</h2>
        <ChatCard />
        <ChatCard />
        <Button>Ver todas</Button>
      </section>
      <SearchModal opened={isSearchModalOpen} onClose={toggleSearchModal} />
    </div>
  )
}

export default Home
