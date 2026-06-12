import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  server: {
    headers: {
      'Content-Security-Policy': "script-src 'self' 'unsafe-eval'",
    },
  },
})