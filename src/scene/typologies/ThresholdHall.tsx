import { FloorPlate } from '../primitives/FloorPlate'
import { lobbyPlateScale } from '../lobbyBlueprint'
import { floorPlateSize } from './interiorScale'
import { LobbyLayout } from './layouts/LobbyLayout'
import { typologyMat, type TypologyProps } from './types'

/** G · Threshold Hall ??UTS Building 1 lobby (counter, escalator, stairs, security) */
export function ThresholdHall({ theme, accent, entered }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const plate = floorPlateSize('G')
  const scale = lobbyPlateScale()

  return (
    <FloorPlate width={plate.w} depth={plate.d} color={m.pal.fg} floorColor={m.body}>
      <group scale={scale}>
        <LobbyLayout theme={theme} accent={accent} entered={entered} />
      </group>
    </FloorPlate>
  )
}
