import { Line } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { RoomShell } from '../primitives/RoomShell'
import { typologyMat, type TypologyProps } from './types'

/** B2 · Riser Core — vertical pipes and cross runs */
export function RiserCore({ theme, accent, entered, active }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered || active
  const pipes = useMemo(() => {
    const runs: THREE.Vector3[][] = []
    for (let i = 0; i < 5; i++) {
      const x = -0.45 + i * 0.23
      runs.push([new THREE.Vector3(x, 0.05, -0.2), new THREE.Vector3(x, 0.48, -0.2)])
    }
    runs.push([new THREE.Vector3(-0.5, 0.2, 0.1), new THREE.Vector3(0.5, 0.2, 0.1)])
    runs.push([new THREE.Vector3(-0.5, 0.34, -0.05), new THREE.Vector3(0.5, 0.34, -0.05)])
    return runs
  }, [])

  return (
    <RoomShell width={1.05} depth={0.72} height={0.48} color={m.pal.graphite} floorColor={m.body}>
      {pipes.map((pts, i) => (
        <Line
          key={i}
          points={pts}
          color={lit ? accent : m.edge}
          lineWidth={i < 5 ? 2.5 : 1.5}
        />
      ))}
      {[-0.35, 0, 0.35].map((x) => (
        <group key={x} position={[x, 0.22, -0.15]}>
          <mesh>
            <cylinderGeometry args={[0.07, 0.07, 0.42, 10]} />
            <meshStandardMaterial
              color={m.alt}
              emissive={lit ? accent : '#000000'}
              emissiveIntensity={lit ? 0.35 : 0}
              metalness={0.85}
              roughness={0.25}
            />
          </mesh>
          <mesh position={[0, 0.24, 0]}>
            <torusGeometry args={[0.09, 0.012, 8, 16]} />
            <meshStandardMaterial
              color={lit ? m.pal.chicken : m.edge}
              emissive={lit ? m.pal.chicken : '#000'}
              emissiveIntensity={lit ? 0.4 : 0}
              metalness={0.7}
            />
          </mesh>
        </group>
      ))}
    </RoomShell>
  )
}
