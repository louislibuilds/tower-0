import { Line } from '@react-three/drei'
import gsap from 'gsap'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import type { ViewMode } from '../../../building/viewMode'
import {
  areaLabel,
  FACTORY_BLUEPRINT,
  FACTORY_CRATE_STACKS,
  FACTORY_STATION_GRID_X,
  FACTORY_TIMELINE_LABEL_OFFSET,
  factoryPlateScale,
  FACTORY_BELT_TOP,
  semesterTimelineLabel,
  type FactoryCrate,
  type FactoryCrateVariant,
} from '../../factoryStops'
import { FactoryTimelineCallout } from '../../primitives/FactoryTimelineCallout'
import { FactoryTimelineRail, factoryTimelineSceneY } from '../../primitives/FactoryTimelineRail'
import { PickTarget } from '../../primitives/PickTarget'
import { bpBox, bpLine, bpPoint, type BpBox } from '../blueprintLayout'
import { ThinnedStation } from '../ThinnedStation'
import { TypologyBpMesh } from '../TypologyBpMesh'
import { typologyMat, type TypologyProps } from '../types'

const { w: ROOM_W, d: ROOM_D } = FACTORY_BLUEPRINT
const BELT_TOP = FACTORY_BELT_TOP
const TIMELINE_Y = factoryTimelineSceneY()
/** Short drop when an area is selected */
const DROP_LIFT = 0.055

const CARDBOARD = '#c4bdb0'
const CARDBOARD_DARK = '#b0a898'
const TAPE = '#c9b48a'
const LABEL = '#ece8df'

function stackTop(crates: FactoryCrate[]) {
  return crates.reduce((max, c) => Math.max(max, c.y + c.h / 2), BELT_TOP)
}

function tintColor(hex: string, tone = 1) {
  const c = new THREE.Color(hex)
  if (tone < 1) c.lerp(new THREE.Color('#8a8478'), 1 - tone)
  else if (tone > 1) c.lerp(new THREE.Color('#f0ebe3'), tone - 1)
  return `#${c.getHexString()}`
}

/** Station-local box anchored at conveyor center (sx + 0.75, 1.5) */
function stationBox(sx: number, x: number, y: number, z: number, w: number, d: number, h: number): BpBox {
  const abs = bpBox(x, y, z, w, d, h, ROOM_W, ROOM_D)
  const anchor = bpPoint(sx + 0.75, 1.5, 0, ROOM_W, ROOM_D)
  return {
    position: [
      abs.position[0] - anchor[0],
      abs.position[1] - anchor[1],
      abs.position[2] - anchor[2],
    ],
    size: abs.size,
  }
}

/** Front QC desk + back packing bench + semester terminal (no robot arm) */
function StationWorkbench({
  sx,
  stopIndex,
  theme,
  accent,
  active,
  thin,
  entered,
}: {
  sx: number
  stopIndex: number
  theme: TypologyProps['theme']
  accent: string
  active: boolean
  thin: boolean
  entered: boolean
}) {
  const m = typologyMat(theme, accent, entered)
  const lit = active && entered

  return (
    <>
      {/* Front work bench — base slab */}
      <TypologyBpMesh box={stationBox(sx, sx, 0.2, 0, 1.5, 1, 0.62)} color={m.body} thin={thin} />

      {/* Semester terminal — vertical glass + stand (screen panel, no arm) */}
      <TypologyBpMesh
        box={stationBox(sx, sx + 0.25, 0.25, 0.62, 1.0, 0.09, 0.82)}
        color={m.pal.glass}
        thin={thin}
        opacity={0.88}
        emissive={lit ? accent : undefined}
        emissiveIntensity={lit ? 0.14 : 0.05}
      />
      <TypologyBpMesh
        box={stationBox(sx, sx + 0.35, 0.35, 0.62, 0.52, 0.07, 0.34)}
        color={m.edge}
        thin={thin}
        metalness={0.55}
      />
      <TypologyBpMesh
        box={stationBox(sx, sx + 0.35, 0.35, 0.94, 0.46, 0.05, 0.018)}
        color={m.pal.glass}
        thin={thin}
        emissive={lit ? accent : undefined}
        emissiveIntensity={lit ? 0.22 : 0.07}
        opacity={0.92}
      />

      {/* Back packing table — output tray; crates land on belt in front of it */}
      <TypologyBpMesh
        box={stationBox(sx, sx, 2.72, 0, 1.5, 0.35, 0.18)}
        color={m.pal.glass}
        thin={thin}
        opacity={0.82}
      />

      {/* Area 02+ — document tray on back table */}
      {stopIndex >= 1 && (
        <TypologyBpMesh
          box={stationBox(sx, sx + 0.42, 2.78, 0.17, 0.38, 0.22, 0.08)}
          color={m.alt}
          thin={thin}
        />
      )}

      {/* Area 03+ — tower PC beside terminal */}
      {stopIndex >= 2 && (
        <TypologyBpMesh
          box={stationBox(sx, sx + 0.08, 0.42, 0.62, 0.14, 0.12, 0.48)}
          color={m.edge}
          thin={thin}
          metalness={0.65}
        />
      )}

      {/* Area 04 — label printer on back bench */}
      {stopIndex >= 3 && (
        <>
          <TypologyBpMesh
            box={stationBox(sx, sx + 0.92, 2.68, 0.16, 0.18, 0.14, 0.1)}
            color={m.body}
            thin={thin}
          />
          <TypologyBpMesh
            box={stationBox(sx, sx + 0.92, 2.68, 0.24, 0.16, 0.1, 0.06)}
            color={m.pal.glass}
            thin={thin}
            emissive={lit ? accent : undefined}
            emissiveIntensity={lit ? 0.12 : 0.04}
            opacity={0.85}
          />
        </>
      )}
    </>
  )
}

