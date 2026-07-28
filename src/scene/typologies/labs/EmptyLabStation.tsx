import { bpBox, bpFloorBox } from '../blueprintLayout'
import { WireBox } from '../../primitives/WireBox'
import { TypologyBpMesh } from '../TypologyBpMesh'
import { typologyMat, type TypologyProps } from '../types'

/** Reserved lab suite — floor plate and empty bench volume only */
export function EmptyLabStation({
  theme,
  accent,
  entered,
  active,
  thin,
}: TypologyProps & { active?: boolean; showShell?: boolean }) {
  const m = typologyMat(theme, accent, entered)
  const roomW = 5
  const roomD = 5
  const bench = bpBox(1.6, 1.8, 0, 1.8, 1.2, 0.55, roomW, roomD)

  return (
    <group>
      <TypologyBpMesh box={bpFloorBox(roomW, roomD)} color={m.body} thin={thin} />
      <TypologyBpMesh box={bench} color={m.alt} thin={thin} />
      {!thin && (
        <WireBox
          position={bench.position}
          size={bench.size}
          color={m.pal.mute}
          fillOpacity={active ? 0.05 : 0.02}
          lineOpacity={active ? 0.72 : 0.38}
          passive
        />
      )}
    </group>
  )
}
