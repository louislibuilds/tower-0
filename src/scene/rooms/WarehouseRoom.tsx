import { themeMat, type RoomProps } from './types'

/** 23 · Warehouse — shelving units with crate stacks */
export function WarehouseRoom({ theme, accent, entered }: RoomProps) {
  const m = themeMat(theme, accent, entered)
  return (
    <group>
      {[-0.45, 0, 0.45].map((x, i) => (
        <group key={i} position={[x, 0, -0.1]}>
          <mesh>
            <boxGeometry args={[0.35, 0.65, 0.25]} />
            <meshStandardMaterial color={m.alt} metalness={m.metalness} roughness={m.roughness} />
          </mesh>
          {[0.15, -0.05, -0.25].map((y, j) => (
            <mesh key={j} position={[0, y, 0.14]}>
              <boxGeometry args={[0.28, 0.14, 0.12]} />
              <meshStandardMaterial
                color={j === 0 && entered ? accent : m.body}
                emissive={j === 0 && entered ? accent : '#000000'}
                emissiveIntensity={entered ? 0.6 : 0}
              />
            </mesh>
          ))}
        </group>
      ))}
      {/* Conveyor strip */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.35, 0.2]}>
        <planeGeometry args={[1.2, 0.5]} />
        <meshStandardMaterial color={m.edge} metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  )
}
