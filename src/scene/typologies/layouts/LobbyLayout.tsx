import {
  LOBBY_BLUEPRINT,
  LOBBY_ESC_COL,
  LOBBY_ESC_W,
  LOBBY_STAIR_COL,
  LOBBY_STAIR_W,
  gridDepth,
} from '../../lobbyBlueprint'
import { bpBox } from '../blueprintLayout'
import { InkEdges } from '../../primitives/InkEdges'
import { typologyMat, type TypologyProps } from '../types'

const { w: ROOM_W, d: ROOM_D } = LOBBY_BLUEPRINT

function gBox(
  col: number,
  rowTop: number,
  w: number,
  h: number,
  z: number,
  hz: number,
) {
  const { y, d } = gridDepth(rowTop, h)
  return bpBox(col, y, z, w, d, hz, ROOM_W, ROOM_D)
}

function BpInk({
  box,
  color,
  emissive,
  emissiveIntensity = 0,
  opacity = 1,
  metalness = 0.12,
}: {
  box: ReturnType<typeof bpBox>
  color: string
  emissive?: string
  emissiveIntensity?: number
  opacity?: number
  metalness?: number
}) {
  return (
    <mesh position={box.position} raycast={() => null}>
      <boxGeometry args={box.size} />
      <meshStandardMaterial
        color={color}
        emissive={emissive ?? '#000000'}
        emissiveIntensity={emissiveIntensity}
        metalness={metalness}
        roughness={0.84}
        transparent={opacity < 1}
        opacity={opacity}
      />
      <InkEdges lineWidth={1} />
    </mesh>
  )
}

/** Narrow bank — cols 5–8 on plan */
function EscalatorWell({
  m,
  accent,
  lit,
}: {
  m: ReturnType<typeof typologyMat>
  accent: string
  lit: boolean
}) {
  const rowTop = 0
  const rowSpan = 11
  const treads = 10

  return (
    <group>
      <BpInk box={gBox(LOBBY_ESC_COL, rowTop, LOBBY_ESC_W, rowSpan, 0, 0.08)} color={m.edge} />

      {Array.from({ length: treads }, (_, i) => {
        const t = i / Math.max(treads - 1, 1)
        const row = rowTop + Math.floor((1 - t) * (rowSpan - 1.2))
        return (
          <BpInk
            key={i}
            box={gBox(
              LOBBY_ESC_COL + 0.15,
              row,
              LOBBY_ESC_W - 0.3,
              0.85,
              0.12 + t * (rowSpan * 0.17),
              0.08,
            )}
            color={i % 2 ? m.body : m.alt}
          />
        )
      })}

      {[LOBBY_ESC_COL + 0.05, LOBBY_ESC_COL + LOBBY_ESC_W - 0.1].map((col, i) => (
        <BpInk
          key={i}
          box={gBox(col, rowTop, 0.07, rowSpan, 0.1, rowSpan * 0.17 + 0.35)}
          color={m.edge}
          metalness={0.65}
        />
      ))}

      <BpInk
        box={gBox(LOBBY_ESC_COL + 0.35, rowTop, LOBBY_ESC_W - 0.7, 1.1, rowSpan * 0.17 + 0.25, 0.07)}
        color={m.pal.glass}
        opacity={0.72}
        emissive={lit ? accent : undefined}
        emissiveIntensity={0.08}
      />
    </group>
  )
}

/** Wide flight — cols 23–28 on plan */
function StairWell({ m }: { m: ReturnType<typeof typologyMat> }) {
  const rowTop = 0
  const rowSpan = 11
  const treads = 10

  return (
    <group>
      <BpInk box={gBox(LOBBY_STAIR_COL, rowTop, LOBBY_STAIR_W, rowSpan, 0, 0.08)} color={m.edge} />

      {Array.from({ length: treads }, (_, i) => {
        const t = i / Math.max(treads - 1, 1)
        const row = rowTop + Math.floor((1 - t) * (rowSpan - 1.2))
        return (
          <BpInk
            key={i}
            box={gBox(
              LOBBY_STAIR_COL + 0.12,
              row,
              LOBBY_STAIR_W - 0.24,
              0.82,
              0.1 + t * (rowSpan * 0.16),
              0.11,
            )}
            color={i % 2 ? m.alt : m.body}
          />
        )
      })}

      <BpInk
        box={gBox(LOBBY_STAIR_COL - 0.05, rowTop, 0.08, rowSpan, 0.08, rowSpan * 0.17 + 0.45)}
        color={m.edge}
        metalness={0.6}
      />
      <BpInk
        box={gBox(LOBBY_STAIR_COL + LOBBY_STAIR_W - 0.03, rowTop, 0.08, rowSpan, 0.08, rowSpan * 0.17 + 0.45)}
        color={m.edge}
        metalness={0.6}
      />
    </group>
  )
}

