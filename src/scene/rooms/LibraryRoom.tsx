import { themeMat, type RoomProps } from './types'

/** 99 · Library — archive shelves and document boxes */
export function LibraryRoom({ theme, accent, entered }: RoomProps) {
  const m = themeMat(theme, accent, entered)
  return (
    <group>
      {[-0.45, 0.45].map((x) => (
        <group key={x} position={[x, 0, -0.15]}>
          <mesh>
            <boxGeometry args={[0.3, 0.75, 0.2]} />
            <meshStandardMaterial color={m.alt} metalness={m.metalness} roughness={m.roughness} />
          </mesh>
          {Array.from({ length: 4 }).map((_, j) => (
            <mesh key={j} position={[0, 0.2 - j * 0.16, 0.12]}>
              <boxGeometry args={[0.22, 0.1, 0.14]} />
              <meshStandardMaterial
                color={entered ? accent : m.body}
                emissive={entered ? accent : '#000000'}
                emissiveIntensity={entered ? 0.3 : 0}
                transparent
                opacity={0.85}
              />
            </mesh>
          ))}
        </group>
      ))}
      {/* Reading desk */}
      <mesh position={[0, -0.2, 0.25]}>
        <boxGeometry args={[0.5, 0.06, 0.3]} />
        <meshStandardMaterial color={m.edge} metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  )
}
