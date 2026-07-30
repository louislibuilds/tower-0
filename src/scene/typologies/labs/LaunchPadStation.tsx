import { Line } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { bpBox, bpLine, bpPoint } from '../blueprintLayout'
import { ghostLit, THIN_INK, THIN_MESH_OPACITY } from '../ghostStyle'
import { TypologyBpMesh } from '../TypologyBpMesh'
import { typologyMat, type TypologyProps } from '../types'

const ROOM_W = 8
const ROOM_D = 5
const FLOOR_TOP = 0.012
const BALL_RADIUS = 0.008
const RACKET_SCALE = 0.72

function DecoMesh({
  position,
  size,
  rotation = [0, 0, 0],
  color,
  emissive,
  emissiveIntensity = 0,
  metalness = 0.15,
  roughness = 0.55,
  opacity = 1,
  thin = false,
}: {
  position: [number, number, number]
  size: [number, number, number]
  rotation?: [number, number, number]
  color: string
  emissive?: string
  emissiveIntensity?: number
  metalness?: number
  roughness?: number
  opacity?: number
  thin?: boolean
}) {
  const ghost = !!thin
  return (
    <mesh position={position} rotation={rotation} raycast={() => null}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={ghost ? THIN_INK : color}
        emissive={ghost ? '#000000' : (emissive ?? '#000000')}
        emissiveIntensity={ghost ? 0 : emissiveIntensity}
        metalness={metalness}
        roughness={roughness}
        transparent={ghost || opacity < 1}
        opacity={ghost ? THIN_MESH_OPACITY : opacity}
        depthWrite={!ghost && opacity >= 1}
      />
    </mesh>
  )
}

function ellipseXZ(rx: number, rz: number, t: number): [number, number] {
  return [rx * Math.cos(t), rz * Math.sin(t)]
}

function ovalHalfDepthAtX(rx: number, rz: number, x: number) {
  const t = Math.min(1, Math.abs(x) / rx)
  return rz * Math.sqrt(Math.max(0, 1 - t * t))
}

function ovalHalfWidthAtZ(rx: number, rz: number, z: number) {
  const t = Math.min(1, Math.abs(z) / rz)
  return rx * Math.sqrt(Math.max(0, 1 - t * t))
}

