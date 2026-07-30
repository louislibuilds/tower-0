import { Line } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import {
  FACTORY_BLUEPRINT,
  FACTORY_STATION_GRID_X,
  FACTORY_TIMELINE_BP_Z,
} from '../factoryStops'
import { bpLine, bpPoint, BP_UNIT } from '../typologies/blueprintLayout'
import { usePalette } from './InkEdges'

const { w: ROOM_W, d: ROOM_D } = FACTORY_BLUEPRINT
const TICK_RISE = 0.028

export interface FactoryTimelineRailProps {
  hidden?: boolean
}

/** L1 timeline datum — one hairline tying all semester stops + tick marks. */
export function FactoryTimelineRail({ hidden = false }: FactoryTimelineRailProps) {
  const pal = usePalette()

  const { spine, ticks } = useMemo(() => {
    const spinePts = bpLine(0.15, 1.5, FACTORY_TIMELINE_BP_Z, 10.35, 1.5, FACTORY_TIMELINE_BP_Z, ROOM_W, ROOM_D)
    const spine = spinePts.map((p) => new THREE.Vector3(...p))

    const ticks = FACTORY_STATION_GRID_X.map((sx) => {
      const base = bpPoint(sx + 0.75, 1.5, FACTORY_TIMELINE_BP_Z, ROOM_W, ROOM_D)
      const tip = bpPoint(
        sx + 0.75,
        1.5,
        FACTORY_TIMELINE_BP_Z + TICK_RISE / BP_UNIT,
        ROOM_W,
        ROOM_D,
      )
      return [new THREE.Vector3(...base), new THREE.Vector3(...tip)] as const
    })

    return { spine, ticks }
  }, [])

  if (hidden) return null

  return (
    <group>
      <Line
        points={spine}
        color={pal.fg}
        lineWidth={1.2}
        transparent
        opacity={0.88}
      />
      {ticks.map((pts, i) => (
        <Line
          key={i}
          points={pts}
          color={pal.fg}
          lineWidth={1}
          transparent
          opacity={0.72}
        />
      ))}
    </group>
  )
}

/** Scene Y of the shared timeline datum (after blueprint → meters). */
export function factoryTimelineSceneY() {
  return bpPoint(0, 1.5, FACTORY_TIMELINE_BP_Z, ROOM_W, ROOM_D)[1]
}
