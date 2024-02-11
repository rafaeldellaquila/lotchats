import { TypographyProps } from '@mui/material/Typography'

export const primaryTypographyStyles = (
  options?: Partial<TypographyProps<'span', { component?: 'span' }>>
): TypographyProps<'span', { component?: 'span' }> => {
  return {
    variant: 'body1',
    color: 'grey.100',
    fontWeight: 600,
    style: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    },
    ...options
  }
}

export const searchModalStyles = {
  bgcolor: 'common.white',
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  p: 4,
  m: 4
}
