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
import { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { searchModalStyles } from '../Navbar/styles'

import { useFirestoreQuery } from '@/hooks/useFirestoreQuery'
import { setSearchResults } from '@/redux/slices/searchSlice'

interface SearchModalProps {
  open: boolean
  onClose: () => void
}

const SearchModal: React.FC<SearchModalProps> = ({ open, onClose }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const navigate = useNavigate()
  const { fetchQueryResults } = useFirestoreQuery()

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSearchSubmit = async () => {
    const { users, groups } = await fetchQueryResults(searchTerm)
    dispatch(setSearchResults({ privateChats: users, groupChats: groups }))
    onClose()
    navigate('/discover')
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
            onKeyDown={event => event.key === 'Enter' && handleSearchSubmit()}
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
