import { Container } from '@mui/material'
import { Outlet } from 'react-router-dom'

const UnauthLayout: React.FC = () => {
  return (
    <Container
      component='main'
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      maxWidth='xl'
    >
      <Outlet />
    </Container>
  )
}

export default UnauthLayout
