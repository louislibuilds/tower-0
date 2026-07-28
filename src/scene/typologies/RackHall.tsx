import { FloorPlate } from '../primitives/FloorPlate'
import { blueprintFitScale, floorPlateSize } from './interiorScale'
import { TechCentreLayout } from './layouts/TechCentreLayout'
import { B10_ROOM_D, B10_ROOM_W } from './layouts/b10LayoutSpec'
import { typologyMat, type TypologyProps } from './types'

/** B10 · single tech centre centred on floor plate (not quad-duplicated) */
export function RackHall({ theme, accent, entered, active }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered || active
  const plate = floorPlateSize('B10')
  const roomScale = blueprintFitScale(B10_ROOM_W, B10_ROOM_D, { w: plate.w * 0.88, d: plate.d * 0.88 }, 0.95)

  return (
    <FloorPlate width={plate.w} depth={plate.d} color={m.pal.graphite} floorColor={m.body} variant="grid">
      <group position={[0, 0.01, 0]} scale={roomScale}>
        <TechCentreLayout theme={theme} accent={accent} entered={entered} active={lit} />
      </group>
    </FloorPlate>
  )
}
