import { getScenePalette } from '../palette'
import { RoomShell } from '../primitives/RoomShell'
import { themeMat, type RoomProps } from './types'

/** B10 · Tech Centre — interior server racks */
export function TechCentreRoom({ theme, accent, entered }: RoomProps) {
  const m = themeMat(theme, accent, entered)
  const pal = getScenePalette(theme)

  return (
    <RoomShell width={1.05} depth={0.72} height={0.48} color={pal.graphite} floorColor={m.body}>
      {[-0.32, 0, 0.32].map((x, i) => (
        <group key={i} position={[x, 0, -0.12]}>
          <mesh position={[0, 0.2, 0]}>
            <boxGeometry args={[0.26, 0.38, 0.3]} />
            <meshStandardMaterial color={m.alt} metalness={0.75} roughness={0.3} />
          </mesh>
          {Array.from({ length: 5 }).map((_, j) => (
            <mesh key={j} position={[0, 0.08 + j * 0.07, 0.16]}>
              <boxGeometry args={[0.22, 0.04, 0.02]} />
              <meshStandardMaterial
                color={entered && j % 2 === 0 ? accent : '#0a1020'}
                emissive={entered && j % 2 === 0 ? accent : '#000000'}
                emissiveIntensity={entered ? 0.85 : 0}
              />
            </mesh>
          ))}
        </group>
      ))}
    </RoomShell>
  )
}
