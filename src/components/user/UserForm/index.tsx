import { Box, TextField, Button, Avatar, Typography } from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

const UserForm: React.FC = () => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const isRegisterPage = pathname === '/register'
  const isConfigPage = pathname === '/config'

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    celNumber: '',
    password: '',
    confirmPassword: '',
    currentPassword: ''
  })
  const [avatar, setAvatar] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    undefined
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    setAvatar(file)

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setAvatarPreview(undefined)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Implementar lógica de formulário

    console.log(formData)
    if (avatar) {
      console.log(avatar)
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
      <Avatar
        src={avatarPreview}
        sx={{ width: 56, height: 56, mb: 2 }}
        alt='Avatar preview'
      />
      <Button variant='contained' component='label' sx={{ mt: 2 }}>
        {t('upload_avatar')}
        <input
          type='file'
          hidden
          accept='image/*'
          onChange={handleAvatarChange}
        />
      </Button>
      <TextField
        margin='normal'
        required
        fullWidth
        id='name'
        label={t('name')}
        name='name'
        autoComplete='name'
        autoFocus
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        margin='normal'
        required
        fullWidth
        id='email'
        label={t('email')}
        name='email'
        autoComplete='email'
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        margin='normal'
        required
        fullWidth
        id='celNumber'
        label={t('cel_number')}
        name='celNumber'
        autoComplete='tel'
        value={formData.celNumber}
        onChange={handleChange}
      />
      {isRegisterPage || isConfigPage ? (
        <>
          <Typography component='h1' variant='h5'>
            {isRegisterPage ? t('create_your_password') : t('change_password')}
          </Typography>
          {isConfigPage && (
            <TextField
              margin='normal'
              required
              fullWidth
              id='currentPassword'
              label={t('current_password')}
              name='currentPassword'
              type='password'
              autoComplete='current-password'
              value={formData.currentPassword}
              onChange={handleChange}
            />
          )}
          <TextField
            margin='normal'
            required
            fullWidth
            id='password'
            label={isRegisterPage ? t('password') : t('new_password')}
            name='password'
            type='password'
            autoComplete='new-password'
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            id='confirmPassword'
            label={t('confirm_password')}
            name='confirmPassword'
            type='password'
            autoComplete='new-password'
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </>
      ) : null}
      <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
        {t('submit')}
      </Button>
    </Box>
  )
}

export default UserForm
