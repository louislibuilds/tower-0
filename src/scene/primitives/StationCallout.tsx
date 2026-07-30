import { Html, Line } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { usePalette } from './InkEdges'

export interface StationCalloutProps {
  /** Short station code — e.g. 001, LIB, 52 */
  code: string
  /** One-line title; detail lives in ExhibitOverlay */
  title: string
  active?: boolean
  hidden?: boolean
  /** Top of station anchor (local Y) */
  anchorY?: number
  /** Label center offset from anchor [x, y, z] in local space */
  offset?: [number, number, number]
  /** Band-edge labels: no leader line */
  edge?: boolean
  /** Wall certificate hover — solid card, wrapped title */
  credential?: boolean
  /** Floor overview — slightly larger type, leader to station top */
  overview?: boolean
}

/**
 * Architectural station callout — paper card + optional leader line.
 * Overview only; hide when zooming into room (ExhibitOverlay carries narrative).
 */
export function StationCallout({
  code,
  title,
  active = false,
  hidden = false,
  anchorY = 0.42,
  offset = [0, 0.32, 0.18],
  edge = false,
  credential = false,
  overview = false,
}: StationCalloutProps) {
  const pal = usePalette()

  const [ax, ay, az] = [0, anchorY, 0]
  const [lx, ly, lz] = [offset[0], anchorY + offset[1], offset[2]]

  const lineColor = active ? pal.accent : pal.muted
  const points = useMemo(
    () => [new THREE.Vector3(ax, ay, az), new THREE.Vector3(lx, ly, lz)],
    [ax, ay, az, lx, ly, lz],
  )

  if (hidden) return null

  return (
    <group>
      {!edge && (
        <Line
          points={points}
          color={lineColor}
          lineWidth={1}
          transparent
          opacity={active ? 0.95 : 0.72}
        />
      )}
      <Html
        position={[lx, ly, lz]}
        center
        zIndexRange={[80, 0]}
        style={{ pointerEvents: 'none' }}
      >
        <div
          className={`station-callout ${active ? 'station-callout--active' : ''} ${edge ? 'station-callout--edge' : ''} ${credential ? 'station-callout--credential' : ''} ${overview ? 'station-callout--overview' : ''}`}
        >
          <span className="station-callout__code">{code}</span>
          <span className="station-callout__title">{title}</span>
        </div>
      </Html>
    </group>
  )
}
