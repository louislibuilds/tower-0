import { lazy, Suspense } from 'react'
import { useSite } from '../context/SiteContext'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useWebGL } from '../hooks/useWebGL'
import { ExhibitOverlay } from './hud/ExhibitOverlay'
import { ElevatorHud, FloorRailHud, SiteChrome } from './hud/SiteChrome'
import { TowerSilhouette } from './TowerSilhouette'

const TowerScene = lazy(() =>
  import('../scene/TowerScene').then((m) => ({ default: m.TowerScene })),
)

export function TowerShell() {
  const { floorId, hoveredFloorId, theme, strings, goToFloor, setHoveredFloor } = useSite()
  const reducedMotion = useReducedMotion()
  const webgl = useWebGL()
  const use3D = webgl && !reducedMotion

  return (
    <div className="site-root">
      {use3D ? (
        <Suspense fallback={<div className="site-fallback-bg"><TowerSilhouette activeId={floorId} /></div>}>
          <TowerScene
            activeFloorId={floorId}
            hoveredFloorId={hoveredFloorId}
            reducedMotion={reducedMotion}
            theme={theme}
            bootLabel={strings.site.constructing}
            onFloorHover={setHoveredFloor}
            onFloorClick={goToFloor}
          />
        </Suspense>
      ) : (
        <div className="site-fallback-bg">
          <TowerSilhouette activeId={floorId} />
          <p className="site-fallback-note">
            {strings.site.fallback}{!webgl ? ' · WebGL' : ''}{reducedMotion ? ' · reduced motion' : ''}
          </p>
        </div>
      )}

      <div className="site-hud">
        <SiteChrome />
        <ElevatorHud />
        <ExhibitOverlay />
        <FloorRailHud />
      </div>
    </div>
  )
}
