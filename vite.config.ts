import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** Subpath on bubblechicken.com; set VITE_BASE_PATH=/ for Vercel root deploy */
const base = process.env.VITE_BASE_PATH ?? '/towerzero/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
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
