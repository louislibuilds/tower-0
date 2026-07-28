import { bpBox } from '../blueprintLayout'
import {
  B10_CHAIR,
  B10_CONSOLE_DESK,
  B10_FLOOR_SLAB,
  B10_HALL_D,
  B10_HALL_W,
  B10_POD_CONSOLE_ANCHORS,
  B10_POD_ORIGINS,
  B10_POD_PRINT_BAY,
  B10_POD_PRINT_CRATES,
  B10_POD_PRINT_LED,
  B10_SEAT_MONITOR,
  B10_WALL_SCREEN,
} from './b10LayoutSpec'
import { typologyMat, type TypologyProps } from '../types'

function hallBox(x: number, y: number, z: number, w: number, d: number, h: number) {
  return bpBox(x, y, z, w, d, h, B10_HALL_W, B10_HALL_D)
}

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
      <meshStandardMaterial color={color} emissive={emissive ?? '#000000'} emissiveIntensity={emissiveIntensity} />
    </mesh>
  )
}

function ConsoleUnit({
  anchorX,
  anchorY,
  lit,
  accent,
  m,
}: {
  anchorX: number
  anchorY: number
  lit: boolean
  accent: string
  m: ReturnType<typeof typologyMat>
}) {
  const { dx: ddx, dy: ddy, ...desk } = B10_CONSOLE_DESK
  const { dx: mdx, dy: mdy, ...monitor } = B10_SEAT_MONITOR
  const { dx: cdx, dy: cdy, ...chair } = B10_CHAIR

  return (
    <>
      <BpMesh box={hallBox(anchorX + ddx, anchorY + ddy, desk.z, desk.w, desk.d, desk.h)} color={m.alt} />
      <BpMesh
        box={hallBox(anchorX + mdx, anchorY + mdy, monitor.z, monitor.w, monitor.d, monitor.h)}
        color={lit ? accent : m.pal.glass}
        emissive={lit ? accent : undefined}
        emissiveIntensity={lit ? 0.1 : 0}
      />
      <BpMesh box={hallBox(anchorX + cdx, anchorY + cdy, chair.z, chair.w, chair.d, chair.h)} color={m.body} />
    </>
  )
}

function TechCentrePod({
  podOx,
  podOy,
  lit,
  accent,
  m,
}: {
  podOx: number
  podOy: number
  lit: boolean
  accent: string
  m: ReturnType<typeof typologyMat>
}) {
  const bay = B10_POD_PRINT_BAY
  const led = B10_POD_PRINT_LED

  return (
    <group>
      {B10_POD_CONSOLE_ANCHORS.map(([lx, ly], i) => (
        <ConsoleUnit key={i} anchorX={lx + podOx} anchorY={ly + podOy} lit={lit} accent={accent} m={m} />
      ))}
      <BpMesh box={hallBox(bay.x + podOx, bay.y + podOy, bay.z, bay.w, bay.d, bay.h)} color={m.alt} />
      {B10_POD_PRINT_CRATES.map(([lx, ly], i) => (
        <BpMesh key={i} box={hallBox(lx + podOx, ly + podOy, 0, 0.62, 0.62, 0.44)} color={m.pal.concrete} />
      ))}
      <BpMesh
        box={hallBox(led.x + podOx, led.y + podOy, led.z, led.w, led.d, led.h)}
        color={lit ? m.warm : m.pal.concrete}
        emissive={lit ? m.warm : '#000000'}
        emissiveIntensity={lit ? 0.45 : 0}
      />
    </group>
  )
}

/** B10 · 16 seats (4×pod), single back-wall screen */
export function TechCentreLayout({
  theme,
  accent,
  entered,
  active,
  scale = 1,
}: TypologyProps & { active?: boolean; scale?: number }) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered || !!active
  const wall = B10_WALL_SCREEN

  return (
    <group scale={scale}>
      <BpMesh
        box={hallBox(B10_FLOOR_SLAB.x, B10_FLOOR_SLAB.y, B10_FLOOR_SLAB.z, B10_FLOOR_SLAB.w, B10_FLOOR_SLAB.d, B10_FLOOR_SLAB.h)}
        color={m.pal.graphite}
      />

      <BpMesh
        box={hallBox(wall.x, wall.y, wall.z, wall.w, wall.d, wall.h)}
        color={lit ? accent : m.pal.resin}
        emissive={lit ? accent : '#000000'}
        emissiveIntensity={lit ? 0.14 : 0}
      />

      {B10_POD_ORIGINS.map(([ox, oy], i) => (
        <TechCentrePod key={i} podOx={ox} podOy={oy} lit={lit} accent={accent} m={m} />
      ))}
    </group>
  )
}
