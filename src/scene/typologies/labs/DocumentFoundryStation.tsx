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

/** 005 · Document Foundry — paper stack + printer + filing */
export function DocumentFoundryStation({ theme, accent, entered, active }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered || active

  const desk = bpBox(0.3, 0.3, 0, 3.5, 1.2, 0.62)
  const printer = bpBox(2.2, 0.35, 0.62, 1.2, 0.09, 0.9)
  const cabinet = bpBox(4.0, 0.3, 0, 0.72, 1.05, 0.95)
  const cabinetTop = bpBox(4.05, 0.35, 0.95, 0.62, 0.95, 0.14)
  const chair = bpBox(1.5, 1.85, 0, 0.82, 0.82, 0.48)
  const chairBack = bpBox(1.5, 2.62, 0.48, 0.82, 0.11, 0.54)
  const sideStack = bpBox(0.2, 2.5, 0, 0.82, 0.82, 0.58)

  return (
    <group>
      <BpMesh box={desk} color={m.body} />
      {Array.from({ length: 8 }, (_, i) => {
        const sheet = bpBox(0.45 + i * 0.36, 0.38, 0.62 + i * 0.14, 0.32, 0.78, 0.13)
        const warm = i % 2 === 1
        return (
          <BpMesh
            key={i}
            box={sheet}
            color={warm ? '#e8e4dc' : '#d8d4cc'}
            emissive={warm && lit ? m.pal.chicken : undefined}
            emissiveIntensity={warm && lit ? 0.08 : 0}
          />
        )
      })}
      <BpMesh
        box={printer}
        color={lit ? accent : m.alt}
        emissive={lit ? accent : undefined}
        emissiveIntensity={0.15}
      />
      <BpMesh box={cabinet} color={m.alt} />
      <BpMesh
        box={cabinetTop}
        color={lit ? accent : m.pal.glass}
        emissive={lit ? accent : undefined}
        emissiveIntensity={0.12}
      />
      <BpMesh box={chair} color={m.pal.concrete} />
      <BpMesh box={chairBack} color={m.pal.resin} />
      <BpMesh box={sideStack} color={m.pal.concrete} />
      {Array.from({ length: 4 }, (_, i) => {
        const stack = bpBox(0.28 + i * 0.08, 2.58, 0.58 + i * 0.12, 0.55, 0.55, 0.11)
        return (
          <BpMesh
            key={i}
            box={stack}
            color="#e8e4dc"
            emissive={lit ? m.pal.chicken : undefined}
            emissiveIntensity={0.06}
          />
        )
      })}
      <mesh position={[0, 0.03, 0.05]}>
        <boxGeometry args={[0.07, 0.018, 0.04]} />
        <meshStandardMaterial
          color={lit ? m.pal.chicken : m.pal.concrete}
          emissive={lit ? m.pal.chicken : '#000'}
          emissiveIntensity={lit ? 0.45 : 0}
        />
      </mesh>
    </group>
  )
}
