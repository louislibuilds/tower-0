import { FloorPlate } from '../primitives/FloorPlate'
import { blueprintFitScale, infraB2Interior } from './interiorScale'
import { InfraRackLayout } from './layouts/InfraRackLayout'
import { typologyMat, type TypologyProps } from './types'

const QUAD_OFFSETS: [number, number][] = [
  [-0.26, 0.22],
  [0.26, 0.22],
  [-0.26, -0.22],
  [0.26, -0.22],
]

/** B2 · Infrastructure — four rack halls filling the floor plate */
export function RiserCore({ theme, accent, entered, active = false }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered || active
  const interior = infraB2Interior()
  const cellScale = blueprintFitScale(6, 5, { w: interior.w * 0.46, d: interior.d * 0.46 }, 0.88)

  return (
    <FloorPlate width={interior.w} depth={interior.d} color={m.pal.graphite} floorColor={m.body}>
      {QUAD_OFFSETS.map(([x, z], i) => (
        <group key={i} position={[x, 0, z]} scale={cellScale}>
          <InfraRackLayout theme={theme} accent={accent} entered={entered} active={lit} />
        </group>
      ))}
    </FloorPlate>
  )
}
