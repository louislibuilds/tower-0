import { Line } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { themeMat, type RoomProps } from './types'
import { getScenePalette } from '../palette'

/** B2 · Infrastructure — risers, pipes, conduits */
export function InfraRoom({ theme, accent, entered }: RoomProps) {
  const m = themeMat(theme, accent, entered)
  const pal = getScenePalette(theme)
  const pipes = useMemo(() => {
    const runs: THREE.Vector3[][] = []
    for (let i = 0; i < 5; i++) {
      const x = -0.55 + i * 0.28
      runs.push([new THREE.Vector3(x, -0.35, 0.05), new THREE.Vector3(x, 0.45, 0.05)])
    }
    runs.push([new THREE.Vector3(-0.65, 0.05, 0.25), new THREE.Vector3(0.65, 0.05, 0.25)])
    runs.push([new THREE.Vector3(-0.65, -0.12, -0.22), new THREE.Vector3(0.65, -0.12, -0.22)])
    return runs
  }, [])

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.38, 0]}>
        <planeGeometry args={[1.2, 0.85]} />
        <meshStandardMaterial color={m.body} />
      </mesh>

      {pipes.map((pts, i) => (
        <Line key={i} points={pts} color={entered ? accent : m.edge} lineWidth={i < 5 ? 2.5 : 1.5} />
      ))}

      {[-0.45, 0, 0.45].map((x) => (
        <mesh key={x} position={[x, 0.05, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.85, 10]} />
          <meshStandardMaterial
            color={m.alt}
            emissive={entered ? accent : '#000000'}
            emissiveIntensity={entered ? 0.35 : 0}
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>
      ))}

      {/* Junction boxes */}
      {[[-0.45, 0.25], [0, -0.05], [0.45, 0.25]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.12]}>
          <boxGeometry args={[0.14, 0.14, 0.1]} />
          <meshStandardMaterial color={pal.concrete} metalness={0.6} />
        </mesh>
      ))}
    </group>
  )
}
