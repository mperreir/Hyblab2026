import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

export default defineConfig({
  base: '/vivant/',
  plugins: [react(), tailwind()],
  server: {
    proxy: {
      '/vivant/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
    host : true
  },
})