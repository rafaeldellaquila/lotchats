import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: ['Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(','),
    h1: {
      fontSize: '1.25rem', // 20px
      fontWeight: 600
    },
    body1: {
      fontSize: '1rem', // 16px
      fontWeight: 400
    },
    body2: {
      fontSize: '0.75rem', // 12px
      fontWeight: 400
    },
    caption: {
      fontSize: '0.5rem', // 8px
      fontWeight: 400
    }
  },
  palette: {
    common: {
      black: '#140400',
      white: '#FFF5F2'
    },
    primary: {
      main: '#A979E6',
      light: '#A979DF',
      dark: '#B479E6'
    },
    secondary: {
      main: '#FFD1C4'
    },
    error: {
      main: '#E67979'
    },
    warning: {
      main: '#E6CE79'
    },
    info: {
      main: '#79BFE6'
    },
    success: {
      main: '#B6E679'
    },
    grey: {
      50: '#9E9694', // lightgray
      100: '#6B6361', // mediumgray
      900: '#353231' // darkgray
    }
  },
  components: {
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: '2rem'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        label: {
          fontWeight: 700,
          color: '#353231'
        }
      }
    }
  }
})

export default theme
