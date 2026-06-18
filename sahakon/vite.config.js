import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // base is '/' for Vercel; override with VITE_BASE env var for GitHub Pages
  base: process.env.VITE_BASE || '/',
  server: {
    allowedHosts: true,
  },
})
