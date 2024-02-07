import {
  Select,
  MenuItem,
  Chip,
  FormControl,
  SelectChangeEvent,
  Typography
} from '@mui/material'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const StatusSelect: React.FC = () => {
  const { t } = useTranslation()
  const [status, setStatus] = useState('')

  const handleChange = (event: SelectChangeEvent<string>) =>
    setStatus(event.target.value)

  const statusColors: {
    [key: string]: 'success' | 'warning' | 'error' | 'default'
  } = {
    online: 'success',
    away: 'warning',
    busy: 'error',
    offline: 'default'
  }

  return (
    <FormControl variant='outlined' fullWidth sx={{ px: '1rem' }} size='small'>
      <Typography></Typography>
      <Select
        labelId='select-label'
        id='select'
        value={t(status).toUpperCase()}
        onChange={handleChange}
      >
        {Object.keys(statusColors).map(statusKey => (
          <MenuItem key={statusKey} value={statusKey}>
            <Chip
              size='small'
              label={t(statusKey).toUpperCase()}
              color={statusColors[statusKey]}
              sx={{ width: '100%' }}
            />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default StatusSelect
