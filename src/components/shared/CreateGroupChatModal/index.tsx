import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Avatar
} from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { useCreateGroup } from '@/hooks/useCreateGroup'

const CreateGroupChatModal: React.FC<{
  open: boolean
  onClose: () => void
}> = ({ open, onClose }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { createGroup } = useCreateGroup()
  const [groupName, setGroupName] = useState('')
  const [groupDescription, setGroupDescription] = useState('')
  const [avatar, setAvatar] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    undefined
  )

  const handleGroupNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGroupName(event.target.value)
  }

  const handleGroupDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGroupDescription(event.target.value)
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null
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

  const handleCreateGroupClick = async () => {
    try {
      const groupId = await createGroup(groupName, groupDescription, avatar)
      onClose()
      navigate(`/groupchat/${groupId}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ backgroundColor: 'common.white' }}>
        {t('create_group')}
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: 'common.white' }}>
        <Box
          component='form'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 1
          }}
          noValidate
          autoComplete='off'
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Avatar src={avatarPreview} sx={{ width: 56, height: 56 }} />
          </Box>
          <Button component='label' sx={{ mb: 2 }} variant='outlined'>
            {t('upload_avatar')}
            <input
              type='file'
              hidden
              accept='image/*'
              onChange={handleAvatarChange}
            />
          </Button>
          <TextField
            margin='dense'
            id='groupName'
            label={t('group_name')}
            type='text'
            fullWidth
            variant='outlined'
            value={groupName}
            onChange={handleGroupNameChange}
          />
          <TextField
            margin='dense'
            id='groupDescription'
            label={t('group_description')}
            type='text'
            fullWidth
            required
            variant='outlined'
            value={groupDescription}
            onChange={handleGroupDescriptionChange}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: 'common.white' }}>
        <Button onClick={onClose} color='error'>
          {t('cancel')}
        </Button>
        <Button variant='contained' onClick={handleCreateGroupClick}>
          {t('create')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateGroupChatModal
