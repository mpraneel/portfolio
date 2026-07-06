import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Root custom domain deploy (praneelmagapu.me), so base stays '/'
export default defineConfig({
  plugins: [react()],
  base: '/',
})
