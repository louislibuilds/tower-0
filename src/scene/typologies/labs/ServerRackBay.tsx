import { bpBox } from '../blueprintLayout'
import { ghostLit } from '../ghostStyle'
import { TypologyBpMesh } from '../TypologyBpMesh'
import { typologyMat, type TypologyProps } from '../types'

/** 002 · Container Bay — vertical rack + conveyor desk + parcels */
export function ServerRackBay({ theme, accent, entered, active, thin }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = ghostLit(thin, entered, active)
  const roomW = 6
  const roomD = 5

  const rack = bpBox(0.2, 0.2, 0, 0.85, 0.7, 3.0, roomW, roomD)
  const bench = bpBox(1.4, 0.2, 0, 3.5, 1.0, 0.62, roomW, roomD)
  const conveyorA = bpBox(1.6, 0.25, 0.62, 1.0, 0.09, 0.88, roomW, roomD)
  const conveyorB = bpBox(3.0, 0.25, 0.62, 1.3, 0.09, 0.78, roomW, roomD)
  const kiosk = bpBox(2.6, 1.4, 0, 0.8, 0.8, 0.48, roomW, roomD)
  const parcel = bpBox(2.0, 2.8, 0, 1.2, 0.9, 0.52, roomW, roomD)
  const parcelLid = bpBox(2.0, 2.8, 0.52, 1.2, 0.9, 0.82, roomW, roomD)
  const extraParcels: [number, number, number][] = [
    [3.5, 3.0, 0],
    [3.5, 4.0, 0],
    [4.5, 3.2, 0],
    [4.5, 3.2, 0.68],
  ]

  return (
    <group>
      <TypologyBpMesh box={rack} color={m.alt} thin={thin} metalness={0.75} />
      {Array.from({ length: 7 }, (_, i) => {
        const tray = bpBox(0.25, 0.22, i * 0.36 + 0.18, 0.75, 0.6, 0.25, roomW, roomD)
        const alt = i % 2 === 1
        return (
          <TypologyBpMesh
            key={i}
            box={tray}
            thin={thin}
            color={alt && lit ? accent : m.pal.mass}
            emissive={alt && lit ? accent : undefined}
            emissiveIntensity={0.2}
          />
        )
      })}
      <TypologyBpMesh box={bench} color={m.body} thin={thin} />
      <TypologyBpMesh box={conveyorA} thin={thin} color={lit ? accent : m.pal.glass} emissive={lit ? accent : undefined} emissiveIntensity={0.15} />
      <TypologyBpMesh box={conveyorB} thin={thin} color={lit ? accent : m.pal.glass} emissive={lit ? accent : undefined} emissiveIntensity={0.12} />
      <TypologyBpMesh box={kiosk} color={m.pal.panel} thin={thin} />
      <TypologyBpMesh
        box={parcel}
        thin={thin}
        color={lit ? m.warm : m.pal.mass}
        emissive={lit ? m.warm : undefined}
        emissiveIntensity={0.25}
      />
      <TypologyBpMesh box={parcelLid} color={m.pal.ink} thin={thin} metalness={0.5} />
      {extraParcels.map(([x, y, z], i) => {
        const cube = bpBox(x, y, z, 0.85, 0.85, 0.68, roomW, roomD)
        return (
          <TypologyBpMesh
            key={i}
            box={cube}
            thin={thin}
            color={lit ? m.warm : '#d8d4cc'}
            emissive={lit ? m.warm : undefined}
            emissiveIntensity={0.1}
          />
        )
      })}
    </group>
  )
}
