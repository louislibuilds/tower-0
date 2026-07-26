import { useEffect, useState } from 'react'
import { isBootSequence } from '../building/sitePhase'
import { useSite } from '../context/SiteContext'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { DUR } from '../scene/motion'
import type { FloorId } from '../building/program'
import type { ViewMode } from '../building/viewMode'
import { ExhibitOverlay } from './hud/ExhibitOverlay'

function overlayDelayMs(floorId: FloorId, viewMode: ViewMode): number {
  if (viewMode === 'focus') return DUR.focus * 850
  if (viewMode === 'room') return DUR.room * 850
  if (viewMode === 'floor' && floorId === 'roof') return DUR.roofAscent * 850
  if (viewMode === 'floor') return DUR.civic * 850
  return 0
}

/** Waits for camera tween before showing the right exhibit panel */
export function DelayedExhibitOverlay() {
  const {
    floorId,
    viewMode,
    phase,
    bootDone,
    labRoomSlug,
    libraryRoomSlug,
    factoryStop,
    selectedBookSlug,
    selectedCredentialSlug,
  } = useSite()
  const reducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)

  const key = `${floorId}-${viewMode}-${labRoomSlug}-${libraryRoomSlug}-${factoryStop}-${selectedBookSlug}-${selectedCredentialSlug}`

  useEffect(() => {
    if (reducedMotion || viewMode === 'tower') {
      setVisible(true)
      return
    }
    setVisible(false)
    const ms = overlayDelayMs(floorId, viewMode)
    if (ms <= 0) {
      setVisible(true)
      return
    }
    const t = window.setTimeout(() => setVisible(true), ms)
    return () => window.clearTimeout(t)
  }, [key, reducedMotion, floorId, viewMode])

  if (viewMode === 'tower' || !visible || !bootDone || isBootSequence(phase) || phase === 'exit' || phase === 'void') return null

  return (
    <div className="exhibit-overlay-wrap exhibit-overlay-wrap--enter">
      <ExhibitOverlay />
    </div>
  )
}
