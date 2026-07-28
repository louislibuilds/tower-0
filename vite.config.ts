import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/towerzero/',
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
