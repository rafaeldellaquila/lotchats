import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Avatar
} from '@mui/material'
import { useState } from 'react'

const CreateGroupChatModal: React.FC<{
  open: boolean
  onClose: () => void
}> = ({ open, onClose }) => {
  const [groupName, setGroupName] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [avatar, setAvatar] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>(
    undefined
  )

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput])
      setTagInput('')
    }
  }

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter(tag => tag !== tagToDelete))
  }

  const handleGroupNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setGroupName(event.target.value)
  }

  const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(event.target.value)
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setAvatar(file)
      const reader = new FileReader()
      reader.onload = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    console.log('Group Name:', groupName)
    console.log('Tags:', tags)
    // implementar formulario
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create Group</DialogTitle>
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
            Upload Avatar
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
            label='Group Name'
            type='text'
            fullWidth
            variant='outlined'
            value={groupName}
            onChange={handleGroupNameChange}
          />
          <TextField
            margin='dense'
            id='tagInput'
            label='Tags'
            type='text'
            fullWidth
            variant='outlined'
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyDown={event => event.key === 'Enter' && handleAddTag()}
            helperText='Press enter to add a tag'
          />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onDelete={() => handleDeleteTag(tag)}
              />
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateGroupChatModal
