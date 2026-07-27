import { RoomShell } from '../primitives/RoomShell'
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
    <RoomShell width={interior.w} depth={interior.d} height={interior.h} color={m.pal.graphite} floorColor={m.body} openFront>
      <group position={[0, 0.02, 0]}>
        <InfraRackLayout theme={theme} accent={accent} entered={entered} active={lit} scale={layoutScale} />
      </group>
    </RoomShell>
  )
}
