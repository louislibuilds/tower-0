import { pageview } from '@vercel/analytics'
import { useCallback, useEffect, useState } from 'react'
import type { FloorId } from '../building/program'
import { getFloor } from '../building/program'
import {
  buildSitePath,
  defaultFloorLocation,
  migrateHashRoute,
  parseSiteLocation,
  type SiteLocation,
} from '../building/siteRoute'

function readLocation(): SiteLocation {
  return parseSiteLocation()
}

function pushLocation(loc: SiteLocation, replace = false) {
  const path = buildSitePath(loc)
  if (replace) {
    window.history.replaceState(null, '', path)
  } else {
    window.history.pushState(null, '', path)
  }
  pageview({ route: path, path })
}

export function useSiteNavigation() {
  const [location, setLocation] = useState<SiteLocation>(readLocation)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const migrated = migrateHashRoute()
    if (migrated) {
      window.history.replaceState(null, '', migrated)
      window.location.hash = ''
    }
    setLocation(parseSiteLocation())
  }, [])

  useEffect(() => {
    const onPop = () => {
      const next = parseSiteLocation()
      setLocation(next)
      pageview({ route: buildSitePath(next), path: window.location.pathname })
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((next: SiteLocation, opts?: { replace?: boolean }) => {
    setLocation((prev) => {
      const prevFloor = prev.kind === 'floor' || prev.kind === 'room' || prev.kind === 'focus' ? prev.floorId : null
      const nextFloor =
        next.kind === 'floor' || next.kind === 'room' || next.kind === 'focus' ? next.floorId : null
      if (prevFloor && nextFloor) {
        const prevElev = getFloor(prevFloor).elevation
        const nextElev = getFloor(nextFloor).elevation
        setDirection(nextElev > prevElev ? 1 : nextElev < prevElev ? -1 : 0)
      } else {
        setDirection(0)
      }
      return next
    })
    pushLocation(next, opts?.replace)
  }, [])

  const goToTower = useCallback(() => {
    navigate({ kind: 'tower' })
  }, [navigate])

  const goToFloor = useCallback(
    (id: FloorId) => {
      navigate(defaultFloorLocation(id))
    },
    [navigate],
  )

  const atTower = location.kind === 'tower'
  const floorId =
    location.kind === 'floor' || location.kind === 'room' || location.kind === 'focus'
      ? location.floorId
      : null

  return {
    location,
    atTower,
    floorId,
    floor: floorId ? getFloor(floorId) : null,
    direction,
    navigate,
    goToTower,
    goToFloor,
  }
}
