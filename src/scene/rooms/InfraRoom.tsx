import { Line } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { getScenePalette } from '../palette'
import { RoomShell } from '../primitives/RoomShell'
import { themeMat, type RoomProps } from './types'

/** B2 · Infrastructure — interior risers and pipes */
export function InfraRoom({ theme, accent, entered }: RoomProps) {
  const m = themeMat(theme, accent, entered)
  const pal = getScenePalette(theme)
  const pipes = useMemo(() => {
    const runs: THREE.Vector3[][] = []
    for (let i = 0; i < 5; i++) {
      const x = -0.45 + i * 0.23
      runs.push([new THREE.Vector3(x, 0.05, -0.2), new THREE.Vector3(x, 0.42, -0.2)])
    }
    runs.push([new THREE.Vector3(-0.5, 0.2, 0.1), new THREE.Vector3(0.5, 0.2, 0.1)])
    return runs
  }, [])

  return (
    <RoomShell width={1.05} depth={0.72} height={0.48} color={pal.graphite} floorColor={m.body}>
      {pipes.map((pts, i) => (
        <Line key={i} points={pts} color={entered ? accent : m.edge} lineWidth={i < 5 ? 2.5 : 1.5} />
      ))}
      {[-0.35, 0, 0.35].map((x) => (
        <mesh key={x} position={[x, 0.22, -0.15]}>
          <cylinderGeometry args={[0.07, 0.07, 0.38, 10]} />
          <meshStandardMaterial
            color={m.alt}
            emissive={entered ? accent : '#000000'}
            emissiveIntensity={entered ? 0.35 : 0}
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>
      ))}
    </RoomShell>
  )
}
