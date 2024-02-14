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
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { auth } from '@/firebase'

const CreateGroupChatModal: React.FC<{
  open: boolean
  onClose: () => void
}> = ({ open, onClose }) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
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

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      alert(t('provide_group_name'))
      return
    }

    let avatarUrl = ''
    if (avatar) {
      try {
        const storage = getStorage()
        const storageRef = ref(
          storage,
          `group_avatars/${avatar.name}_${Date.now()}`
        )
        await uploadBytes(storageRef, avatar)
        avatarUrl = await getDownloadURL(storageRef)
      } catch (error) {
        console.error('Error uploading avatar:', error)
        alert(t('upload_error'))
        return
      }
    }

    const currentUserUid = auth.currentUser?.uid
    if (!currentUserUid) {
      console.error('No current user UID found')
      alert(t('user_error'))
      return
    }

    const userDocRef = doc(getFirestore(), 'users', currentUserUid)
    const userDocSnap = await getDoc(userDocRef)

    let creatorAvatarUrl = ''
    let creatorName = ''
    if (userDocSnap.exists()) {
      creatorAvatarUrl = userDocSnap.data().avatarUrl || ''
      creatorName = userDocSnap.data().name || ''
    } else {
      console.error('Creator user document not found')
    }
    const db = getFirestore()

    try {
      const groupDocRef = await addDoc(collection(db, 'groups'), {
        name: groupName,
        description: groupDescription,
        avatarUrl: avatarUrl,
        createdAt: serverTimestamp(),
        members: [
          {
            id: currentUserUid,
            isAdmin: true,
            avatarUrl: creatorAvatarUrl,
            name: creatorName
          }
        ]
      })

      const userDocRef = doc(db, 'users', currentUserUid)
      await getDoc(userDocRef).then(docSnap => {
        if (docSnap.exists()) {
          const existingGroups = docSnap.data().groups || []
          const updatedGroups = [...existingGroups, groupDocRef.id]
          updateDoc(userDocRef, {
            groups: updatedGroups
          })
        }
      })

      onClose()
      navigate(`/groupchat/${groupDocRef.id}`)
    } catch (error) {
      console.error('Error creating group:', error)
      alert(t('creation_error'))
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('create_group')}</DialogTitle>
      <DialogContent>
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
          <Button variant='contained' component='label' sx={{ mb: 2 }}>
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
      <DialogActions>
        <Button onClick={onClose}>{t('cancel')}</Button>
        <Button onClick={handleCreateGroup}>{t('create')}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateGroupChatModal
