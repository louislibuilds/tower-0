import { getProgramFloor, programCenterY } from '../scene/towerGeometry'

export type FloorId = 'B10' | 'B2' | 'G' | '23' | '52' | '99' | 'roof'

export interface FloorDef {
  id: FloorId
  label: string
  code: string
  zone: 'basement' | 'ground' | 'tower' | 'roof'
  title: string
  subtitle: string
  floorNumber: number
  elevation: number
  yCenter: number
}

function def(
  id: FloorId,
  label: string,
  zone: FloorDef['zone'],
  title: string,
  subtitle: string,
  floorNumber: number,
  elevation: number,
): FloorDef {
  const pf = getProgramFloor(id)
  return {
    id,
    label,
    code: label,
    zone,
    title,
    subtitle,
    floorNumber,
    elevation,
    yCenter: programCenterY(pf),
  }
}

export const FLOORS: FloorDef[] = [
  def('B10', 'B10', 'basement', 'Printer', 'Social · Print Resume', -10, 0),
  def('B2', 'B2', 'basement', 'Infrastructure', 'Skills · Tech & Soft', -2, 1),
  def('G', 'G', 'ground', 'Lobby', 'Welcome · About · Thesis', 0, 2),
  def('23', '23', 'tower', 'Factory', 'Academic Timeline · Semester Lines', 23, 3),
  def('52', '52', 'tower', 'Laboratory', 'Group Projects · Research', 52, 4),
  def('99', '99', 'tower', 'Library & Archive', 'Awards · Credentials · Leadership', 99, 5),
  def('roof', 'R', 'roof', 'Roof', 'Contact · Identity Plate', 101, 6),
]

export const DEFAULT_FLOOR: FloorId = 'G'

export function getFloor(id: FloorId): FloorDef {
  return FLOORS.find((f) => f.id === id) ?? FLOORS[2]
}
