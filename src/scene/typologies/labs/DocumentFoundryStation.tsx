import { bpBox } from '../blueprintLayout'
import { ghostLit, THIN_INK, THIN_MESH_OPACITY } from '../ghostStyle'
import { TypologyBpMesh } from '../TypologyBpMesh'
import { typologyMat, type TypologyProps } from '../types'

/** 005 · Document Foundry ??paper stack + printer + filing */
export function DocumentFoundryStation({ theme, accent, entered, active, thin }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = ghostLit(thin, entered, active)
  const ghost = !!thin

  const desk = bpBox(0.3, 0.3, 0, 3.5, 1.2, 0.62)
  const printer = bpBox(2.2, 0.35, 0.62, 1.2, 0.09, 0.9)
  const cabinet = bpBox(4.0, 0.3, 0, 0.72, 1.05, 0.95)
  const cabinetTop = bpBox(4.05, 0.35, 0.95, 0.62, 0.95, 0.14)
  const chair = bpBox(1.5, 1.85, 0, 0.82, 0.82, 0.48)
  const chairBack = bpBox(1.5, 2.62, 0.48, 0.82, 0.11, 0.54)
  const sideStack = bpBox(0.2, 2.5, 0, 0.82, 0.82, 0.58)

  return (
    <group>
      <TypologyBpMesh box={desk} color={m.body} thin={thin} />
      {Array.from({ length: 8 }, (_, i) => {
        const sheet = bpBox(0.45 + i * 0.36, 0.38, 0.62 + i * 0.14, 0.32, 0.78, 0.13)
        const warm = i % 2 === 1
        return (
          <TypologyBpMesh
            key={i}
            box={sheet}
            thin={thin}
            color={warm ? '#e8e4dc' : '#d8d4cc'}
            emissive={warm && lit ? m.warm : undefined}
            emissiveIntensity={warm && lit ? 0.08 : 0}
          />
        )
      })}
      <TypologyBpMesh
        box={printer}
        thin={thin}
        color={lit ? accent : m.alt}
        emissive={lit ? accent : undefined}
        emissiveIntensity={0.15}
      />
      <TypologyBpMesh box={cabinet} color={m.alt} thin={thin} />
      <TypologyBpMesh
        box={cabinetTop}
        thin={thin}
        color={lit ? accent : m.pal.glass}
        emissive={lit ? accent : undefined}
        emissiveIntensity={0.12}
      />
      <TypologyBpMesh box={chair} color={m.pal.mass} thin={thin} />
      <TypologyBpMesh box={chairBack} color={m.pal.panel} thin={thin} />
      <TypologyBpMesh box={sideStack} color={m.pal.mass} thin={thin} />
      {Array.from({ length: 4 }, (_, i) => {
        const stack = bpBox(0.28 + i * 0.08, 2.58, 0.58 + i * 0.12, 0.55, 0.55, 0.11)
        return (
          <TypologyBpMesh
            key={i}
            box={stack}
            thin={thin}
            color="#e8e4dc"
            emissive={lit ? m.warm : undefined}
            emissiveIntensity={0.06}
          />
        )
      })}
      <mesh position={[0, 0.03, 0.05]} raycast={() => null}>
        <boxGeometry args={[0.07, 0.018, 0.04]} />
        <meshStandardMaterial
          color={ghost ? THIN_INK : lit ? m.warm : m.pal.mass}
          emissive={ghost || !lit ? '#000000' : m.warm}
          emissiveIntensity={ghost ? 0 : lit ? 0.45 : 0}
          transparent={ghost}
          opacity={ghost ? THIN_MESH_OPACITY : 1}
          depthWrite={!ghost}
        />
      </mesh>
    </group>
  )
}
