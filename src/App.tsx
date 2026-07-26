import { SiteProvider } from './context/SiteContext'
import { TowerShell } from './components/TowerShell'
import './styles/tower.css'

export default function App() {
  return (
    <SiteProvider>
      <TowerShell />
    </SiteProvider>
  )
}
