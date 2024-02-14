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
  getFirestore,
  Timestamp
} from 'firebase/firestore'
import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { searchModalStyles } from '../Navbar/styles'

import { DrawerProps, GroupProps, UserProps } from '@/@types/common'
import { setSearchResults } from '@/redux/slices/searchSlice'

const SearchModal: React.FC<DrawerProps> = ({ open, onClose }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const navigate = useNavigate()

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value)
  }

  const handleSearchSubmit = async (): Promise<void> => {
    if (!searchTerm.trim()) return

    const db = getFirestore()

    const usersQuery = searchTerm.includes('@')
      ? query(
          collection(db, 'users'),
          where('email', '==', searchTerm.toLowerCase())
        )
      : query(
          collection(db, 'users'),
          where('name', '>=', searchTerm),
          where('name', '<=', searchTerm + '\uf8ff')
        )

    const groupsQuery = query(
      collection(db, 'groups'),
      where('name', '>=', searchTerm),
      where('name', '<=', searchTerm + '\uf8ff')
    )

    try {
      const [usersDocs, groupsDocs] = await Promise.all([
        getDocs(usersQuery),
        getDocs(groupsQuery)
      ])

      const foundUsers = usersDocs.docs.map(doc => ({
        ...(doc.data() as UserProps)
      }))
      const foundGroups = groupsDocs.docs.map(doc => {
        const data = doc.data() as GroupProps
        const day = (data?.createdAt as Timestamp).toDate().toISOString()

        return {
          ...data,
          id: doc.id,
          createdAt: day
        }
      })

      console.log({
        privateChats: foundUsers,
        groupChats: foundGroups
      })

      dispatch(
        setSearchResults({
          privateChats: foundUsers,
          groupChats: foundGroups
        })
      )
      navigate('/discover')
      onClose?.()
    } catch (error) {
      console.error(t('search_error'), error)
    }
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
            autoFocus
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
