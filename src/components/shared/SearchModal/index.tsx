import { Search as SearchIcon } from '@mui/icons-material'
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  List,
  ListItem,
  ListItemText
} from '@mui/material'
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore
} from 'firebase/firestore'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { DrawerProps, UserProps } from '@/@types/common'
import { searchModalStyles } from '@/components/shared/Navbar/styles'
import { auth } from '@/firebase'

const SearchModal: React.FC<DrawerProps> = ({ open, onClose }) => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<UserProps[]>([])
  const currentUserEmail = auth.currentUser?.email
  const db = getFirestore()

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSearchSubmit = async () => {
    if (!searchTerm.trim()) return
    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('email', '==', searchTerm.toLowerCase()))
    const querySnapshot = await getDocs(q)
    console.log(querySnapshot)
    const results: UserProps[] = []
    querySnapshot.forEach(doc => {
      const userData = doc.data()
      console.log('userData', userData)
      if (userData.email.toLowerCase() !== currentUserEmail?.toLowerCase()) {
        results.push({
          id: doc.id,
          name: userData.name,
          email: userData.email,
          celNumber: userData.celNumber,
          avatarUrl: userData.avatarUrl
        })
      }
    })
    console.log(results)
    setSearchResults(results)
    // onClose();
  }

  return (
    <Modal open={open} onClose={onClose} aria-labelledby='search-modal'>
      <Box sx={searchModalStyles}>
        <FormControl
          sx={{ m: 1, width: '100%' }}
          variant='outlined'
          size='small'
        >
          <InputLabel htmlFor='adornment-search'>{t('search')}</InputLabel>
          <OutlinedInput
            id='adornment-search'
            type='text'
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={event => {
              if (event.key === 'Enter') {
                event.preventDefault()
                handleSearchSubmit()
              }
            }}
            label={t('search')}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton edge='end' onClick={handleSearchSubmit}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <List>
          {searchResults.map(user => (
            <ListItem key={user.id}>
              <ListItemText primary={user.name || user.email} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Modal>
  )
}

export default SearchModal
