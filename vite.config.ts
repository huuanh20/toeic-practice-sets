import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/cdn-media': {
        target: 'https://github.com/huuanh20/toeic-practice-sets/releases/download/v1.0.0',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cdn-media/, ''),
      },
    },
  },
})