/** Flat racket on court — oval head frame, clipped string grid, tapered handle */
function FloorTennisRacket({
  position,
  rotationY = 0,
  frameColor,
  gripColor,
  stringColor,
  thin = false,
}: {
  position: [number, number, number]
  rotationY?: number
  frameColor: string
  gripColor: string
  stringColor: string
  thin?: boolean
}) {
  const headZ = 0.03
  const headRx = 0.074
  const headRz = 0.088
  const frameLift = 0.005
  const stringLift = 0.0035
  const frameSegments = 28
  const handleTiltX = 0.11

  const framePieces = useMemo(() => {
    return Array.from({ length: frameSegments }, (_, i) => {
      const a0 = (i / frameSegments) * Math.PI * 2
      const a1 = ((i + 1) / frameSegments) * Math.PI * 2
      const [x0, z0] = ellipseXZ(headRx, headRz, a0)
      const [x1, z1] = ellipseXZ(headRx, headRz, a1)
      const mx = (x0 + x1) / 2
      const mz = (z0 + z1) / 2
      const len = Math.hypot(x1 - x0, z1 - z0) + 0.0015
      const rotY = Math.atan2(z1 - z0, x1 - x0)
      return { pos: [mx, FLOOR_TOP + frameLift, headZ + mz] as [number, number, number], len, rotY }
    })
  }, [headRx, headRz, headZ, frameLift, frameSegments])

  const ovalOutline = useMemo(() => {
    const pts: THREE.Vector3[] = []
    for (let i = 0; i <= frameSegments; i++) {
      const t = (i / frameSegments) * Math.PI * 2
      const [x, z] = ellipseXZ(headRx, headRz, t)
      pts.push(new THREE.Vector3(x, FLOOR_TOP + frameLift + 0.001, headZ + z))
    }
    return pts
  }, [headRx, headRz, headZ, frameLift, frameSegments])

  const verticalStrings = useMemo(() => {
    const xs = [-0.056, -0.038, -0.019, 0, 0.019, 0.038, 0.056]
    return xs
      .map((x) => {
        const half = ovalHalfDepthAtX(headRx, headRz, x) * 0.9
        if (half < 0.012) return null
        return { x, half }
      })
      .filter((s): s is { x: number; half: number } => s !== null)
  }, [headRx, headRz])

  const horizontalStrings = useMemo(() => {
    const zs = [-0.066, -0.044, -0.022, 0, 0.022, 0.044, 0.066]
    return zs
      .map((z) => {
        const half = ovalHalfWidthAtZ(headRx, headRz, z) * 0.9
        if (half < 0.012) return null
        return { z, half }
      })
      .filter((s): s is { z: number; half: number } => s !== null)
  }, [headRx, headRz])

  const throatZ = headZ - headRz + 0.012
  const handleBaseZ = throatZ - 0.022
  const handleMidZ = handleBaseZ - 0.055
  const handleEndZ = handleMidZ - 0.055

  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={RACKET_SCALE}>
      {/* String bed — faint oval face */}
      <mesh
        position={[0, FLOOR_TOP + 0.0015, headZ]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[headRx, headRz, 1]}
        raycast={() => null}
      >
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial color={stringColor} transparent opacity={0.12} roughness={0.9} metalness={0} />
      </mesh>

      {/* Vertical string lines */}
      {verticalStrings.map(({ x, half }) => (
        <DecoMesh
          key={`v-${x}`}
          thin={thin}
          position={[x, FLOOR_TOP + stringLift, headZ]}
          size={[0.0018, 0.0008, half * 2]}
          color={stringColor}
          opacity={0.78}
          metalness={0}
          roughness={0.95}
        />
      ))}

      {horizontalStrings.map(({ z, half }) => (
        <DecoMesh
          key={`h-${z}`}
          thin={thin}
          position={[0, FLOOR_TOP + stringLift, headZ + z]}
          size={[half * 2, 0.0008, 0.0018]}
          color={stringColor}
          opacity={0.72}
          metalness={0}
          roughness={0.95}
        />
      ))}

      {framePieces.map(({ pos, len, rotY }, i) => (
        <DecoMesh
          key={`frame-${i}`}
          thin={thin}
          position={pos}
          rotation={[0, rotY, 0]}
          size={[len, 0.0055, 0.0075]}
          color={frameColor}
          metalness={0.48}
          roughness={0.42}
        />
      ))}

      {!thin && (
        <Line points={ovalOutline} color={frameColor} lineWidth={1.2} transparent opacity={0.92} raycast={() => null} />
      )}

      <DecoMesh
        thin={thin}
        position={[-0.014, FLOOR_TOP + 0.006, throatZ + 0.008]}
        rotation={[0.08, 0.22, 0.18]}
        size={[0.008, 0.006, 0.038]}
        color={frameColor}
        metalness={0.42}
      />
      <DecoMesh
        thin={thin}
        position={[0.014, FLOOR_TOP + 0.006, throatZ + 0.008]}
        rotation={[0.08, -0.22, -0.18]}
        size={[0.008, 0.006, 0.038]}
        color={frameColor}
        metalness={0.42}
      />
      <DecoMesh thin={thin} position={[0, FLOOR_TOP + 0.006, throatZ - 0.012]} size={[0.022, 0.007, 0.028]} color={frameColor} metalness={0.4} />

      <DecoMesh
        thin={thin}
        position={[0, FLOOR_TOP + 0.008, handleBaseZ]}
        rotation={[handleTiltX, 0, 0]}
        size={[0.019, 0.01, 0.07]}
        color={gripColor}
        roughness={0.86}
        metalness={0.04}
      />
      <DecoMesh
        thin={thin}
        position={[0, FLOOR_TOP + 0.009, handleMidZ]}
        rotation={[handleTiltX, 0, 0]}
        size={[0.017, 0.009, 0.07]}
        color={gripColor}
        roughness={0.88}
        metalness={0.04}
      />
      <DecoMesh
        thin={thin}
        position={[0, FLOOR_TOP + 0.01, handleEndZ]}
        rotation={[handleTiltX, 0, 0]}
        size={[0.015, 0.008, 0.055]}
        color={gripColor}
        roughness={0.9}
        metalness={0.04}
      />
      <DecoMesh
        thin={thin}
        position={[0, FLOOR_TOP + 0.011, handleEndZ - 0.038]}
        rotation={[handleTiltX, 0, 0]}
        size={[0.021, 0.011, 0.016]}
        color={frameColor}
        metalness={0.38}
        roughness={0.5}
      />
    </group>
  )
}

function BpMesh({
  box,
  color,
  emissive,
  emissiveIntensity = 0,
  metalness = 0.2,
  thin = false,
}: {
  box: ReturnType<typeof bpBox>
  color: string
  emissive?: string
  emissiveIntensity?: number
  metalness?: number
  thin?: boolean
}) {
  return (
    <TypologyBpMesh
      box={box}
      color={color}
      thin={thin}
      emissive={emissive}
      emissiveIntensity={emissiveIntensity}
      metalness={metalness}
    />
  )
}

/** Court boundary + service lines (tennis court grid) */
const COURT_LINES: [[number, number], [number, number], number?, boolean?][] = [
  [[0.5, 0.5], [7.5, 0.5]],
  [[0.5, 4.5], [7.5, 4.5]],
  [[0.5, 0.5], [0.5, 4.5]],
  [[7.5, 0.5], [7.5, 4.5]],
  [[4.0, 0.5], [4.0, 4.5]],
  [[0.5, 2.5], [7.5, 2.5], 0.38],
  [[1.8, 0.5], [1.8, 4.5], 0.28, true],
  [[6.2, 0.5], [6.2, 4.5], 0.28, true],
]

