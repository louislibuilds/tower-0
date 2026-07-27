import { bpBox } from '../blueprintLayout'
import { typologyMat, type TypologyProps } from '../types'

function BpMesh({
  box,
  color,
  emissive,
  emissiveIntensity = 0,
}: {
  box: ReturnType<typeof bpBox>
  color: string
  emissive?: string
  emissiveIntensity?: number
}) {
  return (
    <mesh position={box.position}>
      <boxGeometry args={box.size} />
      <meshStandardMaterial color={color} emissive={emissive ?? '#000'} emissiveIntensity={emissiveIntensity} />
    </mesh>
  )
}

/** Back + side walls revealed on zoom morph (mirrors LibraryStackLayout showShell) */
export function LabRoomShell({
  theme,
  accent,
  entered,
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
      <BpMesh
        box={bpBox(0, 0, 0, roomW, 0.12, 2.8, roomW, roomD)}
        color={shellFill}
        emissive={dark ? m.pal.neon : undefined}
        emissiveIntensity={dark ? 0.08 : 0}
      />
      <BpMesh
        box={bpBox(0, 0, 0, 0.12, roomD, 2.8, roomW, roomD)}
        color={shellFill}
        emissive={dark ? m.pal.neon : undefined}
        emissiveIntensity={dark ? 0.06 : 0}
      />
    </>
  )
}
