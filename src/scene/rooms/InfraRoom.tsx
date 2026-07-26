import { Line } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { themeMat, type RoomProps } from './types'

/** B2 · Infrastructure — risers, pipes, conduits */
export function InfraRoom({ theme, accent, entered }: RoomProps) {
  const m = themeMat(theme, accent, entered)
  const pipes = useMemo(() => {
    const runs: THREE.Vector3[][] = []
    for (let i = 0; i < 4; i++) {
      const x = -0.4 + i * 0.27
      runs.push([new THREE.Vector3(x, -0.4, 0), new THREE.Vector3(x, 0.4, 0)])
    }
    runs.push([new THREE.Vector3(-0.5, 0, 0.2), new THREE.Vector3(0.5, 0, 0.2)])
    runs.push([new THREE.Vector3(-0.5, -0.15, -0.2), new THREE.Vector3(0.5, -0.15, -0.2)])
    return runs
  }, [])

  return (
    <group>
      {pipes.map((pts, i) => (
        <Line key={i} points={pts} color={entered ? accent : m.edge} lineWidth={i < 4 ? 2 : 1} />
      ))}
      {[-0.35, 0.35].map((x) => (
        <mesh key={x} position={[x, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.75, 8]} />
          <meshStandardMaterial
            color={m.alt}
            emissive={entered ? accent : '#000000'}
            emissiveIntensity={entered ? 0.4 : 0}
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>
      ))}
    </group>
  )
}
