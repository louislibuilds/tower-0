import { bpBox, bpFloorBox } from '../blueprintLayout'
import { ghostLit, THIN_INK, THIN_MESH_OPACITY } from '../ghostStyle'
import { TypologyBpMesh } from '../TypologyBpMesh'
import { typologyMat, type TypologyProps } from '../types'

const ROOM_W = 6
const ROOM_D = 5

/** 006 · NAGI — writer's study: desk, monitor, chair, wall bookshelves */
export function NagiStation({ theme, accent, entered, active, thin }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = ghostLit(thin, entered, active)
  const ghost = !!thin

  const desk = bpBox(1.4, 1.6, 0, 2.4, 1.05, 0.62, ROOM_W, ROOM_D)
  const monitor = bpBox(2.0, 1.65, 0.62, 1.05, 0.09, 0.78, ROOM_W, ROOM_D)
  const keyboard = bpBox(2.05, 1.62, 0.615, 0.72, 0.42, 0.06, ROOM_W, ROOM_D)
  const chair = bpBox(2.0, 2.75, 0, 0.78, 0.78, 0.46, ROOM_W, ROOM_D)
  const chairBack = bpBox(2.0, 3.48, 0.46, 0.78, 0.11, 0.52, ROOM_W, ROOM_D)
  const shelfL = bpBox(0.15, 4.05, 0, 1.05, 0.32, 1.85, ROOM_W, ROOM_D)
  const shelfR = bpBox(4.8, 4.05, 0, 1.05, 0.32, 1.85, ROOM_W, ROOM_D)
  const lampPole = bpBox(3.35, 1.55, 0.62, 0.1, 0.1, 0.55, ROOM_W, ROOM_D)
  const lampHead = bpBox(3.15, 1.48, 1.17, 0.48, 0.28, 0.22, ROOM_W, ROOM_D)
  const sideTable = bpBox(0.35, 2.2, 0, 0.72, 0.72, 0.52, ROOM_W, ROOM_D)
  const mug = bpBox(0.42, 2.28, 0.52, 0.22, 0.22, 0.28, ROOM_W, ROOM_D)

  return (
    <group>
      <TypologyBpMesh box={bpFloorBox(ROOM_W, ROOM_D)} color={m.body} thin={thin} />
      <TypologyBpMesh box={desk} color={m.body} thin={thin} />
      <TypologyBpMesh
        box={monitor}
        thin={thin}
        color={lit ? accent : m.pal.glass}
        emissive={lit ? accent : undefined}
        emissiveIntensity={0.22}
      />
      <TypologyBpMesh box={keyboard} color={m.pal.ink} thin={thin} />
      <TypologyBpMesh box={chair} color={m.pal.mass} thin={thin} />
      <TypologyBpMesh box={chairBack} color={m.pal.panel} thin={thin} />
      <TypologyBpMesh box={shelfL} color={m.alt} thin={thin} />
      <TypologyBpMesh box={shelfR} color={m.alt} thin={thin} />
      {Array.from({ length: 5 }, (_, i) => {
        const leftBook = bpBox(0.22 + (i % 2) * 0.08, 4.12 + i * 0.06, 0.35 + i * 0.32, 0.28, 0.18, 0.22, ROOM_W, ROOM_D)
        const rightBook = bpBox(4.88 + (i % 2) * 0.06, 4.1 + i * 0.05, 0.4 + i * 0.3, 0.26, 0.16, 0.24, ROOM_W, ROOM_D)
        const warm = i % 2 === 0
        return (
          <group key={i}>
            <TypologyBpMesh
              box={leftBook}
              thin={thin}
              color={warm ? '#e8e4dc' : '#c8c4bc'}
              emissive={warm && lit ? m.warm : undefined}
              emissiveIntensity={warm && lit ? 0.06 : 0}
            />
            <TypologyBpMesh
              box={rightBook}
              thin={thin}
              color={!warm ? '#e8e4dc' : '#c8c4bc'}
              emissive={!warm && lit ? m.warm : undefined}
              emissiveIntensity={!warm && lit ? 0.06 : 0}
            />
          </group>
        )
      })}
      <TypologyBpMesh box={lampPole} color={m.edge} thin={thin} metalness={0.85} />
      <TypologyBpMesh
        box={lampHead}
        thin={thin}
        color={lit ? m.warm : m.body}
        emissive={lit ? m.warm : undefined}
        emissiveIntensity={lit ? 0.35 : 0}
      />
      <TypologyBpMesh box={sideTable} color={m.pal.mass} thin={thin} />
      <TypologyBpMesh box={mug} color={m.pal.panel} thin={thin} />
      {Array.from({ length: 3 }, (_, i) => {
        const note = bpBox(1.55 + i * 0.14, 1.58, 0.63 + i * 0.04, 0.32, 0.42, 0.04, ROOM_W, ROOM_D)
        return (
          <TypologyBpMesh
            key={i}
            box={note}
            thin={thin}
            color="#f4f0e8"
            emissive={lit ? m.warm : undefined}
            emissiveIntensity={0.04}
          />
        )
      })}
      <mesh position={[0.02, 0.028, 0.04]} raycast={() => null}>
        <boxGeometry args={[0.09, 0.014, 0.06]} />
        <meshStandardMaterial
          color={ghost ? THIN_INK : lit ? m.warm : m.pal.mass}
          emissive={ghost || !lit ? '#000000' : m.warm}
          emissiveIntensity={ghost ? 0 : lit ? 0.4 : 0}
          transparent={ghost}
          opacity={ghost ? THIN_MESH_OPACITY : 1}
          depthWrite={!ghost}
        />
      </mesh>
    </group>
  )
}
