import { Suspense, lazy, useEffect, useState } from 'react'
import { pathSegments } from './building/siteRoute'
import { SiteProvider } from './context/SiteContext'
import { TowerShell } from './components/TowerShell'
import './styles/tower.css'

const TypologyGallery = lazy(() =>
  import('./dev/TypologyGallery').then((m) => ({ default: m.TypologyGallery })),
)

function useAppRoute() {
  const [segments, setSegments] = useState(() =>
    typeof window !== 'undefined' ? pathSegments() : [],
  )
  useEffect(() => {
    const onNav = () => setSegments(pathSegments())
    window.addEventListener('popstate', onNav)
    return () => window.removeEventListener('popstate', onNav)
  }, [])
  return segments
}

export default function App() {
  const segments = useAppRoute()
  if (segments[0] === 'dev' && segments[1] === 'typologies') {
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
