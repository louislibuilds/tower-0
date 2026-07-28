import { useGroundWashTexture } from './textures'
import { usePalette } from './InkEdges'

interface GroundWashProps {
  position?: [number, number, number]
  width: number
  depth: number
  opacity?: number
}

/** Broad authored darkening under footprint — building sits in cast concrete. */
export function GroundWash({ position = [0, 0.004, 0], width, depth, opacity = 0.5 }: GroundWashProps) {
  const tex = useGroundWashTexture()
  const pal = usePalette()
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={position} raycast={() => null}>
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
