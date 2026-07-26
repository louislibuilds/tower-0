import { themeMat, type RoomProps } from './types'

/** G · Lobby — thesis wall, columns, glass curtain */
export function LobbyRoom({ theme, accent, entered }: RoomProps) {
  const m = themeMat(theme, accent, entered)
  return (
    <group>
      {/* Thesis wall */}
      <mesh position={[0, 0.15, -0.35]}>
        <boxGeometry args={[1.2, 0.7, 0.06]} />
        <meshStandardMaterial color={m.alt} emissive={m.emissive} emissiveIntensity={m.emissiveIntensity * 0.5} metalness={m.metalness} roughness={m.roughness} />
      </mesh>
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
        <meshStandardMaterial color={accent} transparent opacity={entered ? 0.15 : 0.06} roughness={0.1} metalness={0.2} />
      </mesh>
      {/* Floor plate */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.55, 0]}>
        <planeGeometry args={[1.4, 1.0]} />
        <meshStandardMaterial color={m.body} metalness={m.metalness} roughness={m.roughness} />
      </mesh>
    </group>
  )
}
