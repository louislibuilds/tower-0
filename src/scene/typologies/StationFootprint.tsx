import { Line } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import type { Theme } from '../../context/SiteContext'
import { getScenePalette } from '../palette'
import { WireBox } from '../primitives/WireBox'

/** Visible station footprint ??resin slab + ink boundary for range recognition */
export function StationFootprint({
  width,
  depth,
  theme,
  accent,
  active,
  thin,
}: {
  width: number
  depth: number
  theme: Theme
  accent: string
  active: boolean
  thin?: boolean
}) {
  const pal = getScenePalette(theme)
  const edge = thin ? pal.graphite : active ? accent : pal.graphite
  const fill = thin ? 0.015 : active ? 0.12 : 0.07
  const y = 0.008

  const boundary = useMemo(() => {
    const hw = width / 2
    const hd = depth / 2
    return [
      new THREE.Vector3(-hw, y, -hd),
      new THREE.Vector3(hw, y, -hd),
      new THREE.Vector3(hw, y, hd),
      new THREE.Vector3(-hw, y, hd),
      new THREE.Vector3(-hw, y, -hd),
    ]
  }, [width, depth, y])

  return (
    <group>
      <WireBox
        size={[width, 0.028, depth]}
        position={[0, y, 0]}
        color={edge}
        fillOpacity={fill}
        fillColor={pal.resin}
        passive
        lineOpacity={thin ? 0.06 : active ? 0.95 : 0.7}
      />
      {!thin && (
      <Line
        points={boundary}
        color={edge}
        lineWidth={active ? 2 : 1}
        transparent
        opacity={active ? 0.95 : 0.7}
        raycast={() => null}
      />
      )}
    </group>
  )
}
