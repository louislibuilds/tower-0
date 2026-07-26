import { useSoftShadowTexture } from './textures'
import { usePalette } from './InkEdges'

interface BlobShadowProps {
  position: [number, number, number]
  width: number
  depth: number
  opacity?: number
}

/** Authored maquette shadow — soft, zero runtime shadow map cost. */
export function BlobShadow({ position, width, depth, opacity = 0.3 }: BlobShadowProps) {
  const tex = useSoftShadowTexture()
  const pal = usePalette()
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={position}>
      <planeGeometry args={[width, depth]} />
      <meshBasicMaterial
        map={tex}
        color={pal.graphite}
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </mesh>
  )
}
