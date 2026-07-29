import { Line } from '@react-three/drei'
import { useMemo } from 'react'
import { bpBox, bpFloorBox, bpPoint } from '../blueprintLayout'
import { ghostLit, THIN_INK, THIN_MESH_OPACITY } from '../ghostStyle'
import { TypologyBpMesh } from '../TypologyBpMesh'
import { typologyMat, type TypologyProps } from '../types'

const ROOM_W = 6
const ROOM_D = 5

/** 007 · Tower Zero — model workshop: tall center block, corner desk, floor cables & tools */
export function TowerZeroStation({ theme, accent, entered, active, thin }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = ghostLit(thin, entered, active)
  const ghost = !!thin

  const towerBlock = bpBox(2.1, 1.35, 0, 1.8, 1.8, 3.35, ROOM_W, ROOM_D)
  const circuitPad = bpBox(1.95, 1.2, 0.01, 2.1, 2.1, 0.04, ROOM_W, ROOM_D)
  const desk = bpBox(4.0, 0.35, 0, 1.55, 0.88, 0.6, ROOM_W, ROOM_D)
  const monitor = bpBox(4.35, 0.38, 0.6, 0.92, 0.09, 0.74, ROOM_W, ROOM_D)
  const chair = bpBox(4.25, 1.45, 0, 0.72, 0.72, 0.44, ROOM_W, ROOM_D)
  const chairBack = bpBox(4.25, 2.12, 0.44, 0.72, 0.1, 0.5, ROOM_W, ROOM_D)
  const wrenchHandle = bpBox(1.15, 3.55, 0.02, 0.12, 0.55, 0.06, ROOM_W, ROOM_D)
  const wrenchHead = bpBox(1.05, 3.82, 0.02, 0.32, 0.12, 0.06, ROOM_W, ROOM_D)
  const toolBox = bpBox(0.35, 3.4, 0, 0.65, 0.48, 0.22, ROOM_W, ROOM_D)

  const wireA = useMemo(
    () =>
      [
        bpPoint(3.2, 1.1, 0.02, ROOM_W, ROOM_D),
        bpPoint(2.8, 1.8, 0.02, ROOM_W, ROOM_D),
        bpPoint(2.5, 2.4, 0.02, ROOM_W, ROOM_D),
        bpPoint(2.35, 2.9, 0.02, ROOM_W, ROOM_D),
      ] as [number, number, number][],
    [],
  )
  const wireB = useMemo(
    () =>
      [
        bpPoint(3.6, 0.9, 0.015, ROOM_W, ROOM_D),
        bpPoint(3.1, 1.5, 0.015, ROOM_W, ROOM_D),
        bpPoint(2.7, 2.1, 0.015, ROOM_W, ROOM_D),
        bpPoint(2.55, 2.75, 0.015, ROOM_W, ROOM_D),
      ] as [number, number, number][],
    [],
  )

  return (
    <group>
      <TypologyBpMesh box={bpFloorBox(ROOM_W, ROOM_D)} color={m.body} thin={thin} />
      <TypologyBpMesh
        box={circuitPad}
        thin={thin}
        color={lit ? accent : m.pal.ink}
        emissive={lit ? accent : undefined}
        emissiveIntensity={0.08}
        opacity={0.85}
      />
      <TypologyBpMesh box={towerBlock} color={m.body} thin={thin} />
      {Array.from({ length: 5 }, (_, i) => {
        const band = bpBox(2.12, 1.37, 0.55 + i * 0.62, 1.76, 1.76, 0.05, ROOM_W, ROOM_D)
        return (
          <TypologyBpMesh
            key={i}
            box={band}
            thin={thin}
            color={i % 2 === 0 ? m.alt : m.edge}
            emissive={lit && i % 2 === 0 ? accent : undefined}
            emissiveIntensity={0.08}
            metalness={0.55}
          />
        )
      })}
      <TypologyBpMesh box={desk} color={m.body} thin={thin} />
      <TypologyBpMesh
        box={monitor}
        thin={thin}
        color={lit ? accent : m.pal.glass}
        emissive={lit ? accent : undefined}
        emissiveIntensity={0.2}
      />
      <TypologyBpMesh box={chair} color={m.pal.mass} thin={thin} />
      <TypologyBpMesh box={chairBack} color={m.pal.panel} thin={thin} />
      <TypologyBpMesh box={toolBox} color={m.alt} thin={thin} metalness={0.6} />
      <TypologyBpMesh box={wrenchHandle} color={m.edge} thin={thin} metalness={0.85} />
      <TypologyBpMesh box={wrenchHead} color={m.edge} thin={thin} metalness={0.85} />
      {!thin && (
        <>
          <Line points={wireA} color={lit ? accent : m.pal.muted} lineWidth={1.2} transparent opacity={0.72} />
          <Line points={wireB} color={lit ? m.warm : m.edge} lineWidth={1} transparent opacity={0.58} />
        </>
      )}
      {thin && (
        <>
          <Line points={wireA} color={THIN_INK} lineWidth={0.8} transparent opacity={THIN_MESH_OPACITY} />
          <Line points={wireB} color={THIN_INK} lineWidth={0.8} transparent opacity={THIN_MESH_OPACITY} />
        </>
      )}
      <mesh position={[0.04, 0.025, 0.06]} raycast={() => null}>
        <cylinderGeometry args={[0.006, 0.006, 0.05, 6]} />
        <meshStandardMaterial
          color={ghost ? THIN_INK : m.edge}
          metalness={ghost ? 0.2 : 0.85}
          transparent={ghost}
          opacity={ghost ? THIN_MESH_OPACITY : 1}
          depthWrite={!ghost}
        />
      </mesh>
    </group>
  )
}
