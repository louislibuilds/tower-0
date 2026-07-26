import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

void import('./scene/TowerScene')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
