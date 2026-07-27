import type { Object3D } from 'three'

/** Marker — ThinnedStation must never disable raycast on interactive pick meshes */
export const TOWER_PICK_USERDATA = 'towerPick' as const

export function markTowerPick(obj: Object3D | null) {
  if (obj) obj.userData[TOWER_PICK_USERDATA] = true
}

export function isTowerPick(obj: Object3D): boolean {
  return obj.userData[TOWER_PICK_USERDATA] === true
}