function CrateDetail({
  variant,
  w,
  h,
  d,
  bodyColor,
}: {
  variant: FactoryCrateVariant
  w: number
  h: number
  d: number
  bodyColor: string
}) {
  const showTape = variant === 'tape' || variant === 'both'
  const showLabel = variant === 'label' || variant === 'both'

  return (
    <>
      {showTape && (
        <>
          <mesh position={[0, h / 2 + 0.001, 0]} rotation={[-Math.PI / 2, 0, 0.22]} raycast={() => null}>
            <planeGeometry args={[w * 1.05, 0.012]} />
            <meshStandardMaterial color={TAPE} roughness={0.92} />
          </mesh>
          <mesh position={[0, h / 2 + 0.001, 0]} rotation={[-Math.PI / 2, 0, -0.68]} raycast={() => null}>
            <planeGeometry args={[d * 1.08, 0.011]} />
            <meshStandardMaterial color={TAPE} roughness={0.92} />
          </mesh>
        </>
      )}
      {showLabel && (
        <mesh position={[0, h * 0.08, d / 2 + 0.001]} raycast={() => null}>
          <planeGeometry args={[w * 0.42, h * 0.28]} />
          <meshStandardMaterial color={LABEL} roughness={0.88} />
        </mesh>
      )}
      <lineSegments raycast={() => null}>
        <edgesGeometry args={[new THREE.BoxGeometry(w, h, d)]} />
        <lineBasicMaterial color={bodyColor === CARDBOARD ? CARDBOARD_DARK : bodyColor} transparent opacity={0.35} />
      </lineSegments>
    </>
  )
}

function AnimatedCrate({
  spec,
  active,
  settle,
  delay,
}: {
  spec: FactoryCrate
  active: boolean
  settle: boolean
  delay: number
}) {
  const ref = useRef<THREE.Group>(null)
  const posTween = useRef<gsap.core.Tween | null>(null)
  const restY = spec.y
  const variant = spec.variant ?? 'plain'
  const bodyColor = tintColor(active ? '#dbcdb8' : CARDBOARD, spec.tone ?? 1)

  useEffect(() => {
    const group = ref.current
    if (!group) return

    posTween.current?.kill()

    if (settle) {
      group.position.y = restY + DROP_LIFT
      group.scale.setScalar(0.96)
      posTween.current = gsap.to(group.position, { y: restY, duration: 0.48, delay, ease: 'power2.in' })
      gsap.to(group.scale, { x: 1, y: 1, z: 1, duration: 0.32, delay: delay + 0.36, ease: 'power2.out' })
    } else {
      group.position.y = restY
      group.scale.setScalar(1)
    }

    return () => {
      posTween.current?.kill()
    }
  }, [settle, delay, restY])

  return (
    <group ref={ref} position={[spec.x, restY, spec.z]} rotation={[0, spec.rotY ?? 0, 0]}>
      <mesh raycast={() => null}>
        <boxGeometry args={[spec.w, spec.h, spec.d]} />
        <meshStandardMaterial color={bodyColor} roughness={0.86} />
      </mesh>
      <CrateDetail variant={variant} w={spec.w} h={spec.h} d={spec.d} bodyColor={bodyColor} />
    </group>
  )
}

