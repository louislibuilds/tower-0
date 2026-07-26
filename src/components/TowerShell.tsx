import { FLOORS } from '../building/program'
import { useFloorNavigation } from '../hooks/useFloorNavigation'
import { ElevatorHUD } from './ElevatorHUD'
import { FloorPanel } from './FloorPanel'
import { FloorRail } from './FloorRail'
import { TowerSilhouette } from './TowerSilhouette'

const MAX_ELEVATION = FLOORS[FLOORS.length - 1].elevation

export function TowerShell() {
  const { floorId, floor, direction, goToFloor } = useFloorNavigation()

  return (
    <div className="tower-shell">
      <aside className="tower-shell__left">
        <TowerSilhouette activeId={floorId} />
        <ElevatorHUD
          floorLabel={floor.label}
          floorTitle={floor.title}
          elevation={floor.elevation}
          maxElevation={MAX_ELEVATION}
          direction={direction}
        />
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
