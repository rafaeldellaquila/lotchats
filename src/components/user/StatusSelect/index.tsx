import {
  Select,
  MenuItem,
  Chip,
  FormControl,
  SelectChangeEvent,
  Typography,
  OutlinedInput
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { setStatus } from '@/redux/slices/statusSlice'
import { RootState } from '@/redux/store'

const StatusSelect: React.FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const status = useSelector((state: RootState) => state.status.value)

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setStatus(event.target.value as string))
  }

  const statusColors: {
    [key: string]: 'success' | 'warning' | 'error' | 'default'
  } = {
    ONLINE: 'success',
    AWAY: 'warning',
    BUSY: 'error',
    OFFLINE: 'default'
  }

  return (
    <FormControl variant='outlined' fullWidth sx={{ px: '1rem' }} size='small'>
      <Typography fontWeight='600' variant='body2'>
        {t('status')}
      </Typography>
      <Select
        labelId='select-label'
        id='select'
        size='small'
        value={t(status).toUpperCase()}
        onChange={handleChange}
        input={<OutlinedInput />}
        sx={{
          fieldset: {
            borderColor: 'primary.main'
          }
        }}
        renderValue={selected => {
          return (
            <Chip
              size='small'
              label={t(selected).toUpperCase()}
              color={statusColors[selected]}
              sx={{ width: '100%' }}
            />
          )
        }}
      >
        {Object.keys(statusColors).map(statusKey => (
          <MenuItem key={statusKey} value={statusKey.toUpperCase()}>
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
