import { Html } from '@react-three/drei'
import { Line } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { typologyMat, type TypologyProps } from './types'

/** G · Threshold Hall — lobby threshold, thesis wall, glass curtain */
export function ThresholdHall({ theme, accent, entered }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const thresholdLine = useMemo(
    () => [new THREE.Vector3(-0.65, -0.52, 0.35), new THREE.Vector3(0.65, -0.52, 0.35)],
    [],
  )

  return (
    <group>
      {/* Thesis wall */}
      <mesh position={[0, 0.15, -0.35]}>
        <boxGeometry args={[1.2, 0.7, 0.06]} />
        <meshStandardMaterial
          color={m.alt}
          emissive={m.emissive}
          emissiveIntensity={m.emissiveIntensity * 0.5}
          metalness={m.metalness}
          roughness={m.roughness}
        />
      </mesh>
      <Html transform position={[0, 0.22, -0.31]} style={{ pointerEvents: 'none' }}>
        <div className="typology-thesis">
          <p className="typology-thesis__zh">萬丈高樓平地起</p>
          <p className="typology-thesis__en">Learning is Construction</p>
        </div>
      </Html>

      {/* Columns */}
      {[-0.55, 0.55].map((x) => (
        <mesh key={x} position={[x, -0.1, 0]}>
          <boxGeometry args={[0.08, 0.9, 0.08]} />
          <meshStandardMaterial color={m.edge} metalness={0.8} roughness={0.3} />
        </mesh>
      ))}

      {/* Glass curtain */}
      <mesh position={[0, 0, 0.62]}>
        <planeGeometry args={[1.0, 0.85]} />
        <meshStandardMaterial
          color={accent}
          transparent
          opacity={entered ? 0.15 : 0.06}
          roughness={0.1}
          metalness={0.2}
        />
      </mesh>

      {/* Ground threshold line */}
      <Line points={thresholdLine} color={entered ? accent : m.edge} lineWidth={2} />

      {/* Floor plate */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.55, 0]}>
        <planeGeometry args={[1.4, 1.0]} />
        <meshStandardMaterial color={m.body} metalness={m.metalness} roughness={m.roughness} />
      </mesh>
    </group>
  )
}
