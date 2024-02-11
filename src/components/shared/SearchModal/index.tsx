import { Search as SearchIcon, Close as CloseIcon } from '@mui/icons-material'
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput
} from '@mui/material'
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore
} from 'firebase/firestore'
import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { searchModalStyles } from '../Navbar/styles'

import { DrawerProps, UserProps } from '@/@types/common'
import { auth } from '@/firebase'
import { useNavigation } from '@/hooks/utils/useNavigation'
import { setSearchResults } from '@/redux/slices/searchSlice'

const SearchModal: React.FC<DrawerProps> = ({ open, onClose }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const currentUserEmail = auth.currentUser?.email
  const db = getFirestore()
  const { handleNavigate } = useNavigation()

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value)
  }

  const handleSearchSubmit = async (): Promise<void> => {
    if (!searchTerm.trim()) return
    const usersRef = collection(db, 'users')
    const searchQuery = query(
      usersRef,
      where('email', '==', searchTerm.toLowerCase())
    )
    const querySnapshot = await getDocs(searchQuery)

    const results: UserProps[] = querySnapshot.docs
      .map(
        doc =>
          ({
            id: doc.id,
            name: doc.data().name,
            email: doc.data().email,
            avatarUrl: doc.data().avatarUrl,
            celNumber: doc.data().celNumber
          }) as UserProps
      )
      .filter(
        user => user.email.toLowerCase() !== currentUserEmail?.toLowerCase()
      )

    dispatch(setSearchResults(results))
    handleNavigate('/discover')
    onClose?.()
  }

  return (
    <Modal open={open} onClose={onClose} aria-labelledby='search-modal'>
      <Box sx={searchModalStyles}>
        <IconButton
          onClick={onClose}
          sx={{ alignSelf: 'flex-end', p: 0, mb: 4 }}
        >
          <CloseIcon />
        </IconButton>
        <FormControl sx={{ width: '100%' }} variant='outlined' size='small'>
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
      </Box>
    </Modal>
  )
}

export default SearchModal
