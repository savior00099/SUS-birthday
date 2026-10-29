import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // ⚠️ DEPLOYMENT: If deploying to GitHub Pages under a sub-path (e.g. /repo-name/),
  // set `base` to that path so assets resolve correctly:
  //   base: '/repo-name/',
  // Leave as '/' (default) for a root domain or Vercel/Netlify deployments.
  // base: '/',
})
