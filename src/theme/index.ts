// src/theme/index.ts
import { MantineTheme, MantineThemeOverride } from '@mantine/core'

const theme: MantineThemeOverride = {
  colors: {
    white: [
      '#FFF5F2',
      '#FFF1F2',
      '#FFF2F5',
      '#F2F5FF',
      '#F2F5FF',
      '#F5F2FF',
      '#F2F5FF',
      '#F5F2FF',
      '#F2FFF5',
      '#F5FFF2'
    ],
    black: [
      '#140400',
      '#1A0400',
      '#140400',
      '#190400',
      '#140400',
      '#140400',
      '#170400',
      '#140400',
      '#140400',
      '#140400'
    ],
    primary: [
      '#A979E6',
      '#A979DF',
      '#B479E6',
      '#A97BE6',
      '#A979E6',
      '#A979E0',
      '#AB79E6',
      '#A979E6',
      '#A979E6',
      '#A979E6'
    ],
    secondary: [
      '#FFD1C4',
      '#FFCFBF',
      '#FFD3C4',
      '#FFD1C0',
      '#FFD1C9',
      '#FFD1C4',
      '#FFD6C4',
      '#FFD1BF',
      '#FFCEC4',
      '#FFD1C4'
    ],
    error: [
      '#E67979',
      '#E67779',
      '#E6797C',
      '#E67979',
      '#E67976',
      '#E67B79',
      '#E67979',
      '#E6797E',
      '#E67979',
      '#E67979'
    ],
    attention: [
      '#E6CE79',
      '#E6CD79',
      '#E6D279',
      '#E6CE76',
      '#E6CE7C',
      '#E6CE79',
      '#E6D879',
      '#E6CE79',
      '#E6CE79',
      '#E6CE7E'
    ],
    info: [
      '#79BFE6',
      '#79BEE6',
      '#79C1E6',
      '#7ABFE6',
      '#79BFE0',
      '#79BFE6',
      '#79C4E6',
      '#79BFE6',
      '#79BFE6',
      '#79BFE6'
    ],
    success: [
      '#B6E679',
      '#B6E779',
      '#B6E579',
      '#B6E779',
      '#B6E679',
      '#B6E579',
      '#B6E479',
      '#B6E679',
      '#B6E679',
      '#B6E579'
    ],
    lightgray: [
      '#9E9694',
      '#9E9691',
      '#9E9494',
      '#9E9894',
      '#9E9694',
      '#9E9697',
      '#9E9994',
      '#9E9694',
      '#9E9694',
      '#9E9694'
    ],
    mediumgray: [
      '#6B6361',
      '#6B6360',
      '#6B6161',
      '#6B6461',
      '#6B6361',
      '#6B6362',
      '#6B6561',
      '#6B6361',
      '#6B6361',
      '#6B6361'
    ],
    darkgray: [
      '#353231',
      '#353231',
      '#353231',
      '#353231',
      '#353231',
      '#353231',
      '#353231',
      '#353231',
      '#353231',
      '#353231'
    ]
  },
  primaryColor: 'primary',
  components: {
    Button: {
      styles: (theme: MantineTheme) => ({
        root: {
          backgroundColor: theme.colors.primary[0],
          '&:hover': {
            backgroundColor: theme.colors.primary[0]
          }
        }
      })
    }
  }
}

export default theme
