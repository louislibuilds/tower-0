import { typologyMat, type TypologyProps } from '../types'

/** 002 · Container Bay — three parallel server racks + floor lane */
export function ServerRackBay({ theme, accent, entered, active }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered || active

  return (
    <group>
      <mesh position={[0, 0.015, 0]}>
        <boxGeometry args={[0.16, 0.03, 0.12]} />
        <meshStandardMaterial color={m.pal.concrete} />
      </mesh>
      {[-0.05, 0, 0.05].map((x, ri) => (
        <group key={ri} position={[x, 0, 0]}>
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[0.04, 0.16, 0.04]} />
            <meshStandardMaterial color={m.alt} metalness={0.7} roughness={0.35} />
          </mesh>
          {Array.from({ length: 4 }).map((_, j) => (
            <mesh key={j} position={[0, 0.04 + j * 0.035, 0.022]}>
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
      {[-0.04, -0.01, 0.03, 0.07].map((x, i) => (
        <mesh key={i} position={[x, 0.028, -0.04 + (i % 2) * 0.08]}>
          <boxGeometry args={[0.025, 0.015, 0.025]} />
          <meshStandardMaterial color={m.pal.resin} />
        </mesh>
      ))}
    </group>
  )
}
