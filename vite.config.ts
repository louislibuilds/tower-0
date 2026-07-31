import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

/** Subpath on bubblechicken.com; set VITE_BASE_PATH=/ for Vercel root deploy */
const base = process.env.VITE_BASE_PATH ?? '/towerzero/'
const root = path.dirname(fileURLToPath(import.meta.url))
const contentDir = fs.existsSync(path.join(root, 'content'))
  ? path.join(root, 'content')
  : path.join(root, 'content.sample')

// https://vite.dev/config/
export default defineConfig({
  base,
  resolve: {
    alias: {
      '@site-content': contentDir,
    },
  },
  plugins: [
    react(),
    {
      name: 'log-site-content',
      configResolved() {
        console.log(`[tower-zero] site content ← ${path.relative(root, contentDir)}`)
      },
    },
  ],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'vendor-three',
              test: /node_modules\/(three|@react-three|@use-gesture|camera-controls|troika-three)/,
            },
            {
              name: 'labs',
              test: /typologies\/labs\//,
            },
          ],
        },
      },
    },
  },
})
