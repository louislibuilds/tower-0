import { useMemo } from 'react'
import * as THREE from 'three'

interface FloorPlateProps {
  width: number
  depth: number
  color: string
  floorColor: string
  children?: React.ReactNode
}

/** Flat exhibit slab — top surface at y=0, flush with band floor */
export function FloorPlate({ width: w, depth: d, color, floorColor, children }: FloorPlateProps) {
  const thickness = 0.006
  const edge = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(w, thickness, d)), [w, d, thickness])

  return (
    <group>
      <mesh position={[0, -thickness / 2, 0]}>
        <boxGeometry args={[w, thickness, d]} />
        <meshStandardMaterial color={floorColor} transparent opacity={0.92} roughness={0.85} />
      </mesh>
      <lineSegments geometry={edge} position={[0, -thickness / 2, 0]}>
        <lineBasicMaterial color={color} transparent opacity={0.5} />
      </lineSegments>
      <group position={[0, 0.006, 0]}>{children}</group>
    </group>
  )
}
