import { themeMat, type RoomProps } from './types'

/** Roof · Contact — identity plate, helipad ring */
export function RoofRoom({ theme, accent, entered }: RoomProps) {
  const m = themeMat(theme, accent, entered)
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
        <ringGeometry args={[0.35, 0.55, 32]} />
        <meshStandardMaterial
          color={m.edge}
          emissive={entered ? accent : '#000000'}
          emissiveIntensity={entered ? 0.5 : 0}
          side={2}
        />
      </mesh>
      <mesh position={[0, 0.05, 0.3]}>
        <boxGeometry args={[0.8, 0.35, 0.04]} />
        <meshStandardMaterial
          color={m.alt}
          emissive={entered ? accent : '#000000'}
          emissiveIntensity={entered ? 1.0 : 0}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.02, 0.03, 0.6, 6]} />
        <meshStandardMaterial color={m.edge} emissive={entered ? accent : '#000000'} emissiveIntensity={entered ? 1.5 : 0} metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  )
}
