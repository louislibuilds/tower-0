import { Suspense, lazy, useEffect, useState } from 'react'
import { SiteProvider } from './context/SiteContext'
import { TowerShell } from './components/TowerShell'
import './styles/tower.css'

const TypologyGallery = lazy(() =>
  import('./dev/TypologyGallery').then((m) => ({ default: m.TypologyGallery })),
)

function useAppRoute() {
  const [hash, setHash] = useState(() =>
    typeof window !== 'undefined' ? window.location.hash : '#/G',
  )
  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return hash
}

export default function App() {
  const hash = useAppRoute()
  if (hash.startsWith('#/dev/typologies')) {
    return (
      <Suspense
        fallback={
          <div className="typology-gallery" data-theme="dark">
            <p className="typology-gallery__sub" style={{ padding: '2rem' }}>
              Loading primitive gallery…
            </p>
          </div>
        }
      >
        <TypologyGallery />
      </Suspense>
    )
  }
  return (
    <SiteProvider>
      <TowerShell />
    </SiteProvider>
  )
}
