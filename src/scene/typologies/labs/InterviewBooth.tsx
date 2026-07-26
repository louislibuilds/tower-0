import { Line } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { typologyMat, type TypologyProps } from '../types'

/** 003 · Interview Booth — partition + mic + waveform */
export function InterviewBooth({ theme, accent, entered, active }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered || active
  const wave = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => {
        const x = -0.06 + i * 0.013
        const y = 0.14 + Math.sin(i * 0.85) * 0.025
        return new THREE.Vector3(x, y, -0.02)
      }),
    [],
  )

  return (
    <group>
      <mesh position={[-0.045, 0.08, 0]}>
        <boxGeometry args={[0.025, 0.14, 0.08]} />
        <meshStandardMaterial color={m.alt} transparent opacity={0.88} />
      </mesh>
      <mesh position={[0.03, 0.05, 0.03]}>
        <boxGeometry args={[0.06, 0.035, 0.04]} />
        <meshStandardMaterial color={m.pal.concrete} />
      </mesh>
      <mesh position={[0.03, 0.1, 0.045]}>
        <cylinderGeometry args={[0.008, 0.008, 0.07, 6]} />
        <meshStandardMaterial color={m.edge} metalness={0.85} />
      </mesh>
      <Line points={wave} color={lit ? accent : m.edge} lineWidth={lit ? 2 : 1} />
    </group>
  )
}
