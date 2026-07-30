import { bpBox } from '../blueprintLayout'
import { ghostLit, THIN_INK, THIN_MESH_OPACITY } from '../ghostStyle'
import { TypologyBpMesh } from '../TypologyBpMesh'
import { typologyMat, type TypologyProps } from '../types'

/** 003 · Interview Booth — partition + desk + mic + waveform + seat */
export function InterviewBooth({ theme, accent, entered, active, thin }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = ghostLit(thin, entered, active)
  const ghost = !!thin

  const partition = bpBox(0.4, 0.14, 0.55, 2.5, 0.09, 1.45)
  const desk = bpBox(1.0, 0.8, 0, 2.0, 1.0, 0.62)
  const monitor = bpBox(1.5, 0.85, 0.62, 0.98, 0.09, 0.75)
  const chair = bpBox(1.2, 1.9, 0, 0.72, 0.72, 0.44)
  const chairBack = bpBox(1.2, 2.58, 0.44, 0.72, 0.1, 0.52)
  const lampPole = bpBox(2.3, 2.1, 0, 0.12, 0.12, 1.45)
  const lampHead = bpBox(2.08, 2.02, 1.45, 0.54, 0.32, 0.3)
  const sideDesk = bpBox(1.0, 3.2, 0, 2.0, 1.0, 0.62)
  const sideScreen = bpBox(1.5, 3.3, 0.67, 0.88, 0.09, 0.72)

  return (
    <group>
      <TypologyBpMesh box={partition} thin={thin} color={lit ? accent : m.alt} emissive={lit ? accent : undefined} emissiveIntensity={0.12} />
      <TypologyBpMesh box={desk} color={m.body} thin={thin} />
      <TypologyBpMesh box={monitor} thin={thin} color={lit ? accent : m.pal.glass} emissive={lit ? accent : undefined} emissiveIntensity={0.2} />
      <TypologyBpMesh box={chair} color={m.pal.mass} thin={thin} />
      <TypologyBpMesh box={chairBack} color={m.pal.panel} thin={thin} />
      <TypologyBpMesh box={lampPole} color={m.edge} thin={thin} metalness={0.85} />
      <TypologyBpMesh box={lampHead} color={m.body} thin={thin} />
      <mesh position={[0.03, 0.1, 0.045]} raycast={() => null}>
        <cylinderGeometry args={[0.008, 0.008, 0.07, 6]} />
        <meshStandardMaterial
          color={ghost ? THIN_INK : m.edge}
          metalness={ghost ? 0.2 : 0.85}
          transparent={ghost}
          opacity={ghost ? THIN_MESH_OPACITY : 1}
          depthWrite={!ghost}
        />
      </mesh>
      <TypologyBpMesh box={sideDesk} color={m.body} thin={thin} opacity={0.92} />
      <TypologyBpMesh box={sideScreen} thin={thin} color={lit ? accent : m.pal.glass} emissive={lit ? accent : undefined} emissiveIntensity={0.18} />
    </group>
  )
}
