import type { Theme } from '../context/SiteContext'
import type { FloorId } from '../building/program'
import { TowerSilhouette } from './TowerSilhouette'

interface TowerFallbackPosterProps {
  theme?: Theme
  activeId?: FloorId
}

export function TowerFallbackPoster({ theme, activeId }: TowerFallbackPosterProps) {
  return (
    <div className="tower-fallback-poster" aria-hidden="true">
      <TowerSilhouette theme={theme} activeId={activeId} poster />
    </div>
  )
}
