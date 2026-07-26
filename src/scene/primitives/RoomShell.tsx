import { useMemo } from 'react'
import * as THREE from 'three'
import { WireBox } from './WireBox'

interface RoomShellProps {
  width: number
  depth: number
  height: number
  position?: [number, number, number]
  color: string
  floorColor?: string
  openFront?: boolean
  children?: React.ReactNode
}

/** Interior room volume — floor + walls, open front for cutaway view */
export function RoomShell({
  width: w,
  depth: d,
  height: h,
  position = [0, 0, 0],
  color,
  floorColor,
  openFront = true,
  children,
}: RoomShellProps) {
  const wallT = 0.04
  const backEdges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, wallT)), [w, h])
  const sideEdges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(wallT, h, d)), [h, d])
  const ceilEdges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(w, 0.02, d)), [w, d])

  return (
    <group position={position}>
      <WireBox
        size={[w, 0.03, d]}
        position={[0, -h / 2 + 0.01, 0]}
        color={color}
        fillOpacity={0.1}
        fillColor={floorColor ?? color}
      />

      <mesh position={[0, 0, -d / 2 + wallT / 2]}>
        <boxGeometry args={[w, h, wallT]} />
        <meshStandardMaterial color={floorColor ?? color} transparent opacity={0.22} />
      </mesh>
      <lineSegments geometry={backEdges} position={[0, 0, -d / 2 + wallT / 2]}>
        <lineBasicMaterial color={color} />
      </lineSegments>

      <mesh position={[-w / 2 + wallT / 2, 0, 0]}>
        <boxGeometry args={[wallT, h, d]} />
        <meshStandardMaterial transparent opacity={0.15} color={floorColor ?? color} />
      </mesh>
      <lineSegments geometry={sideEdges} position={[-w / 2 + wallT / 2, 0, 0]}>
        <lineBasicMaterial color={color} transparent opacity={0.65} />
      </lineSegments>

      <mesh position={[w / 2 - wallT / 2, 0, 0]}>
        <boxGeometry args={[wallT, h, d]} />
        <meshStandardMaterial transparent opacity={0.15} color={floorColor ?? color} />
      </mesh>
      <lineSegments geometry={sideEdges} position={[w / 2 - wallT / 2, 0, 0]}>
        <lineBasicMaterial color={color} transparent opacity={0.65} />
      </lineSegments>

      {!openFront && (
        <WireBox size={[w, h, wallT]} position={[0, 0, d / 2 - wallT / 2]} color={color} fillOpacity={0.12} />
      )}

      <lineSegments geometry={ceilEdges} position={[0, h / 2, 0]}>
        <lineBasicMaterial color={color} transparent opacity={0.35} />
      </lineSegments>

      <group position={[0, -h / 2 + 0.02, 0]}>{children}</group>
    </group>
  )
}

/** Back-wall mounted panel (bookshelf, cert wall) */
export function BackWallPanel({
  width,
  height,
  depth,
  roomDepth,
  color,
  accent,
  active,
}: {
  width: number
  height: number
  depth: number
  roomDepth: number
  color: string
  accent: string
  active?: boolean
}) {
  const z = -roomDepth / 2 + depth / 2 + 0.04
  return (
    <WireBox
      size={[width, height, depth]}
      position={[0, height / 2, z]}
      color={active ? accent : color}
      fillOpacity={0.12}
    />
  )
}
