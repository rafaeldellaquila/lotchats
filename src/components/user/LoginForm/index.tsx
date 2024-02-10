import { Box, TextField, Button, Link } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const LoginForm: React.FC = () => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Implementar lógica de login
    console.log({ email, password })
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      noValidate
      sx={{
        mt: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <TextField
        margin='normal'
        required
        fullWidth
        id='email'
        label={t('email')}
        name='email'
        autoComplete='email'
        autoFocus
        value={email}
        onChange={handleEmailChange}
      />
      <TextField
        margin='normal'
        required
        fullWidth
        name='password'
        label={t('password')}
        type='password'
        id='password'
        autoComplete='current-password'
        value={password}
        onChange={handlePasswordChange}
      />
      <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
        {t('login')}
      </Button>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
      >
        <Link href='/register' variant='body2'>
          {t('register')}
        </Link>
        <Link href='/forgot-password' variant='body2'>
          {t('forgot_password')}
        </Link>
      </Box>
    </Box>
  )
}

export default LoginForm
