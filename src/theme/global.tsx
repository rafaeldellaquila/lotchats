import { Global, css } from '@emotion/react'
import { useTheme } from '@mui/material/styles'

const GlobalStyles = () => {
  const theme = useTheme()
  return (
    <Global
      styles={css`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-family:
            'Roboto',
            'Arial',
            -apple-system,
            BlinkMacSystemFont,
            'Helvetica Neue',
            sans-serif;
        }
        #root {
          height: inherit;
        }
        body {
          font-family: ${theme.typography.fontFamily};
          background-color: ${theme.palette.common.white};
          color: ${theme.palette.common.black};
          height: 100vh;
        }
      `}
    />
  )
}

export default GlobalStyles
