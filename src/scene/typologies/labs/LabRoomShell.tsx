import { bpBox, bpFloorBox } from '../blueprintLayout'
import { TypologyBpMesh } from '../TypologyBpMesh'
import { typologyMat, type TypologyProps } from '../types'

/** Back + side walls revealed on zoom morph (mirrors LibraryStackLayout showShell) */
export function LabRoomShell({
  theme,
  accent,
  entered,
  thin,
  showShell = false,
  roomW = 5,
  roomD = 5,
}: TypologyProps & { showShell?: boolean; roomW?: number; roomD?: number }) {
  if (!showShell) return null

  const m = typologyMat(theme, accent, entered)
  const dark = theme === 'dark'
  const shellFill = dark ? m.pal.bpFace : m.alt

  return (
    <>
      <TypologyBpMesh box={bpFloorBox(roomW, roomD)} color={m.body} thin={thin} />
      <TypologyBpMesh
        box={bpBox(0, 0, 0, roomW, 0.12, 2.8, roomW, roomD)}
        color={shellFill}
        thin={thin}
        emissive={dark && !thin ? m.pal.neon : undefined}
        emissiveIntensity={dark && !thin ? 0.08 : 0}
      />
      <TypologyBpMesh
        box={bpBox(0, 0, 0, 0.12, roomD, 2.8, roomW, roomD)}
        color={shellFill}
        thin={thin}
        emissive={dark && !thin ? m.pal.neon : undefined}
        emissiveIntensity={dark && !thin ? 0.06 : 0}
      />
    </>
  )
}
