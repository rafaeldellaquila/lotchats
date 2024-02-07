import { resolve } from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/components'),
      '@assets': resolve(__dirname, './src/assets'),
      '@hooks': resolve(__dirname, './src/hooks'),
      '@i18n': resolve(__dirname, './src/i18n'),
      '@types': resolve(__dirname, './src/@types'),
      '@pages': resolve(__dirname, './src/pages'),
      '@redux': resolve(__dirname, './src/redux'),
      '@theme': resolve(__dirname, './src/theme')
    }
  }
})
