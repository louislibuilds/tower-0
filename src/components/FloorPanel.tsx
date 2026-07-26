import { AnimatePresence, motion } from 'framer-motion'
import type { FloorDef } from '../building/program'
import { LobbyPanel } from './panels/LobbyPanel'
import { WarehousePanel } from './panels/WarehousePanel'
import { LaboratoryPanel } from './panels/LaboratoryPanel'
import { InfraPanel } from './panels/InfraPanel'
import { TechCentrePanel } from './panels/TechCentrePanel'
import { LibraryPanel } from './panels/LibraryPanel'
import { RoofPanel } from './panels/RoofPanel'

interface FloorPanelProps {
  floor: FloorDef
  direction: number
}

const panelVariants = {
  enter: (dir: number) => ({
    opacity: 0,
    y: dir >= 0 ? 28 : -28,
    filter: 'blur(4px)',
  }),
  center: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
  },
  exit: (dir: number) => ({
    opacity: 0,
    y: dir >= 0 ? -28 : 28,
    filter: 'blur(4px)',
  }),
}

function PanelContent({ floor }: { floor: FloorDef }) {
  switch (floor.id) {
    case 'G':
      return <LobbyPanel />
    case '23':
      return <WarehousePanel />
    case '52':
      return <LaboratoryPanel />
    case 'B2':
      return <InfraPanel />
    case 'B10':
      return <TechCentrePanel />
    case '99':
      return <LibraryPanel />
    case 'roof':
      return <RoofPanel />
    default:
      return null
  }
}

export function FloorPanel({ floor, direction }: FloorPanelProps) {
  return (
    <section className="floor-panel" aria-label={`${floor.title} — ${floor.subtitle}`}>
      <header className="floor-panel__header">
        <div className="floor-panel__badge" data-zone={floor.zone}>
          {floor.label}
        </div>
        <div>
          <h1 className="floor-panel__title">{floor.title}</h1>
          <p className="floor-panel__subtitle">{floor.subtitle}</p>
        </div>
      </header>

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={floor.id}
          className="floor-panel__body"
          custom={direction}
          variants={panelVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <PanelContent floor={floor} />
        </motion.div>
      </AnimatePresence>
    </section>
  )
}
