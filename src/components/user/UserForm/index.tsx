import { Box, TextField, Button, Avatar, Typography } from '@mui/material'
import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential
} from 'firebase/auth'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { ref, getStorage, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { useNavigation } from '@/hooks/utils/useNavigation'

interface FormData {
  name: string
  email: string
  celNumber: string
  password: string
  confirmPassword?: string
  currentPassword?: string
}

const UserForm: React.FC = () => {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const isRegisterPage = pathname === '/register'
  const isConfigPage = pathname === '/config'
  const { handleNavigate } = useNavigation()

  // Inicializações do Firebase
  const auth = getAuth()
  const db = getFirestore()
  const storage = getStorage()

  // Estado do componente
  const [formData, setFormData] = useState<FormData>({
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

  // Manipulação de eventos
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null
    setAvatar(file)

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setAvatarPreview(reader.result as string)
      reader.readAsDataURL(file)
    } else {
      setAvatarPreview(undefined)
    }
  }

  const handleAvatarUpload = async (
    file: File,
    userId: string
  ): Promise<string | null> => {
    const storageRef = ref(storage, `avatars/${userId}/${file.name}`)
    await uploadBytes(storageRef, file)
    return getDownloadURL(storageRef)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match")
      return
    }

    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        )
      const userId = userCredential.user.uid
      const avatarUrl = avatar ? await handleAvatarUpload(avatar, userId) : null

      await setDoc(doc(db, 'users', userId), {
        name: formData.name,
        celNumber: formData.celNumber,
        avatarUrl
      })

      alert('User registered successfully')
      handleNavigate('/')
    } catch (error) {
      console.error(error)
      alert('Error registering user')
    }
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
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
