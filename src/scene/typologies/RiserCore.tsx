import { FloorPlate } from '../primitives/FloorPlate'
import { blueprintFitScale, infraB2Interior } from './interiorScale'
import { InfraRackLayout } from './layouts/InfraRackLayout'
import { typologyMat, type TypologyProps } from './types'

/** B2 · Infrastructure ??blueprint rack hall */
export function RiserCore({ theme, accent, entered, active = false }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered || active
  const interior = infraB2Interior()
  const layoutScale = blueprintFitScale(6, 5, interior)

  return (
    <FloorPlate width={interior.w} depth={interior.d} color={m.pal.graphite} floorColor={m.body}>
      <group scale={layoutScale}>
        <InfraRackLayout theme={theme} accent={accent} entered={entered} active={lit} />
      </group>
    </FloorPlate>
  )
}
