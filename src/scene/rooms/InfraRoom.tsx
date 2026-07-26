import { Line } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { WireBox } from '../primitives/WireBox'
import { getScenePalette } from '../palette'
import { themeMat, type RoomProps } from './types'

/** B2 · Infrastructure — risers, pipes, conduits */
export function InfraRoom({ theme, accent, entered }: RoomProps) {
  const m = themeMat(theme, accent, entered)
  const pal = getScenePalette(theme)
  const pipes = useMemo(() => {
    const runs: THREE.Vector3[][] = []
    for (let i = 0; i < 5; i++) {
      const x = -0.55 + i * 0.28
      runs.push([new THREE.Vector3(x, -0.25, 0.05), new THREE.Vector3(x, 0.35, 0.05)])
    }
    runs.push([new THREE.Vector3(-0.65, 0.05, 0.25), new THREE.Vector3(0.65, 0.05, 0.25)])
    runs.push([new THREE.Vector3(-0.65, -0.1, -0.2), new THREE.Vector3(0.65, -0.1, -0.2)])
    return runs
  }, [])

  return (
    <group>
      <WireBox size={[1.1, 0.03, 0.75]} position={[0, -0.08, 0]} color={pal.graphite} fillOpacity={0.08} fillColor={m.body} />

      {pipes.map((pts, i) => (
        <Line key={i} points={pts} color={entered ? accent : m.edge} lineWidth={i < 5 ? 2.5 : 1.5} />
      ))}

      {[-0.45, 0, 0.45].map((x) => (
        <WireBox
          key={x}
          size={[0.12, 0.65, 0.12]}
          position={[x, 0.05, 0]}
          color={entered ? accent : pal.graphite}
          fillOpacity={0.1}
          fillColor={m.alt}
        />
      ))}

      {[[-0.45, 0.22], [0, -0.02], [0.45, 0.22]].map(([x, y], i) => (
        <WireBox key={i} size={[0.14, 0.14, 0.1]} position={[x, y, 0.12]} color={pal.concrete} fillOpacity={0.15} />
      ))}
    </group>
  )
}
