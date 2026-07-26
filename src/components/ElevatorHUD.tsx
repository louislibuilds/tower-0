import { motion } from 'framer-motion'

interface ElevatorHUDProps {
  floorLabel: string
  floorTitle: string
  elevation: number
  maxElevation: number
  direction: number
}

export function ElevatorHUD({
  floorLabel,
  floorTitle,
  elevation,
  maxElevation,
  direction,
}: ElevatorHUDProps) {
  const pct = maxElevation > 0 ? (elevation / maxElevation) * 100 : 0

  return (
    <div className="elevator-hud" aria-live="polite">
      <div className="elevator-hud__shaft">
        <motion.div
          className="elevator-hud__car"
          animate={{ bottom: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 22 }}
        />
        <div className="elevator-hud__track" />
      </div>
      <div className="elevator-hud__display">
        <motion.span
          key={floorLabel}
          className="elevator-hud__floor"
          initial={{ opacity: 0, y: direction * 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {floorLabel}
        </motion.span>
        <span className="elevator-hud__title">{floorTitle}</span>
        <span className="elevator-hud__arrow" aria-hidden="true">
          {direction > 0 ? '▲' : direction < 0 ? '▼' : '●'}
        </span>
      </div>
    </div>
  )
}
