import { Box, Typography } from '@mui/material'

const HomeBanner: React.FC = () => {
  return (
    <Box sx={{ paddingY: 2, paddingX: 4 }}>
      <Typography variant='h1' sx={{ mb: 2 }}>
        Olá!
      </Typography>
      <Typography variant='body1' fontWeight='bold' sx={{ maxWidth: '25rem' }}>
        Navegue pelo Discover para encontrar grupos ou busque grupos ou um
        usuário na lupa!
      </Typography>
    </Box>
  )
}

export default HomeBanner
