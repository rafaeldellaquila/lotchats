import { Button } from '@mui/material'

import Navbar from '@components/Navbar'

const Home: React.FC = () => {
  // const [isDrawerOpen, toggleDrawer] = useToggle()
  // const [isSearchModalOpen, toggleSearchModal] = useToggle()

  return (
    <div className='home-container'>
      <Navbar />
      <section className='chat-section'>
        <h2>Chat Privado</h2>

        <Button>Ver todas</Button>
      </section>
      <section className='group-section'>
        <h2>Grupos</h2>
        <Button>Ver todas</Button>
      </section>
    </div>
  )
}

export default Home
