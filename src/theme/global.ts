import { css } from '@emotion/react'

export const GlobalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family:
      'Roboto',
      'Oxygen',
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      sans-serif;
    &::before,
    &::after {
      box-sizing: inherit;
    }
  }
`
