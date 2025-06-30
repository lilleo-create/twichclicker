import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // ← важно для относительных путей в WebView
  plugins: [react()],
  build: {
    target: 'es2015',
    outDir: 'dist',
  },
});
