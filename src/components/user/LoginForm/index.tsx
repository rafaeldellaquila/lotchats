import { Box, TextField, Button, Link } from '@mui/material'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useNavigation } from '@/hooks/utils/useNavigation'

const LoginForm: React.FC = () => {
  const { t } = useTranslation()
  const { handleNavigate } = useNavigation()
  const auth = getAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('') // Limpa erros anteriores

    try {
      await signInWithEmailAndPassword(auth, email, password)
      handleNavigate('/home')
    } catch (error) {
      // Trata erros de login
      console.error('Login error:', error)
      setError('Failed to log in. Please check your credentials.')
    }
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
      {error && (
        <Box color='error.main' mt={2}>
          {error}
        </Box>
      )}
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
