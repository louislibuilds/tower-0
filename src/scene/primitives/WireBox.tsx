import { useMemo } from 'react'
import * as THREE from 'three'

interface WireBoxProps {
  size: [number, number, number]
  position?: [number, number, number]
  color: string
  fillOpacity?: number
  fillColor?: string
}

/** Line-edged box — wireframe solid with ink edge lines */
export function WireBox({ size, position = [0, 0, 0], color, fillOpacity = 0.06, fillColor }: WireBoxProps) {
  const [w, h, d] = size
  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d)), [w, h, d])

  return (
    <group position={position}>
      {fillOpacity > 0 && (
        <mesh>
          <boxGeometry args={[w, h, d]} />
          <meshStandardMaterial color={fillColor ?? color} transparent opacity={fillOpacity} depthWrite={false} />
        </mesh>
      )}
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={color} transparent opacity={0.95} />
      </lineSegments>
    </group>
  )
}