function FactoryStation({
  stopIndex,
  sx,
  theme,
  accent,
  entered,
  factoryStop,
  viewMode,
  floorOverview,
  onSelectStop,
  onHoverStop,
  crates,
}: {
  stopIndex: number
  sx: number
  theme: TypologyProps['theme']
  accent: string
  entered: boolean
  factoryStop: number | null
  viewMode: ViewMode
  floorOverview: boolean
  onSelectStop?: (index: number) => void
  onHoverStop?: (index: number | null) => void
  crates: FactoryCrate[]
}) {
  const active = factoryStop === stopIndex
  const thin = factoryStop !== null && !active
  const zoomed = active && (viewMode === 'room' || viewMode === 'focus')
  const settle = entered && active
  const stackHeight = stackTop(crates)
  const anchor = bpPoint(sx + 0.75, 1.5, 0, ROOM_W, ROOM_D)
  const [hovered, setHovered] = useState(false)

  const pick = !thin && !!onSelectStop

  return (
    <group position={anchor}>
      {floorOverview && !thin && !zoomed && (
        <FactoryTimelineCallout
          area={areaLabel(stopIndex)}
          semester={semesterTimelineLabel(stopIndex)}
          active={active || hovered}
          anchorY={Math.max(stackHeight, BELT_TOP) + 0.02}
          timelineY={TIMELINE_Y - anchor[1]}
          labelOffset={FACTORY_TIMELINE_LABEL_OFFSET[stopIndex] ?? FACTORY_TIMELINE_LABEL_OFFSET[0]}
        />
      )}

      <ThinnedStation thin={thin}>
        <StationWorkbench
          sx={sx}
          stopIndex={stopIndex}
          theme={theme}
          accent={accent}
          active={active}
          thin={thin}
          entered={entered}
        />

        {active && (
          <TypologyBpMesh
            box={{
              position: [0, BELT_TOP + 0.002, 0],
              size: [0.14, 0.004, 0.09],
            }}
            color={accent}
            emissive={accent}
            emissiveIntensity={0.12}
            opacity={0.35}
          />
        )}

        {crates.map((crate, i) => (
          <AnimatedCrate
            key={i}
            spec={crate}
            active={active}
            settle={settle}
            delay={i * 0.06}
          />
        ))}
      </ThinnedStation>

      {pick && (
        <PickTarget
          position={[0, 0.04, 0.02]}
          size={[0.14, 0.1, 0.28]}
          accent={accent}
          showGuide="never"
          active={active}
          hovered={hovered}
          onClick={() => onSelectStop!(stopIndex)}
          onHover={(over) => {
            setHovered(over)
            onHoverStop?.(over ? stopIndex : null)
          }}
        />
      )}
    </group>
  )
}

/** 23F · conveyor belt + work benches + semester crate piles */
export function FactoryTimelineLayout({
  theme,
  accent,
  entered,
  factoryStop = null,
  viewMode = 'floor',
  floorOverview = false,
  onSelectStop,
  onHoverStop,
}: TypologyProps & {
  factoryStop?: number | null
  viewMode?: ViewMode
  floorOverview?: boolean
  onSelectStop?: (index: number) => void
  onHoverStop?: (index: number | null) => void
}) {
  const m = typologyMat(theme, accent, entered)
  const scale = factoryPlateScale()
  const zoomed =
    factoryStop !== null && (viewMode === 'room' || viewMode === 'focus')
  const showTimeline = floorOverview && !zoomed

  const conveyorRollers = useMemo(
    () => Array.from({ length: 11 }, (_, i) => bpBox(i, 1.5, 0, 1, 1, 0.22, ROOM_W, ROOM_D)),
    [],
  )

  const conveyorGuides = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) =>
        bpLine(i + 0.5, 1.5, 0.22, i + 0.5, 2.5, 0.22, ROOM_W, ROOM_D),
      ),
    [],
  )

  return (
    <group scale={scale}>
      {conveyorRollers.map((box, i) => (
        <TypologyBpMesh key={`roller-${i}`} box={box} color={m.pal.concrete} metalness={0.15} />
      ))}

      {conveyorGuides.map((pts, i) => (
        <Line
          key={`guide-${i}`}
          points={pts}
          color={m.pal.mute}
          lineWidth={1}
          transparent
          opacity={0.35}
          dashed
          dashSize={0.012}
          gapSize={0.01}
          raycast={() => null}
        />
      ))}

      <FactoryTimelineRail hidden={!showTimeline} />

      {FACTORY_STATION_GRID_X.map((sx, si) => (
        <FactoryStation
          key={si}
          stopIndex={si}
          sx={sx}
          theme={theme}
          accent={accent}
          entered={entered}
          factoryStop={factoryStop}
          viewMode={viewMode}
          floorOverview={floorOverview}
          onSelectStop={onSelectStop}
          onHoverStop={onHoverStop}
          crates={FACTORY_CRATE_STACKS[si] ?? FACTORY_CRATE_STACKS[0]}
        />
      ))}
    </group>
  )
}
