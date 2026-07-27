import { BP_UNIT, bpPoint } from './typologies/blueprintLayout'
import { blueprintFitScale, floorPlateSize } from './typologies/interiorScale'

/**
 * UTS Building 1 lobby — cell grid from lobby blueprint spec
 * Row 0 = plan top / back (−Z) · Row 22 = plan bottom / main entrance (+Z facade)
 */
export const LOBBY_BLUEPRINT = { w: 34, d: 23 } as const

export const LOBBY_GRID_ROWS = 23
export const LOBBY_FRONT_ROW = LOBBY_GRID_ROWS - 1

/** Escalator 4 cells wide · stairs 6 cells (≈2–3 people vs 1–2) */
export const LOBBY_ESC_COL = 5
export const LOBBY_ESC_W = 4
export const LOBBY_STAIR_COL = 23
export const LOBBY_STAIR_W = 6

/** Main entrance on plan row 22 — cols 11–22 (auto doors on +Z facade) */
export const LOBBY_MAIN_DOOR_COL = 11
export const LOBBY_MAIN_DOOR_W = 12

/** Bay width in scene units — kept at 3 blueprint cols proportion */
export const LOBBY_DOOR_BAY_W = 3

/** Visible curtain width — matches WindowMatrix on other floors */
export const LOBBY_FACADE_WIDTH_RATIO = 0.88

/** Reception counter — plan 櫃 cols 11–20 */
export const LOBBY_COUNTER_COL = 11
export const LOBBY_COUNTER_W = 10

/** Security booth starts col 26 — right door sits flush to this edge on +Z */
export const LOBBY_SECURITY_COL = 26

export interface LobbyFacadeDoorBay {
  centerX: number
  bayW: number
}

export function lobbyColLeftX(bandWidth: number, col: number) {
  return bandWidth * (col / LOBBY_BLUEPRINT.w - 0.5)
}

export function lobbyFacadeMetrics(bandWidth: number) {
  const facadeW = bandWidth * LOBBY_FACADE_WIDTH_RATIO
  return {
    facadeW,
    facadeLeft: -facadeW / 2,
    facadeRight: facadeW / 2,
  }
}

/**
 * Three doors aligned to interior — left: escalator · center: counter · right: security edge
 * (band width ↔ blueprint 34 cols, same axis as LobbyLayout)
 */
export function lobbyDoorBaysAligned(bandWidth: number): LobbyFacadeDoorBay[] {
  const bayW = lobbyColWidth(bandWidth, LOBBY_DOOR_BAY_W)
  const securityLeft = lobbyColLeftX(bandWidth, LOBBY_SECURITY_COL)
  return [
    { centerX: lobbyColCenterX(bandWidth, LOBBY_ESC_COL, LOBBY_ESC_W), bayW },
    { centerX: lobbyColCenterX(bandWidth, LOBBY_COUNTER_COL, LOBBY_COUNTER_W), bayW },
    { centerX: securityLeft - bayW / 2, bayW },
  ]
}

export function lobbyDoorTransomSpan(bandWidth: number) {
  const bays = lobbyDoorBaysAligned(bandWidth)
  const left = bays[0].centerX - bays[0].bayW / 2
  const right = bays[2].centerX + bays[2].bayW / 2
  return { centerX: (left + right) / 2, width: right - left }
}

/** Reception counter back-wall height in blueprint z (see ReceptionBlock) */
export const LOBBY_COUNTER_BP_H = 2.05
/** Door leaf cap — ≤ 4× counter height (~ half a person each) */
export const LOBBY_DOOR_MAX_COUNTER_MULT = 4

export function lobbyCounterSceneHeight() {
  return LOBBY_COUNTER_BP_H * BP_UNIT * lobbyPlateScale()
}

export function lobbyDoorPanelHeight(bandHeight: number) {
  return Math.min(
    lobbyCounterSceneHeight() * LOBBY_DOOR_MAX_COUNTER_MULT,
    bandHeight * 0.3,
  )
}

export function lobbyColCenterX(bandWidth: number, col: number, colSpan: number) {
  return bandWidth * ((col + colSpan / 2) / LOBBY_BLUEPRINT.w - 0.5)
}

export function lobbyColWidth(bandWidth: number, colSpan: number) {
  return bandWidth * (colSpan / LOBBY_BLUEPRINT.w)
}

export function lobbyDoorSpan(bandWidth: number) {
  return lobbyDoorTransomSpan(bandWidth)
}

export function lobbyPlateScale() {
  const plate = floorPlateSize('G')
  return blueprintFitScale(LOBBY_BLUEPRINT.w, LOBBY_BLUEPRINT.d, plate, 0.94)
}

/** Plan row index → blueprint depth; aligns row 22 main door with tower +Z facade */
export function gridDepth(rowTop: number, rowSpan: number) {
  return {
    y: rowTop,
    d: rowSpan,
  }
}

export function lobbyCounterSceneX(): number {
  const scale = lobbyPlateScale()
  const { y, d } = gridDepth(10, 4)
  return bpPoint(16, y + d / 2, 0, LOBBY_BLUEPRINT.w, LOBBY_BLUEPRINT.d)[0] * scale
}
