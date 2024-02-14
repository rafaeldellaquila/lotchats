import { useMediaQuery as mediaQuery, useTheme as theme } from '@mui/material'

export const useMediaQuery = (): [boolean] => {
  const isLargeScreen = mediaQuery(theme().breakpoints.up('lg'))
  return [isLargeScreen]
}
