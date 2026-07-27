import type { BpBox } from './blueprintLayout'
import { THIN_INK, THIN_MESH_OPACITY } from './ghostStyle'

export function TypologyBpMesh({
  box,
  color,
  thin = false,
  emissive,
  emissiveIntensity = 0,
  metalness = 0.2,
  opacity = 1,
  depthOffset = 0,
}: {
  box: BpBox
  color: string
  thin?: boolean
  emissive?: string
  emissiveIntensity?: number
  metalness?: number
  opacity?: number
  depthOffset?: number
}) {
  const ghost = !!thin
  const [x, y, z] = box.position
  const usePolygonOffset = depthOffset !== 0

  return (
    <mesh position={[x, y, z + depthOffset]} raycast={() => null}>
      <boxGeometry args={box.size} />
      <meshStandardMaterial
        color={ghost ? THIN_INK : color}
        emissive={ghost ? '#000000' : (emissive ?? '#000000')}
        emissiveIntensity={ghost ? 0 : emissiveIntensity}
        metalness={metalness}
        transparent={ghost || opacity < 1}
        opacity={ghost ? THIN_MESH_OPACITY : opacity}
        depthWrite={!ghost && opacity >= 1}
        polygonOffset={usePolygonOffset}
        polygonOffsetFactor={usePolygonOffset ? -1 : 0}
        polygonOffsetUnits={usePolygonOffset ? -1 : 0}
      />
    </mesh>
  )
}
