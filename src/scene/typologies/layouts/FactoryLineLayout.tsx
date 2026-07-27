import { Fragment } from 'react'
import { Html, Line } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { FACTORY_LINE_X, type FactoryLineVariant } from '../../factoryStops'
import { bpBox, bpLine } from '../blueprintLayout'
import { ThinnedStation } from '../ThinnedStation'
import { typologyMat, type TypologyProps } from '../types'

/** Belt length in blueprint grid units — kept short to fit floor plate depth */
export const FACTORY_BELT_SEGMENTS = 5
const SEG_W = FACTORY_BELT_SEGMENTS
const SEG_D = 1.1

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

/** One conveyor + assembly cell (single semester line) */
function FactoryLineSegment({
  theme,
  accent,
  entered,
  lit,
  stopIndex,
  factoryStop,
  onSelectStop,
  showLabels,
  meta,
  variant,
}: {
  theme: TypologyProps['theme']
  accent: string
  entered: boolean
  lit: boolean
  stopIndex: number
  factoryStop: number | null
  onSelectStop?: (index: number) => void
  showLabels: boolean
  meta?: { label: string; detail: string }
  variant: FactoryLineVariant
}) {
  const m = typologyMat(theme, accent, entered)
  const activeStop = factoryStop === stopIndex
  const thin = factoryStop !== null && !activeStop
  const stopLit = activeStop || (lit && factoryStop === null)
  const beltLen = Math.min(variant.beltSegments, SEG_W)

  const beltPosts = useMemo(
    () =>
      Array.from({ length: beltLen - 1 }, (_, i) => {
        const seg = bpLine(i + 0.5, 0.42, 0.18, i + 0.5, 0.68, 0.18, SEG_W, SEG_D)
        return { key: i, seg }
      }),
    [beltLen],
  )

  const station = bpBox(4.2, 0.12, 0, 1.6, 0.88, 0.55, SEG_W, SEG_D)

  return (
    <ThinnedStation thin={thin}>
      <Fragment>
        {Array.from({ length: beltLen }, (_, i) => (
          <BpMesh
            key={i}
            box={bpBox(i, 0.42, 0, 1, 0.88, 0.18, SEG_W, SEG_D)}
            color={m.pal.concrete}
            emissive={lit ? accent : undefined}
            emissiveIntensity={0.05}
          />
        ))}

        {beltPosts.map(({ key, seg }) => (
          <Line
            key={key}
            points={[new THREE.Vector3(...seg[0]), new THREE.Vector3(...seg[1])]}
            color={m.pal.graphite}
            lineWidth={1}
            transparent
            opacity={0.45}
            dashed
            dashSize={0.04}
            gapSize={0.03}
          />
        ))}

        <BpMesh box={station} color={m.alt} />
        <BpMesh
          box={bpBox(4.45, 0.18, 0.55, 1.05, 0.09, 0.72, SEG_W, SEG_D)}
          color={m.pal.glass}
          emissive={stopLit ? accent : undefined}
          emissiveIntensity={stopLit ? 0.22 : 0.08}
        />
        <BpMesh box={bpBox(5.05, 0.42, 0.55, 0.1, 0.1, 0.95, SEG_W, SEG_D)} color={m.pal.alum} />
        <BpMesh box={bpBox(4.5, 0.38, 1.72, 0.85, 0.12, 0.1, SEG_W, SEG_D)} color={m.pal.alum} />
        <BpMesh box={bpBox(4.48, 0.3, 1.62, 0.14, 0.14, 0.2, SEG_W, SEG_D)} color={m.pal.graphite} />
        <BpMesh
          box={bpBox(4.2, 0.02, 0.82, 1.6, 0.28, 0.14, SEG_W, SEG_D)}
          color={stopLit ? m.warm : m.pal.resin}
          emissive={stopLit ? m.warm : undefined}
          emissiveIntensity={0.1}
        />

        {variant.crates.map((px: number, i: number) => (
          <BpMesh
            key={i}
            box={bpBox(Math.min(px, beltLen - 0.6), 0.45, 0.12 + (i % 2) * 0.06, 0.48, 0.72, 0.48, SEG_W, SEG_D)}
            color={lit ? m.warm : '#d8d4cc'}
          />
        ))}

        {variant.tools.map(([px, py, pz]: [number, number, number], i: number) => (
          <BpMesh
            key={`tool-${i}`}
            box={bpBox(Math.min(px, beltLen - 0.3), py, pz, 0.45 + (i % 2) * 0.1, 0.45, 0.38 + (i % 3) * 0.04, SEG_W, SEG_D)}
            color={i % 2 === 0 ? m.pal.graphite : m.pal.alum}
          />
        ))}

        {onSelectStop && (
          <mesh
            position={station.position}
            visible={false}
            onPointerOver={(e) => {
              if (thin) return
              e.stopPropagation()
              document.body.style.cursor = 'pointer'
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'crosshair'
            }}
            onClick={(e) => {
              if (thin) return
              e.stopPropagation()
              onSelectStop(stopIndex)
            }}
          >
            <boxGeometry args={[station.size[0] * 1.15, station.size[1] * 2.4, station.size[2] * 1.4]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>
        )}

        {showLabels && meta && (
          <Html center position={[SEG_W * 0.05, 0.92, 0]} style={{ pointerEvents: 'none' }}>
            <div className="scene-label-stack">
              <div className={`scene-label scene-label--tiny ${stopLit ? 'scene-label--active' : ''}`}>
                {meta.label}
              </div>
              <div className={`scene-label scene-label--lab ${stopLit ? 'scene-label--active' : ''}`}>
                {meta.detail}
              </div>
            </div>
          </Html>
        )}
      </Fragment>
    </ThinnedStation>
  )
}

/** 23F factory · side timeline — four lines left→right (2024 Spring first) */
export function FactoryLineLayout({
  theme,
  accent,
  entered,
  active,
  lineScale = 1,
  factoryStop = null,
  onSelectStop,
  showLabels = false,
  areaLabels = [],
  lineVariants = [],
}: TypologyProps & {
  active?: boolean
  lineScale?: number
  factoryStop?: number | null
  onSelectStop?: (index: number) => void
  showLabels?: boolean
  areaLabels?: { label: string; detail: string }[]
  lineVariants?: FactoryLineVariant[]
}) {
  const lit = !!(entered || active)

  return (
    <group>
      {FACTORY_LINE_X.map((x, si) => (
        <group key={si} position={[x, 0, 0]} rotation={[0, Math.PI / 2, 0]} scale={lineScale}>
          <FactoryLineSegment
            theme={theme}
            accent={accent}
            entered={entered}
            lit={lit}
            stopIndex={si}
            factoryStop={factoryStop}
            onSelectStop={onSelectStop}
            showLabels={!!showLabels}
            meta={areaLabels[si]}
            variant={lineVariants[si] ?? lineVariants[0] ?? { crates: [4.5], beltSegments: 8, tools: [[7.4, 0.15, 0]] }}
          />
        </group>
      ))}
    </group>
  )
}
