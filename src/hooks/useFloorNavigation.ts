import { useCallback, useEffect, useState } from 'react'
import {
  DEFAULT_FLOOR,
  floorHash,
  getFloor,
  parseFloorFromHash,
  type FloorId,
} from '../building/program'

export function useFloorNavigation() {
  const [floorId, setFloorId] = useState<FloorId>(() =>
    typeof window !== 'undefined' ? parseFloorFromHash(window.location.hash) : DEFAULT_FLOOR,
  )
  const [direction, setDirection] = useState(0)

  const goToFloor = useCallback(
    (id: FloorId) => {
      setFloorId((prev) => {
        const prevElev = getFloor(prev).elevation
        const nextElev = getFloor(id).elevation
        setDirection(nextElev > prevElev ? 1 : nextElev < prevElev ? -1 : 0)
        return id
      })
      const hash = floorHash(id)
      if (window.location.hash !== hash) {
        window.history.pushState(null, '', hash)
      }
    },
    [],
  )

  useEffect(() => {
    const onHashChange = () => {
      const id = parseFloorFromHash(window.location.hash)
      setFloorId((prev) => {
        const prevElev = getFloor(prev).elevation
        const nextElev = getFloor(id).elevation
        setDirection(nextElev > prevElev ? 1 : nextElev < prevElev ? -1 : 0)
        return id
      })
    }
    window.addEventListener('hashchange', onHashChange)
    window.addEventListener('popstate', onHashChange)
    return () => {
      window.removeEventListener('hashchange', onHashChange)
      window.removeEventListener('popstate', onHashChange)
    }
  }, [])

  return { floorId, floor: getFloor(floorId), direction, goToFloor }
}
