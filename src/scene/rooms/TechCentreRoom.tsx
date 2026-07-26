import { WireBox } from '../primitives/WireBox'
import { getScenePalette } from '../palette'
import { themeMat, type RoomProps } from './types'

/** B10 · Tech Centre — server rack rows */
export function TechCentreRoom({ theme, accent, entered }: RoomProps) {
  const m = themeMat(theme, accent, entered)
  const pal = getScenePalette(theme)

  return (
    <group>
      <WireBox size={[1.1, 0.03, 0.75]} position={[0, -0.08, 0]} color={pal.graphite} fillOpacity={0.08} fillColor={m.body} />

      {[-0.42, 0, 0.42].map((x, i) => (
        <group key={i} position={[x, 0.02, 0]}>
          <WireBox size={[0.32, 0.72, 0.36]} position={[0, 0.08, 0]} color={entered ? accent : pal.graphite} fillOpacity={0.08} fillColor={m.alt} />
          {Array.from({ length: 6 }).map((_, j) => (
            <mesh key={j} position={[0, 0.3 - j * 0.11, 0.19]}>
              <boxGeometry args={[0.26, 0.05, 0.025]} />
              <meshStandardMaterial
                color={entered && j % 2 === 0 ? accent : '#0a1020'}
                emissive={entered && j % 2 === 0 ? accent : '#000000'}
                emissiveIntensity={entered ? 0.85 : 0}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}
