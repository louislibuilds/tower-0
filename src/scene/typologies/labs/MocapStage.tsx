import { bpBox } from '../blueprintLayout'
import { typologyMat, type TypologyProps } from '../types'

function BpMesh({
  box,
  color,
  emissive,
  emissiveIntensity = 0,
  metalness = 0.2,
}: {
  box: ReturnType<typeof bpBox>
  color: string
  emissive?: string
  emissiveIntensity?: number
  metalness?: number
}) {
  return (
    <mesh position={box.position}>
      <boxGeometry args={box.size} />
      <meshStandardMaterial
        color={color}
        emissive={emissive ?? '#000'}
        emissiveIntensity={emissiveIntensity}
        metalness={metalness}
      />
    </mesh>
  )
}

/** 004 · Capture Stage ??green screen + ring light + tripod + monitor stack */
export function MocapStage({ theme, accent, entered, active }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered || active
  const green = lit ? accent : m.pal.concrete

  const floorTint = bpBox(0, 0, 0, 5, 0.12, 3.2, 5, 5)
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
      <BpMesh box={floorTint} color={green} emissive={lit ? accent : undefined} emissiveIntensity={0.06} />
      <BpMesh box={backdrop} color={green} emissive={lit ? accent : undefined} emissiveIntensity={0.15} />
      <BpMesh box={tripod} color={m.edge} metalness={0.85} />
      <BpMesh box={lampHead} color={m.body} />
      <BpMesh box={camBar} color={lit ? accent : m.alt} emissive={lit ? accent : undefined} emissiveIntensity={0.2} />
      <BpMesh box={rack} color={m.alt} metalness={0.7} />
      <BpMesh box={monitorBar} color={lit ? accent : m.pal.glass} emissive={lit ? accent : undefined} emissiveIntensity={0.15} />
      <BpMesh box={monitor} color={m.pal.ink} />
      <BpMesh box={desk} color={m.body} />
      <BpMesh box={chair} color={m.pal.concrete} />
      <BpMesh box={chairBack} color={m.pal.resin} />
    </group>
  )
}
