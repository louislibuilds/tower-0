import type { Theme } from '../../context/SiteContext'

/** R · Roof — delegates to PlateDeck typology */
export { PlateDeck as RoofRoom, RoofPlate } from '../typologies/PlateDeck'

export type RoofRoomProps = {
  theme: Theme
  entered: boolean
  bandHeight?: number
}
