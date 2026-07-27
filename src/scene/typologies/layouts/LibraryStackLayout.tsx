import { Fragment } from 'react'
import type { Theme } from '../../../context/SiteContext'
import { bpBox } from '../blueprintLayout'
import { typologyMat, type TypologyProps } from '../types'

const ROOM_W = 6
const ROOM_D = 5
const SHELVES = [0.2, 1.4, 2.6, 3.8] as const
const SHELF_ROWS = [0.48, 0.98, 1.52, 1.98] as const

/** Three book spines per shelf row — center spine warm highlight (Figma tpW / sW) */
const BOOK_SPINES = [
  { xOff: 0.04, w: 0.18, h: 0.2, tone: 'edge' as const },
  { xOff: 0.28, w: 0.26, h: 0.3, tone: 'highlight' as const },
  { xOff: 0.6, w: 0.16, h: 0.22, tone: 'edge' as const },
]

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

function spineStyle(
  tone: 'edge' | 'highlight',
  lit: boolean,
  theme: Theme,
  m: ReturnType<typeof typologyMat>,
): { color: string; emissive?: string; emissiveIntensity: number } {
  if (theme === 'dark') {
    if (tone === 'highlight') {
      return {
        color: lit ? '#ffc848' : '#c89830',
        emissive: '#ffc848',
        emissiveIntensity: lit ? 0.72 : 0.35,
      }
    }
    return {
      color: lit ? '#56daff' : '#1a5068',
      emissive: '#00aad0',
      emissiveIntensity: lit ? 0.28 : 0.12,
    }
  }
  if (tone === 'highlight') {
    return {
      color: lit ? '#fce4a8' : '#e8dcc8',
      emissive: m.warm,
      emissiveIntensity: lit ? 0.22 : 0.06,
    }
  }
  return {
    color: lit ? m.pal.resin : m.pal.concrete,
    emissive: undefined,
    emissiveIntensity: 0,
  }
}

/** 99F library · shelf stacks + reading table + ladder */
export function LibraryStackLayout({
  theme,
  accent,
  entered,
  active,
  scale = 1,
  showShell = true,
}: TypologyProps & { active?: boolean; scale?: number; showShell?: boolean }) {
  const m = typologyMat(theme, accent, entered)
  const lit = !!(entered || active)
  const dark = theme === 'dark'
  const table = bpBox(1.8, 1.8, 0, 2.2, 1.3, 0.62, ROOM_W, ROOM_D)
  const chairs: [number, number][] = [
    [2.0, 3.3],
    [3.15, 3.3],
  ]
  const shellFill = dark ? m.pal.bpFace : m.alt

  return (
    <group scale={scale}>
      {showShell && (
        <>
          <BpMesh box={bpBox(0, 0, 0, ROOM_W, 0.12, 2.8, ROOM_W, ROOM_D)} color={shellFill} emissive={dark ? m.pal.neon : undefined} emissiveIntensity={dark ? 0.08 : 0} />
          <BpMesh box={bpBox(0, 0, 0, 0.12, ROOM_D, 2.8, ROOM_W, ROOM_D)} color={shellFill} emissive={dark ? m.pal.neon : undefined} emissiveIntensity={dark ? 0.06 : 0} />
        </>
      )}

      {SHELVES.map((x) => (
        <Fragment key={x}>
          <BpMesh
            box={bpBox(x, 0.15, 0, 0.9, 0.4, 2.4, ROOM_W, ROOM_D)}
            color={dark ? '#143040' : m.alt}
            emissive={dark ? m.pal.neon : undefined}
            emissiveIntensity={dark ? 0.1 : 0}
          />
          {SHELF_ROWS.map((z, j) => (
            <Fragment key={j}>
              <BpMesh
                box={bpBox(x + 0.02, 0.155, z - 0.02, 0.84, 0.34, 0.04, ROOM_W, ROOM_D)}
                color={dark ? '#0a2838' : m.pal.concrete}
                emissive={dark ? m.pal.neon : undefined}
                emissiveIntensity={dark ? 0.06 : 0}
              />
              {BOOK_SPINES.map((book, bi) => {
                const style = spineStyle(book.tone, lit, theme, m)
                return (
                  <BpMesh
                    key={bi}
                    box={bpBox(x + book.xOff, 0.16, z, book.w, 0.32, book.h, ROOM_W, ROOM_D)}
                    color={style.color}
                    emissive={style.emissive}
                    emissiveIntensity={style.emissiveIntensity}
                  />
                )
              })}
            </Fragment>
          ))}
        </Fragment>
      ))}

      <BpMesh box={table} color={dark ? '#143040' : m.body} emissive={dark ? m.pal.neon : undefined} emissiveIntensity={dark ? 0.08 : 0} />
      <BpMesh
        box={bpBox(2.2, 2.0, 0.62, 0.85, 0.92, 0.06, ROOM_W, ROOM_D)}
        color={lit ? (dark ? '#ffc848' : m.warm) : '#d8d4cc'}
        emissive={lit ? (dark ? '#ffc848' : m.warm) : undefined}
        emissiveIntensity={dark && lit ? 0.5 : 0.1}
      />

      {chairs.map(([x, y], i) => (
        <Fragment key={i}>
          <BpMesh box={bpBox(x, y, 0, 0.75, 0.75, 0.42, ROOM_W, ROOM_D)} color={dark ? '#1a3848' : m.alt} />
          <BpMesh box={bpBox(x, y + 0.72, 0.42, 0.75, 0.1, 0.52, ROOM_W, ROOM_D)} color={m.pal.resin} />
        </Fragment>
      ))}

      <BpMesh box={bpBox(5.25, 3.9, 0, 0.1, 0.1, 1.95, ROOM_W, ROOM_D)} color={m.pal.alum} />
      <BpMesh
        box={bpBox(4.95, 3.78, 1.95, 0.55, 0.28, 0.07, ROOM_W, ROOM_D)}
        color={lit ? accent : m.pal.graphite}
        emissive={lit ? accent : undefined}
        emissiveIntensity={0.2}
      />
    </group>
  )
}
