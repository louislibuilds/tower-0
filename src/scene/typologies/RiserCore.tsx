import { FloorPlate } from '../primitives/FloorPlate'
import { blueprintFitScale, floorPlateSize } from './interiorScale'
import { InfraRackLayout } from './layouts/InfraRackLayout'
import { typologyMat, type TypologyProps } from './types'

const QUAD_OFFSETS: [number, number][] = [
  [-0.32, 0.28],
  [0.32, 0.28],
  [-0.32, -0.28],
  [0.32, -0.28],
]

/** B2 · Infrastructure ??four rack halls filling the floor plate */
export function RiserCore({ theme, accent, entered, active = false }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered || active
  const plate = floorPlateSize('B2')
  const cellScale = blueprintFitScale(6, 5, { w: plate.w * 0.46, d: plate.d * 0.46 }, 0.88)

  return (
    <FloorPlate width={plate.w} depth={plate.d} color={m.pal.fg} floorColor={m.body} variant="grid">
      {QUAD_OFFSETS.map(([x, z], i) => (
        <group key={i} position={[x, 0.01, z]} scale={cellScale}>
          <InfraRackLayout theme={theme} accent={accent} entered={entered} active={lit} />
        </group>
      ))}
    </FloorPlate>
  )
}
