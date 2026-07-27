import { Line } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { gridHash } from './geometry'
import { usePalette } from './InkEdges'

export type WindowPattern = 'grid' | 'stagger' | 'tower' | 'basement'

interface WindowMatrixProps {
  width: number
  height: number
  z?: number
  cols?: number
  rows?: number
  pattern?: WindowPattern
  night?: boolean
  active?: boolean
  /** Fraction of lit windows that use green cyber accent (0–1) */
  accentRatio?: number
}

function cellOffset(pattern: WindowPattern, col: number, row: number, cols: number, rows: number) {
  if (pattern === 'stagger') return (row % 2) * 0.5
  if (pattern === 'tower') return col === Math.floor(cols / 2) ? 0.15 : 0
  if (pattern === 'basement') return row < rows * 0.4 ? -0.05 : 0
  return 0
}

/** Grid window panes — blueprint by day, cyber glow by night */
export function WindowMatrix({
  width: w,
  height: h,
  z = 0.01,
  cols = 5,
  rows = 4,
  pattern = 'grid',
  night = false,
  active = false,
  accentRatio = 0.12,
}: WindowMatrixProps) {
  const pal = usePalette()
  const cellW = (w - 0.12) / cols
  const cellH = (h - 0.1) / rows
  const x0 = -w / 2 + 0.06
  const y0 = -h / 2 + 0.05

  const panes = useMemo(() => {
    const out: { x: number; y: number; pw: number; ph: number; lit: boolean; accent: boolean }[] = []
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const stagger = cellOffset(pattern, col, row, cols, rows)
        const x = x0 + col * cellW + cellW / 2 + stagger * cellW * 0.2
        const y = y0 + row * cellH + cellH / 2
        const hash = gridHash(col, row, 7)
        const lit = night && hash > 0.28
        const accent = lit && hash < accentRatio
        const pw = cellW * (0.55 + hash * 0.15)
        const ph = cellH * (0.5 + ((hash * 1.7) % 0.2))
        out.push({ x, y, pw, ph, lit, accent })
      }
    }
    return out
  }, [cols, rows, pattern, night, accentRatio, cellW, cellH, x0, y0])

  const frame = useMemo(() => {
    const hw = w / 2
    const hh = h / 2
    return [
      new THREE.Vector3(-hw, -hh, z),
      new THREE.Vector3(hw, -hh, z),
      new THREE.Vector3(hw, hh, z),
      new THREE.Vector3(-hw, hh, z),
      new THREE.Vector3(-hw, -hh, z),
    ]
  }, [w, h, z])

  const frameColor = night ? pal.neon : active ? pal.bpEdge : pal.graphite
  const skipRay = () => null

  return (
    <group>
      <Line
        points={frame}
        color={frameColor}
        lineWidth={active ? 1.5 : 1}
        transparent
        opacity={night ? 0.65 : active ? 0.85 : 0.5}
        raycast={skipRay}
      />
      {panes.map((p, i) => {
        const fill = p.lit
          ? p.accent
            ? pal.neonGreen
            : active
              ? pal.neonBright
              : pal.neon
          : night
            ? pal.bpFace
            : pal.resin

        const emissive = p.lit ? (p.accent ? pal.neonGreen : pal.neonBright) : '#000000'
        const ei = p.lit ? (p.accent ? 0.5 : active ? 0.42 : 0.3) : 0

        return (
          <mesh key={i} position={[p.x, p.y, z]} raycast={skipRay}>
            <planeGeometry args={[p.pw, p.ph]} />
            <meshStandardMaterial
              color={fill}
              emissive={emissive}
              emissiveIntensity={ei}
              transparent
              opacity={night ? (p.lit ? 0.55 : 0.12) : p.lit ? 0.7 : 0.35}
            />
          </mesh>
        )
      })}
    </group>
  )
}
