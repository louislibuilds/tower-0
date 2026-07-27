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

/** 002 · Container Bay ??vertical rack + conveyor desk + parcels */
export function ServerRackBay({ theme, accent, entered, active }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered || active
  const roomW = 6
  const roomD = 5

  const rack = bpBox(0.2, 0.2, 0, 0.85, 0.7, 3.0, roomW, roomD)
  const bench = bpBox(1.4, 0.2, 0, 3.5, 1.0, 0.62, roomW, roomD)
  const conveyorA = bpBox(1.6, 0.25, 0.62, 1.0, 0.09, 0.88, roomW, roomD)
  const conveyorB = bpBox(3.0, 0.25, 0.62, 1.3, 0.09, 0.78, roomW, roomD)
  const kiosk = bpBox(2.6, 1.4, 0, 0.8, 0.8, 0.48, roomW, roomD)
  const parcel = bpBox(2.0, 2.8, 0, 1.2, 0.9, 0.52, roomW, roomD)
  const parcelLid = bpBox(2.0, 2.8, 0.52, 1.2, 0.9, 0.82, roomW, roomD)

  return (
    <group>
      <BpMesh box={rack} color={m.alt} metalness={0.75} />
      {Array.from({ length: 7 }, (_, i) => {
        const tray = bpBox(0.25, 0.22, i * 0.36 + 0.18, 0.75, 0.6, 0.25, roomW, roomD)
        const alt = i % 2 === 1
        return (
          <BpMesh
            key={i}
            box={tray}
            color={alt && lit ? accent : m.pal.concrete}
            emissive={alt && lit ? accent : undefined}
            emissiveIntensity={0.2}
          />
        )
      })}
      <BpMesh box={bench} color={m.body} />
      <BpMesh box={conveyorA} color={lit ? accent : m.pal.glass} emissive={lit ? accent : undefined} emissiveIntensity={0.15} />
      <BpMesh box={conveyorB} color={lit ? accent : m.pal.glass} emissive={lit ? accent : undefined} emissiveIntensity={0.12} />
      <BpMesh box={kiosk} color={m.pal.resin} />
      <BpMesh
        box={parcel}
        color={lit ? m.warm : m.pal.concrete}
        emissive={lit ? m.warm : undefined}
        emissiveIntensity={0.25}
      />
      <BpMesh box={parcelLid} color={m.pal.ink} metalness={0.5} />
      {Array.from({ length: 4 }, (_, i) => {
        const cube = bpBox(3.5 + (i % 2) * 1.0, 3.0 + Math.floor(i / 2) * 1.0, i === 3 ? 0.68 : 0, 0.85, 0.85, 0.68, roomW, roomD)
        return (
          <BpMesh
            key={i}
            box={cube}
            color={lit ? m.warm : '#d8d4cc'}
            emissive={lit ? m.warm : undefined}
            emissiveIntensity={0.1}
          />
        )
      })}
    </group>
  )
}
