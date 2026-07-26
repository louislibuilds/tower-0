import { themeMat, type RoomProps } from './types'

/** B10 · Tech Centre — server rack rows */
export function TechCentreRoom({ theme, accent, entered }: RoomProps) {
  const m = themeMat(theme, accent, entered)
  return (
    <group>
      {[-0.4, 0, 0.4].map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.28, 0.7, 0.35]} />
            <meshStandardMaterial color={m.alt} metalness={0.75} roughness={0.3} />
          </mesh>
          {Array.from({ length: 5 }).map((_, j) => (
            <mesh key={j} position={[0, 0.25 - j * 0.13, 0.18]}>
              <boxGeometry args={[0.22, 0.04, 0.02]} />
              <meshStandardMaterial
                color={entered && j % 2 === 0 ? accent : '#0a1020'}
                emissive={entered && j % 2 === 0 ? accent : '#000000'}
                emissiveIntensity={entered ? 0.8 : 0}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}
