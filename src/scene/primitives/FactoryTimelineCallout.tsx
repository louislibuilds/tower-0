import { Html, Line } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { usePalette } from './InkEdges'

export interface FactoryTimelineCalloutProps {
  /** e.g. Area 01 */
  area: string
  /** e.g. 2024 SPR — ruled on the timeline datum */
  semester: string
  active?: boolean
  hidden?: boolean
  /** Crate stack top — leader anchor (local Y) */
  anchorY?: number
  /** Shared timeline datum height (local Y) */
  timelineY?: number
  /** Stagger above datum so labels don't overlap */
  labelOffset?: number
  labelZ?: number
}

/**
 * Factory L1 timeline callout — label on datum + dashed leader to crate stack.
 */
export function FactoryTimelineCallout({
  area,
  semester,
  active = false,
  hidden = false,
  anchorY = 0.12,
  timelineY = 0.38,
  labelOffset = 0.06,
  labelZ = 0.08,
}: FactoryTimelineCalloutProps) {
  const pal = usePalette()
  const labelY = timelineY + labelOffset

  const lineColor = active ? pal.signal : pal.mute
  const points = useMemo(
    () => [
      new THREE.Vector3(0, anchorY, 0),
      new THREE.Vector3(0, timelineY, 0),
    ],
    [anchorY, timelineY],
  )

  if (hidden) return null

  const cls = [
    'site-caption',
    'site-caption--above',
    active ? 'site-caption--note' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <group>
      <Line
        points={points}
        color={lineColor}
        lineWidth={1}
        transparent
        opacity={active ? 0.92 : 0.68}
        dashed
        dashSize={0.014}
        gapSize={0.01}
      />
      <Html
        position={[0, labelY, labelZ]}
        zIndexRange={[80, 0]}
        className="site-caption-wrap"
        wrapperClass="site-caption-html"
        style={{ pointerEvents: 'none' }}
        sprite
      >
        <div className={cls}>
          <span>{semester.toUpperCase()}</span>
          <span>{area.toUpperCase()}</span>
        </div>
      </Html>
    </group>
  )
}
