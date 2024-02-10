import { Search as SearchIcon } from '@mui/icons-material'
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput
} from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { DrawerProps } from '@/@types/common'
import { searchModalStyles } from '@/components/shared/Navbar/styles'

const SearchModal: React.FC<DrawerProps> = ({ open, onClose }) => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleSearchSubmit = () => {
    console.log('Search for:', searchTerm)
    // Adicionar Logica de pesquisa
    onClose()
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
