import { themeMat, type RoomProps } from './types'

/** 52 · Laboratory — five project pods on benches */
export function LaboratoryRoom({ theme, accent, entered }: RoomProps) {
  const m = themeMat(theme, accent, entered)
  const pods: [number, number, number][] = [
    [-0.5, 0.1, 0.2],
    [0, 0.15, -0.15],
    [0.5, 0.1, 0.2],
    [-0.25, -0.15, -0.25],
    [0.35, -0.15, -0.2],
  ]
  const colors = ['#ff6b35', '#b026ff', '#00e5ff', '#ffc400', '#34d399']

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]}>
        <planeGeometry args={[1.3, 0.9]} />
        <meshStandardMaterial color={m.body} metalness={m.metalness} roughness={m.roughness} />
      </mesh>
      {pods.map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh>
            <boxGeometry args={[0.22, 0.06, 0.18]} />
            <meshStandardMaterial color={m.edge} metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.12, 0]}>
            <boxGeometry args={[0.14, 0.18, 0.14]} />
            <meshStandardMaterial
              color={colors[i]}
              emissive={entered ? colors[i] : '#000000'}
              emissiveIntensity={entered ? 1.0 : 0}
              transparent
              opacity={entered ? 0.9 : 0.5}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}
