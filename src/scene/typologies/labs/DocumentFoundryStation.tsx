import { typologyMat, type TypologyProps } from '../types'

/** 005 · Document Foundry — paper stack + printer slot + chicken LED + output tray */
export function DocumentFoundryStation({ theme, accent, entered, active }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered || active

  return (
    <group>
      <mesh position={[0, 0.09, 0]}>
        <boxGeometry args={[0.1, 0.14, 0.08]} />
        <meshStandardMaterial color={m.alt} metalness={0.45} />
      </mesh>
      <mesh position={[0, 0.03, 0.05]}>
        <boxGeometry args={[0.07, 0.018, 0.04]} />
        <meshStandardMaterial
          color={lit ? m.pal.chicken : m.pal.concrete}
          emissive={lit ? m.pal.chicken : '#000'}
          emissiveIntensity={lit ? 0.45 : 0}
        />
      </mesh>
      <mesh position={[0.05, 0.025, -0.02]}>
        <boxGeometry args={[0.05, 0.01, 0.06]} />
        <meshStandardMaterial color="#d8d4cc" />
      </mesh>
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[-0.04 + i * 0.018, 0.02 + i * 0.008, -0.03]}>
          <boxGeometry args={[0.06, 0.008, 0.045]} />
          <meshStandardMaterial color="#d8d4cc" />
        </mesh>
      ))}
    </group>
  )
}
