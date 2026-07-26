import { typologyMat, type TypologyProps } from '../types'

/** 002 · IoT Bay — three parallel racks + 8-bay floor grid + lane */
export function ServerRackBay({ theme, accent, entered, active }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered || active

  return (
    <group>
      <mesh position={[0, 0.015, 0]}>
        <boxGeometry args={[0.16, 0.03, 0.12]} />
        <meshStandardMaterial color={m.pal.concrete} />
      </mesh>
      {Array.from({ length: 8 }).map((_, i) => {
        const row = Math.floor(i / 4)
        const col = i % 4
        const x = -0.052 + col * 0.035
        const z = -0.03 + row * 0.06
        return (
          <mesh key={i} position={[x, 0.028, z]}>
            <boxGeometry args={[0.028, 0.012, 0.022]} />
            <meshStandardMaterial color={row === 0 ? m.pal.resin : m.pal.concrete} />
          </mesh>
        )
      })}
      <mesh position={[0, 0.026, 0.04]}>
        <boxGeometry args={[0.14, 0.008, 0.018]} />
        <meshStandardMaterial color={lit ? accent : m.edge} emissive={lit ? accent : '#000'} emissiveIntensity={0.15} />
      </mesh>
      {[-0.05, 0, 0.05].map((x, ri) => (
        <group key={ri} position={[x, 0, 0]}>
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[0.04, 0.16, 0.04]} />
            <meshStandardMaterial color={m.alt} metalness={0.7} roughness={0.35} />
          </mesh>
          {Array.from({ length: 5 }).map((_, j) => (
            <mesh key={j} position={[0, 0.04 + j * 0.032, 0.022]}>
              <boxGeometry args={[0.034, 0.025, 0.008]} />
              <meshStandardMaterial
                color={lit && j % 2 === 0 ? accent : '#0a1020'}
                emissive={lit && j % 2 === 0 ? accent : '#000'}
                emissiveIntensity={lit ? 0.6 : 0}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}
