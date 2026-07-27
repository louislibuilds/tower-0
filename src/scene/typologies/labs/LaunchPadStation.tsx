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

/** 001 · Launch Pad — hackathon arena (5×5 grid, matches other labs) */
export function LaunchPadStation({ theme, accent, entered, active }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered || active
  const roomW = 5
  const roomD = 5

  const runway = bpBox(2.0, 0.35, 0, 0.22, 3.0, 0.08, roomW, roomD)
  const netPostA = bpBox(1.95, 0.28, 0, 0.12, 0.12, 0.75, roomW, roomD)
  const netPostB = bpBox(1.95, 3.72, 0, 0.12, 0.12, 0.75, roomW, roomD)
  const observer = bpBox(0.35, 1.15, 0, 0.72, 0.72, 0.82, roomW, roomD)
  const observerSeat = bpBox(0.55, 1.2, 0.82, 0.38, 0.38, 0.46, roomW, roomD)
  const signalTower = bpBox(4.05, 1.25, 0, 0.18, 1.6, 1.45, roomW, roomD)
  const mapScreen = bpBox(2.45, 0.32, 0.52, 1.0, 0.08, 0.62, roomW, roomD)
  const weatherPanel = bpBox(3.55, 0.32, 0.52, 0.68, 0.08, 0.48, roomW, roomD)

  return (
    <group>
      <BpMesh box={runway} color={m.body} />
      <BpMesh box={netPostA} color={m.edge} metalness={0.85} />
      <BpMesh box={netPostB} color={m.edge} metalness={0.85} />
      <BpMesh box={observer} color={m.alt} />
      <BpMesh box={observerSeat} color={m.pal.resin} />
      <BpMesh
        box={signalTower}
        color={lit ? accent : m.pal.glass}
        emissive={lit ? accent : undefined}
        emissiveIntensity={0.22}
      />
      <BpMesh
        box={mapScreen}
        color={lit ? accent : m.pal.glass}
        emissive={lit ? accent : undefined}
        emissiveIntensity={0.18}
      />
      <BpMesh
        box={weatherPanel}
        color={lit ? accent : m.pal.glass}
        emissive={lit ? accent : undefined}
        emissiveIntensity={0.15}
      />
      <mesh position={[0.02, 0.12, 0.04]}>
        <boxGeometry args={[0.1, 0.06, 0.012]} />
        <meshStandardMaterial
          color={lit ? accent : m.pal.glass}
          emissive={lit ? accent : '#000'}
          emissiveIntensity={lit ? 0.18 : 0}
        />
      </mesh>
    </group>
  )
}