/** 001 · Launch Pad — tennis lab layout (8×5): court, net, balls, observer, tower */
export function LaunchPadStation({ theme, accent, entered, active, thin }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = ghostLit(thin, entered, active)
  const ghost = !!thin
  const lineColor = theme === 'dark' ? m.pal.fg : m.pal.mass

  const courtLines = useMemo(
    () =>
      COURT_LINES.map(([[x1, y1], [x2, y2]], i) => {
        const [a, b] = bpLine(x1, y1, 0.015, x2, y2, 0.015, ROOM_W, ROOM_D)
        return { key: i, a, b, opacity: COURT_LINES[i][2] ?? 0.55 }
      }),
    [],
  )

  const netPanel = bpBox(3.85, 0.5, 0, 0.05, 4, 0.82, ROOM_W, ROOM_D)
  const netPostA = bpBox(3.82, 0.38, 0, 0.12, 0.12, 0.9, ROOM_W, ROOM_D)
  const netPostB = bpBox(3.82, 4.46, 0, 0.12, 0.12, 0.9, ROOM_W, ROOM_D)
  const observer = bpBox(0.2, 1.6, 0, 0.85, 0.85, 0.92, ROOM_W, ROOM_D)
  const observerSeat = bpBox(0.5, 1.66, 0.92, 0.42, 0.42, 0.52, ROOM_W, ROOM_D)
  const bench = bpBox(7.0, 3.5, 0, 0.85, 1.2, 0.42, ROOM_W, ROOM_D)
  const signalTower = bpBox(7.2, 1.5, 0, 0.22, 2.2, 1.8, ROOM_W, ROOM_D)
  const entryPole = bpBox(7.08, 0.2, 0, 0.14, 0.6, 1.4, ROOM_W, ROOM_D)

  const ballColor = m.pal.warm
  const ballEmissive = theme === 'dark' ? m.pal.warm : '#000000'
  const ballEmissiveIntensity = theme === 'dark' ? (lit ? 0.22 : 0.08) : 0
  const ballLiftZ = (FLOOR_TOP + BALL_RADIUS) / 0.1
  /** Scattered on court — not a rigid row */
  const ballScatter: [number, number][] = [
    [2.35, 1.72],
    [3.55, 2.95],
    [1.62, 2.48],
  ]
  const ballPositions = ballScatter.map(([x, y]) => bpPoint(x, y, ballLiftZ, ROOM_W, ROOM_D))
  /** Back-left corner — handle tucked toward wall, clear of balls */
  const racketPos = bpPoint(0.78, 4.28, 0, ROOM_W, ROOM_D)

  return (
    <group>
      {!thin &&
        courtLines.map(({ key, a, b, opacity }) => (
          <Line
            key={key}
            points={[new THREE.Vector3(...a), new THREE.Vector3(...b)]}
            color={lineColor}
            lineWidth={1}
            transparent
            opacity={opacity}
            raycast={() => null}
          />
        ))}

      <BpMesh box={netPanel} thin={thin} color={m.pal.glass} emissive={lit ? accent : undefined} emissiveIntensity={0.06} />
      <BpMesh box={netPostA} thin={thin} color={m.edge} metalness={0.85} />
      <BpMesh box={netPostB} thin={thin} color={m.edge} metalness={0.85} />

      <BpMesh box={observer} thin={thin} color={m.alt} />
      <BpMesh box={observerSeat} thin={thin} color={m.pal.panel} />

      {ballPositions.map((pos, i) => (
        <mesh key={i} position={pos} raycast={() => null}>
          <sphereGeometry args={[BALL_RADIUS, 10, 10]} />
          <meshStandardMaterial
            color={ghost ? THIN_INK : ballColor}
            emissive={ghost ? '#000000' : ballEmissive}
            emissiveIntensity={ghost ? 0 : ballEmissiveIntensity}
            roughness={0.62}
            metalness={0}
            transparent={ghost}
            opacity={ghost ? THIN_MESH_OPACITY : 1}
            depthWrite={!ghost}
          />
        </mesh>
      ))}

      <FloorTennisRacket
        position={racketPos}
        rotationY={2.35}
        thin={thin}
        frameColor={m.pal.metal}
        gripColor={m.edge}
        stringColor={theme === 'dark' ? m.pal.fg : m.pal.mass}
      />

      <BpMesh box={bench} thin={thin} color={m.pal.mass} />
      <BpMesh
        box={signalTower}
        thin={thin}
        color={lit ? accent : m.pal.glass}
        emissive={lit ? accent : undefined}
        emissiveIntensity={0.22}
      />
      <BpMesh box={entryPole} thin={thin} color={m.edge} metalness={0.7} />
    </group>
  )
}
