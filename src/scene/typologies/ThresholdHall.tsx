import { typologyMat, type TypologyProps } from './types'

/** G · Threshold Hall ??thesis wall grooves, columns, glass curtain (no Html overlay) */
export function ThresholdHall({ theme, accent, entered }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)

  return (
    <group>
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
      {[-0.35, -0.12, 0.12, 0.35].map((y) => (
        <mesh key={y} position={[0, y + 0.15, -0.318]}>
          <boxGeometry args={[0.95, 0.012, 0.008]} />
          <meshStandardMaterial color={m.edge} metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
      <mesh position={[0, 0.08, -0.31]}>
        <boxGeometry args={[0.55, 0.22, 0.006]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={entered ? 0.08 : 0.02}
          transparent
          opacity={0.35}
        />
      </mesh>

      {[-0.55, 0.55].map((x) => (
        <mesh key={x} position={[x, -0.1, 0]}>
          <boxGeometry args={[0.08, 0.9, 0.08]} />
          <meshStandardMaterial color={m.edge} metalness={0.8} roughness={0.3} />
        </mesh>
      ))}

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

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.55, 0]}>
        <planeGeometry args={[1.4, 1.0]} />
        <meshStandardMaterial color={m.body} metalness={m.metalness} roughness={m.roughness} />
      </mesh>
    </group>
  )
}
