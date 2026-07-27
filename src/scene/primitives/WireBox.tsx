import { useMemo } from 'react'
import * as THREE from 'three'

interface WireBoxProps {
  size: [number, number, number]
  position?: [number, number, number]
  color: string
  fillOpacity?: number
  fillColor?: string
  /** Decorative only — do not steal pointer hits */
  passive?: boolean
  lineOpacity?: number
  /** Draw on top of scene geometry (pick guides) */
  overlay?: boolean
}

/** Line-edged box — wireframe solid with ink edge lines */
export function WireBox({
  size,
  position = [0, 0, 0],
  color,
  fillOpacity = 0.06,
  fillColor,
  passive = false,
  lineOpacity = 0.95,
  overlay = false,
}: WireBoxProps) {
  const [w, h, d] = size
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d)), [w, h, d])
  const skipRay = passive ? () => null : undefined
  const depthProps = overlay ? { depthTest: false as const, depthWrite: false as const } : {}

  return (
    <group position={position} renderOrder={overlay ? 20 : 0}>
      {fillOpacity > 0 && (
        <mesh raycast={skipRay}>
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial
            color={fillColor ?? color}
            transparent
            opacity={fillOpacity}
            depthWrite={false}
            {...depthProps}
          />
        </mesh>
      )}
      <lineSegments geometry={edges} raycast={skipRay}>
        <lineBasicMaterial color={color} transparent opacity={lineOpacity} {...depthProps} />
      </lineSegments>
    </group>
  )
}
