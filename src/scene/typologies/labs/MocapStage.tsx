import { bpBox, bpFloorBox } from '../blueprintLayout'
import { ghostLit } from '../ghostStyle'
import { TypologyBpMesh } from '../TypologyBpMesh'
import { typologyMat, type TypologyProps } from '../types'

/** 004 · Capture Stage — green screen + ring light + tripod + monitor stack */
export function MocapStage({
  theme,
  accent,
  entered,
  active,
  thin,
  showShell = false,
}: TypologyProps & { showShell?: boolean }) {
  const m = typologyMat(theme, accent, entered)
  const lit = ghostLit(thin, entered, active)
  const green = lit ? accent : m.pal.mass

  const backdrop = bpBox(0.3, 0.15, 0.25, 3.6, 0.07, 2.4)
  const tripod = bpBox(2.1, 2.6, 0, 0.12, 0.12, 1.5)
  const lampHead = bpBox(1.82, 2.5, 1.5, 0.72, 0.4, 0.34)
  const camBar = bpBox(2.52, 2.55, 1.55, 0.2, 0.27, 0.25)
  const rack = bpBox(3.8, 0.5, 0, 0.75, 0.52, 1.65)
  const monitorBar = bpBox(3.5, 0.3, 1.65, 1.2, 0.09, 1.05)
  const monitor = bpBox(3.62, 0.32, 1.74, 0.96, 0.06, 0.82)
  const desk = bpBox(3.3, 0.22, 0, 1.45, 0.82, 0.62)
  const chair = bpBox(3.55, 1.5, 0, 0.8, 0.8, 0.48)
  const chairBack = bpBox(3.55, 2.25, 0.48, 0.8, 0.1, 0.55)

  return (
    <group>
      <TypologyBpMesh box={bpFloorBox(5, 5)} color={m.body} thin={thin} />
      <TypologyBpMesh
        box={backdrop}
        thin={thin}
        color={green}
        emissive={lit ? accent : undefined}
        emissiveIntensity={showShell ? 0.08 : 0.15}
        depthOffset={showShell ? 0.012 : 0}
      />
      <TypologyBpMesh box={tripod} color={m.edge} thin={thin} metalness={0.85} />
      <TypologyBpMesh box={lampHead} color={m.body} thin={thin} />
      <TypologyBpMesh box={camBar} thin={thin} color={lit ? accent : m.alt} emissive={lit ? accent : undefined} emissiveIntensity={0.2} />
      <TypologyBpMesh box={rack} color={m.alt} thin={thin} metalness={0.7} />
      <TypologyBpMesh box={monitorBar} thin={thin} color={lit ? accent : m.pal.glass} emissive={lit ? accent : undefined} emissiveIntensity={0.15} />
      <TypologyBpMesh box={monitor} color={m.pal.ink} thin={thin} />
      <TypologyBpMesh box={desk} color={m.body} thin={thin} />
      <TypologyBpMesh box={chair} color={m.pal.mass} thin={thin} />
      <TypologyBpMesh box={chairBack} color={m.pal.panel} thin={thin} />
    </group>
  )
}
