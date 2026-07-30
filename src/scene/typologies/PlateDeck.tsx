import type { Theme } from '../../context/SiteContext'
import { typologyMat } from './types'

/** R · Plate Deck — helipad ring only; identity plate lives on 99F top edge */
export function PlateDeck({
  theme,
  entered,
}: {
  theme: Theme
  entered: boolean
  bandHeight?: number
}) {
  const m = typologyMat(theme, '#2F6BFF', entered)

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.016, 0]}>
        <ringGeometry args={[0.22, 0.38, 32]} />
        <meshStandardMaterial color={m.pal.mass} side={2} transparent opacity={entered ? 0.55 : 0.28} />
      </mesh>
    </group>
  )
}
