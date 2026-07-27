import { BP_UNIT } from './blueprintLayout'
import { getProgramFloor } from '../towerGeometry'

/**
 * Architectural norm: one exhibit station ≈ 1/5–1/6 of floor plate width
 * (typical office floor ~40 m, private suite ~6–8 m).
 */
export const STATION_FLOOR_RATIO = 1 / 5.5
export const BLUEPRINT_FIT_MARGIN = 0.58

/** Interior working area (legacy layouts) */
export function bandInterior(bandW: number, bandD: number, bandH: number) {
  return {
    w: bandW * 0.78,
    d: bandD * 0.78,
    h: bandH * 0.62,
  }
}

/** Floor plate flush with exhibit band bottom face */
export function bandPlateSize(bandW: number, bandD: number) {
  return { w: bandW * 0.96, d: bandD * 0.96 }
}

export function floorPlateSize(floorId: import('../../building/program').FloorId) {
  const band = getProgramFloor(floorId)
  return bandPlateSize(band.width, band.depth)
}

/** Scale blueprint room grid to fit a target footprint */
export function blueprintFitScale(
  roomW: number,
  roomD: number,
  target: { w: number; d: number },
  margin = BLUEPRINT_FIT_MARGIN,
) {
  const bw = roomW * BP_UNIT
  const bd = roomD * BP_UNIT
  return Math.min(target.w / bw, target.d / bd) * margin
}

/** Fit a blueprint typology inside an exhibit chunk footprint */
export function stationBlueprintScale(
  roomW: number,
  roomD: number,
  footprint: { w: number; d: number },
  margin = BLUEPRINT_FIT_MARGIN,
) {
  const fit = blueprintFitScale(roomW, roomD, footprint, margin)
  const maxW = footprint.w * STATION_FLOOR_RATIO * (roomW / 5)
  const bw = roomW * BP_UNIT
  return Math.min(fit, maxW / bw)
}

/** Single lab station footprint inside a chunk shell */
export const STATION_OVERVIEW = { w: 0.22, d: 0.18, h: 0.16 } as const

/** Blueprint grid size per lab slug */
export const LAB_BLUEPRINT_DIMS: Record<string, [number, number]> = {
  'unihack-2026': [8, 5],
  'cloud-computing': [6, 5],
  nlp: [5, 5],
  dl: [5, 5],
  kata: [5, 5],
}

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
