import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, '.'),
      components: resolve(__dirname, './src/components/'),
      public: resolve(__dirname, './public/'),
      pages: resolve(__dirname, './src/pages/'),
      types: resolve(__dirname, './src/@types/'),
      styles: resolve(__dirname, './src/styles/'),
    },
  },
})
