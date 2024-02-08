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
import { useTranslation } from 'react-i18next'

import { searchModalStyles } from '../styles'

import { IDrawer } from '@/@types/common'

const SearchModal: React.FC<IDrawer> = ({ isOpen, toggle }) => {
  const { t } = useTranslation()

  return (
    <Modal open={isOpen} onClose={toggle} aria-labelledby='search-modal'>
      <Box sx={searchModalStyles}>
        <FormControl sx={{ m: 1 }} variant='outlined' size='small'>
          <InputLabel htmlFor='adornment-search'>{t('search')}</InputLabel>
          <OutlinedInput
            id='adornment-search'
            label={t('search')}
            sx={{
              fieldset: {
                borderColor: 'primary.main'
              }
            }}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton edge='end'>
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
