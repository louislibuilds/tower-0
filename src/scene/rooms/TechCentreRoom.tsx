import { themeMat, type RoomProps } from './types'

/** B10 · Tech Centre — server rack rows */
export function TechCentreRoom({ theme, accent, entered }: RoomProps) {
  const m = themeMat(theme, accent, entered)
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.38, 0]}>
        <planeGeometry args={[1.2, 0.85]} />
        <meshStandardMaterial color={m.body} />
      </mesh>

      {[-0.42, 0, 0.42].map((x, i) => (
        <group key={i} position={[x, 0.02, 0]}>
          <mesh>
            <boxGeometry args={[0.32, 0.78, 0.38]} />
            <meshStandardMaterial color={m.alt} metalness={0.75} roughness={0.3} />
          </mesh>
          {Array.from({ length: 6 }).map((_, j) => (
            <mesh key={j} position={[0, 0.28 - j * 0.12, 0.2]}>
              <boxGeometry args={[0.26, 0.05, 0.025]} />
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