function ReceptionBlock({
  m,
  accent,
  lit,
}: {
  m: ReturnType<typeof typologyMat>
  accent: string
  lit: boolean
}) {
  return (
    <group>
      {/* Back wall — counter width only (plan 櫃 cols 11–20) */}
      <BpInk box={gBox(11, 10, 10, 3, 0, 2.05)} color={m.alt} />
      <BpInk box={gBox(11, 10, 10, 3, 0, 1.02)} color={m.edge} metalness={0.42} />
      <BpInk
        box={gBox(11.2, 10.2, 9.6, 2.6, 1.02, 0.05)}
        color={m.pal.glass}
        opacity={0.85}
        emissive={lit ? accent : undefined}
        emissiveIntensity={0.06}
      />
      <BpInk
        box={gBox(13.5, 10.5, 4.8, 1.6, 1.12, 0.45)}
        color={accent}
        emissive={accent}
        emissiveIntensity={lit ? 0.1 : 0.03}
        opacity={0.26}
      />
    </group>
  )
}

/** Side service opening on −X wall (col 0) — no door leaf; main entry is exterior auto doors */
function SideWallOpening({ m }: { m: ReturnType<typeof typologyMat> }) {
  return (
    <group>
      <BpInk box={gBox(0, 0, 1, 13, 0, 2.35)} color={m.alt} />
      <BpInk box={gBox(0, 21, 1, 2, 0, 2.35)} color={m.alt} />
      <BpInk box={gBox(0, 13, 1, 8, 1.95, 0.4)} color={m.alt} />
      <BpInk box={gBox(0.02, 13, 0.12, 8, 0, 2.05)} color={m.edge} metalness={0.55} />
    </group>
  )
}

function SecurityBooth({
  m,
  accent,
  lit,
}: {
  m: ReturnType<typeof typologyMat>
  accent: string
  lit: boolean
}) {
  return (
    <group>
      <BpInk box={gBox(26, 15, 7, 7, 0, 2.35)} color={m.edge} />
      <BpInk box={gBox(26.15, 15.15, 0.14, 6.7, 0, 2.25)} color={m.alt} />
      <BpInk box={gBox(32.5, 15.15, 0.14, 6.7, 0, 2.25)} color={m.alt} />
      <BpInk box={gBox(26.15, 15.15, 6.5, 0.14, 2.25, 0.12)} color={m.alt} />
      <BpInk box={gBox(26.15, 15.3, 0.12, 6.2, 0.85, 0.75)} color={m.pal.glass} opacity={0.5} />
      <BpInk box={gBox(26.5, 15.6, 5.6, 4.8, 0, 0.88)} color={m.body} />
      <BpInk
        box={gBox(26.65, 15.75, 5.2, 4.2, 0.88, 0.06)}
        color={m.pal.glass}
        opacity={0.88}
        emissive={lit ? accent : undefined}
        emissiveIntensity={0.07}
      />
    </group>
  )
}

/** Mezzanine slab — back half (UTS level-2 overlook); open front half for double-height lobby */
function MezzanineSlab({ m }: { m: ReturnType<typeof typologyMat> }) {
  return (
    <group>
      <BpInk box={gBox(9, 0, 14, 10, 1.85, 0.09)} color={m.alt} opacity={0.88} />
      <BpInk box={gBox(9, 0, 14, 10, 1.92, 0.05)} color={m.edge} metalness={0.5} />
    </group>
  )
}

function PerimeterShell({ m }: { m: ReturnType<typeof typologyMat> }) {
  return (
    <group>
      <BpInk box={gBox(0, 0, ROOM_W, ROOM_D, 0, 0.07)} color={m.body} />
      <BpInk box={gBox(0, 0, 1, ROOM_D, 0, 2.45)} color={m.alt} />
      <BpInk box={gBox(ROOM_W - 1, 0, 1, ROOM_D, 0, 2.45)} color={m.alt} />
      {/* Back + side walls only — +Z front open (exterior auto doors on band facade) */}
      <BpInk box={gBox(1, 0, ROOM_W - 2, 1, 0, 2.45)} color={m.alt} />
    </group>
  )
}

/** G · UTS Building 1 — layout from lobby blueprint grid (34×23) */
export function LobbyLayout({ theme, accent, entered }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered

  return (
    <group>
      <PerimeterShell m={m} />
      <EscalatorWell m={m} accent={accent} lit={lit} />
      <StairWell m={m} />
      <ReceptionBlock m={m} accent={accent} lit={lit} />
      <MezzanineSlab m={m} />
      <SecurityBooth m={m} accent={accent} lit={lit} />
      <SideWallOpening m={m} />
    </group>
  )
}
