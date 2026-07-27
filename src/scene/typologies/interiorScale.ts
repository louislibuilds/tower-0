import { BP_UNIT } from './blueprintLayout'
import { getProgramFloor } from '../towerGeometry'

/** Interior must stay inside the exhibit band shell */
export function bandInterior(bandW: number, bandD: number, bandH: number) {
  return {
    w: bandW * 0.82,
    d: bandD * 0.82,
    h: bandH * 0.68,
  }
}

/** Scale blueprint room grid to fit a target footprint */
export function blueprintFitScale(
  roomW: number,
  roomD: number,
  target: { w: number; d: number },
  margin = 0.92,
) {
  const bw = roomW * BP_UNIT
  const bd = roomD * BP_UNIT
  return Math.min(target.w / bw, target.d / bd) * margin
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

/** One half-zone inside 99F when library or archive is expanded */
export function vaultZoneInterior() {
  const interior = vault99Interior()
  return {
    w: interior.w * 0.52,
    d: interior.d * 0.88,
    h: interior.h * 0.94,
  }
}

export function factory23Interior() {
  const band = getProgramFloor('23')
  return bandInterior(band.width, band.depth, band.bandHeight)
}

export function infraB2Interior() {
  const band = getProgramFloor('B2')
  return bandInterior(band.width, band.depth, band.bandHeight)
}

export function techB10Interior() {
  const band = getProgramFloor('B10')
  return bandInterior(band.width, band.depth, band.bandHeight)
}
