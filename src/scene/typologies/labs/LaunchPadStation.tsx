import { Line } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { typologyMat, type TypologyProps } from '../types'

const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z)

/** 001 · Launch Pad — CrowdObservatory: platform + screen wall + signal path + rails */
export function LaunchPadStation({ theme, accent, entered, active }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered || active
  const path = useMemo(
    () => [v(-0.04, 0.06, 0.04), v(0, 0.1, 0), v(0.04, 0.14, -0.04), v(0.06, 0.18, -0.06)],
    [],
  )

  return (
    <group>
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[0.14, 0.04, 0.1]} />
        <meshStandardMaterial color={m.body} />
      </mesh>
      <mesh position={[0, 0.06, 0.02]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.1, 0.02, 0.08]} />
        <meshStandardMaterial color={m.alt} />
      </mesh>
      {[-0.06, 0.06].map((x) => (
        <mesh key={x} position={[x, 0.08, 0.04]}>
          <boxGeometry args={[0.012, 0.06, 0.012]} />
          <meshStandardMaterial color={m.edge} metalness={0.85} />
        </mesh>
      ))}
      <mesh position={[0, 0.14, -0.04]}>
        <boxGeometry args={[0.12, 0.08, 0.015]} />
        <meshStandardMaterial
          color={lit ? accent : m.pal.glass}
          emissive={lit ? accent : '#000'}
          emissiveIntensity={lit ? 0.2 : 0}
        />
      </mesh>
      {[-0.04, 0, 0.04].map((x) => (
        <mesh key={x} position={[x, 0.1, -0.03]}>
          <boxGeometry args={[0.025, 0.04, 0.008]} />
          <meshStandardMaterial color={m.pal.ink} />
        </mesh>
      ))}
      <mesh position={[0.05, 0.12, 0.02]}>
        <boxGeometry args={[0.02, 0.05, 0.03]} />
        <meshStandardMaterial color={m.pal.concrete} />
      </mesh>
      <Line points={path} color={lit ? accent : m.edge} lineWidth={lit ? 2 : 1} />
    </group>
  )
}
