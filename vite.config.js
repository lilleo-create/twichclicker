// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // обязательно!
  plugins: [react()],
  build: {
    target: 'es2015',
    outDir: 'dist'
  }
})
