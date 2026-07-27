import { useMemo } from 'react'
import * as THREE from 'three'

interface FloorPlateProps {
  width: number
  depth: number
  color: string
  floorColor: string
  children?: React.ReactNode
}

/** Flat exhibit slab — stations sit at y=0; no walls (band shell is the building) */
export function FloorPlate({ width: w, depth: d, color, floorColor, children }: FloorPlateProps) {
  const edge = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(w, 0.024, d)), [w, d])

  return (
    <group>
      <mesh position={[0, 0.012, 0]}>
        <boxGeometry args={[w, 0.024, d]} />
        <meshStandardMaterial color={floorColor} transparent opacity={0.88} roughness={0.85} />
      </mesh>
      <lineSegments geometry={edge} position={[0, 0.012, 0]}>
        <lineBasicMaterial color={color} transparent opacity={0.55} />
      </lineSegments>
      {children}
    </group>
  )
}
