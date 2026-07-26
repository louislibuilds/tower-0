import { getProgramFloor } from '../towerGeometry'

/** Interior must stay inside the exhibit band shell */
export function bandInterior(bandW: number, bandD: number, bandH: number) {
  return {
    w: bandW * 0.82,
    d: bandD * 0.82,
    h: bandH * 0.68,
  }
}

/** Single lab station footprint (~15% of 52F band) */
export const STATION_OVERVIEW = { w: 0.22, d: 0.18, h: 0.2 } as const

export function lab52Interior() {
  const band = getProgramFloor('52')
  return bandInterior(band.width, band.depth, band.bandHeight)
}
