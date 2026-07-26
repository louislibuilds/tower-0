import { FLOORS, type FloorId } from '../building/program'

interface FloorRailProps {
  activeId: FloorId
  onSelect: (id: FloorId) => void
}

export function FloorRail({ activeId, onSelect }: FloorRailProps) {
  return (
    <nav className="floor-rail" aria-label="Floor navigation">
      <div className="floor-rail__label">FLOORS</div>
      <ol className="floor-rail__list">
        {[...FLOORS].reverse().map((floor) => {
          const active = floor.id === activeId
          return (
            <li key={floor.id}>
              <button
                type="button"
                className={`floor-rail__btn ${active ? 'floor-rail__btn--active' : ''}`}
                data-zone={floor.zone}
                onClick={() => onSelect(floor.id)}
                aria-current={active ? 'true' : undefined}
              >
                <span className="floor-rail__code">{floor.label}</span>
                <span className="floor-rail__name">{floor.title}</span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
