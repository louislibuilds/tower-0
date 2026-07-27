import { getProgramFloor } from '../towerGeometry'

/** Interior must stay inside the exhibit band shell */
export function bandInterior(bandW: number, bandD: number, bandH: number) {
  return {
    w: bandW * 0.82,
    d: bandD * 0.82,
    h: bandH * 0.68,
  }
}

/** Single lab station footprint inside a chunk shell */
export const STATION_OVERVIEW = { w: 0.3, d: 0.24, h: 0.22 } as const

export function lab52Interior() {
  const band = getProgramFloor('52')
  return bandInterior(band.width, band.depth, band.bandHeight)
}

export function vault99Interior() {
  const band = getProgramFloor('99')
  return bandInterior(band.width, band.depth, band.bandHeight)
}
