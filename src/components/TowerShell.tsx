import { lazy, Suspense } from 'react'
import { FLOORS } from '../building/program'
import { useFloorNavigation } from '../hooks/useFloorNavigation'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useWebGL } from '../hooks/useWebGL'
import { ElevatorHUD } from './ElevatorHUD'
import { FloorPanel } from './FloorPanel'
import { FloorRail } from './FloorRail'
import { TowerSilhouette } from './TowerSilhouette'

const TowerScene = lazy(() =>
  import('../scene/TowerScene').then((m) => ({ default: m.TowerScene })),
)

const MAX_ELEVATION = FLOORS[FLOORS.length - 1].elevation

export function TowerShell() {
  const { floorId, floor, direction, goToFloor } = useFloorNavigation()
  const reducedMotion = useReducedMotion()
  const webgl = useWebGL()
  const use3D = webgl && !reducedMotion

  return (
    <div className="tower-shell">
      <aside className="tower-shell__left">
        {use3D ? (
          <Suspense fallback={<TowerSilhouette activeId={floorId} />}>
            <TowerScene activeFloorId={floorId} reducedMotion={reducedMotion} />
          </Suspense>
        ) : (
          <TowerSilhouette activeId={floorId} />
        )}
        <ElevatorHUD
          floorLabel={floor.label}
          floorTitle={floor.title}
          elevation={floor.elevation}
          maxElevation={MAX_ELEVATION}
          direction={direction}
        />
        {!use3D && (
          <p className="tower-shell__fallback-note" aria-live="polite">
            2D plan view{!webgl ? ' · WebGL unavailable' : ' · reduced motion'}
          </p>
        )}
      </aside>

      <main className="tower-shell__main">
        <FloorPanel floor={floor} direction={direction} />
      </main>

      <aside className="tower-shell__right">
        <FloorRail activeId={floorId} onSelect={goToFloor} />
      </aside>
    </div>
  )
}
