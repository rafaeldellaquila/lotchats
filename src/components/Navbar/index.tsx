import { Burger, Avatar } from '@mantine/core'

interface NavbarProps {
  onMenuClick: () => void
  onSearchClick: () => void
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick, onSearchClick }) => {
  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Burger onClick={onMenuClick} />
      {/* Aqui você adicionará o ícone de busca e outros elementos conforme necessário */}
      <Avatar onClick={onSearchClick} size='md' />
    </nav>
  )
}

export default Navbar
