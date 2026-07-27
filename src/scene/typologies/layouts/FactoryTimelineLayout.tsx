import { Line } from '@react-three/drei'
import gsap from 'gsap'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import {
  FACTORY_CRATE_STACKS,
  FACTORY_LINE_X,
  type FactoryCrate,
} from '../../factoryStops'
import { ThinnedStation } from '../ThinnedStation'
import { typologyMat, type TypologyProps } from '../types'

const ARM_TOP = 0.22
/** Mid-air hover height above final stack position */
const CRATE_HOVER_UP = 0.3

function stackTop(crates: FactoryCrate[]) {
  return crates.reduce((max, c) => Math.max(max, c.y + c.h), 0.05)
}

function hoverY(spec: FactoryCrate) {
  return spec.y + CRATE_HOVER_UP
}

function AnimatedCrate({
  spec,
  color,
  dropped,
  delay,
}: {
  spec: FactoryCrate
  color: string
  dropped: boolean
  delay: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  const posTween = useRef<gsap.core.Tween | null>(null)
  const targetY = hoverY(spec)

  useEffect(() => {
    const mesh = ref.current
    if (!mesh) return

    posTween.current?.kill()

    if (dropped) {
      mesh.position.y = targetY
      mesh.scale.setScalar(0.94)
      posTween.current = gsap.to(mesh.position, { y: spec.y, duration: 0.62, delay, ease: 'power3.in' })
      gsap.to(mesh.scale, { x: 1, y: 1, z: 1, duration: 0.38, delay: delay + 0.48, ease: 'power2.out' })
    } else {
      posTween.current = gsap.to(mesh.position, {
        y: targetY,
        duration: 0.42,
        ease: 'power2.out',
      })
      gsap.to(mesh.scale, { x: 1, y: 1, z: 1, duration: 0.28, ease: 'power2.out' })
    }

    return () => {
      posTween.current?.kill()
    }
  }, [dropped, delay, spec.y, targetY])

  return (
    <mesh ref={ref} position={[spec.x, targetY, spec.z]}>
      <boxGeometry args={[spec.w, spec.h, spec.d]} />
      <meshStandardMaterial color={color} roughness={0.84} />
    </mesh>
  )
}

function AssemblyArm({
  m,
  accent,
  stopLit,
}: {
  m: ReturnType<typeof typologyMat>
  accent: string
  stopLit: boolean
}) {
  return (
    <group>
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.14, 0.06, 0.1]} />
        <meshStandardMaterial color={m.alt} />
      </mesh>
      <mesh position={[-0.05, 0.13, 0]}>
        <boxGeometry args={[0.022, 0.14, 0.07]} />
        <meshStandardMaterial color={m.edge} metalness={0.75} />
      </mesh>
      <mesh position={[0.03, 0.17, 0.02]}>
        <boxGeometry args={[0.09, 0.04, 0.05]} />
        <meshStandardMaterial
          color={m.pal.glass}
          emissive={stopLit ? accent : undefined}
          emissiveIntensity={stopLit ? 0.22 : 0.08}
        />
      </mesh>
      <mesh position={[0.05, 0.2, 0.03]}>
        <boxGeometry args={[0.025, 0.1, 0.025]} />
        <meshStandardMaterial color={m.pal.alum} metalness={0.7} />
      </mesh>
    </group>
  )
}

function TimelineStation({
  stopIndex,
  x,
  theme,
  accent,
  entered,
  factoryStop,
  onSelectStop,
  crates,
}: {
  stopIndex: number
  x: number
  theme: TypologyProps['theme']
  accent: string
  entered: boolean
  factoryStop: number | null
  onSelectStop?: (index: number) => void
  crates: FactoryCrate[]
}) {
  const m = typologyMat(theme, accent, entered)
  const active = factoryStop === stopIndex
  const thin = factoryStop !== null && !active
  const dropped = entered && active
  const top = Math.max(ARM_TOP, stackTop(crates))
  const guideBase = useMemo(() => new THREE.Vector3(0, 0.02, 0.02), [])
  const guideTop = useMemo(
    () => new THREE.Vector3(0, (dropped ? top : top + CRATE_HOVER_UP) + 0.04, 0.02),
    [dropped, top],
  )

  return (
    <group position={[x, 0, 0]}>
      <ThinnedStation thin={thin}>
        <group>
          <AssemblyArm m={m} accent={accent} stopLit={active} />

          {crates.map((crate, i) => (
            <AnimatedCrate
              key={i}
              spec={crate}
              color={active ? m.warm : '#ccc8be'}
              dropped={dropped}
              delay={i * 0.09}
            />
          ))}

          {entered && (
            <Line
              points={[guideBase, guideTop]}
              color={active ? accent : m.pal.graphite}
              lineWidth={1}
              transparent
              opacity={active ? 0.65 : 0.28}
              dashed
              dashSize={0.018}
              gapSize={0.014}
            />
          )}

          {onSelectStop && (
            <mesh
              position={[0, top * 0.5 + CRATE_HOVER_UP * 0.5, 0.02]}
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
              <boxGeometry args={[0.22, top + CRATE_HOVER_UP + 0.14, 0.14]} />
              <meshBasicMaterial transparent opacity={0} />
            </mesh>
          )}
        </group>
      </ThinnedStation>
    </group>
  )
}

/** 23F · assembly arms + hovering crates that drop on area select */
export function FactoryTimelineLayout({
  theme,
  accent,
  entered,
  plateWidth,
  factoryStop = null,
  onSelectStop,
}: TypologyProps & {
  active?: boolean
  plateWidth: number
  factoryStop?: number | null
  onSelectStop?: (index: number) => void
}) {
  const m = typologyMat(theme, accent, entered)
  const beltW = plateWidth * 0.9

  return (
    <group>
      <mesh position={[0, 0.008, 0.02]}>
        <boxGeometry args={[beltW, 0.014, 0.12]} />
        <meshStandardMaterial color={m.pal.concrete} />
      </mesh>

      {FACTORY_LINE_X.map((x) => (
        <mesh key={`roller-${x}`} position={[x, 0.026, 0.02]}>
          <boxGeometry args={[0.018, 0.034, 0.034]} />
          <meshStandardMaterial color={m.pal.alum} metalness={0.6} />
        </mesh>
      ))}

      {FACTORY_LINE_X.map((x, si) => (
        <TimelineStation
          key={si}
          stopIndex={si}
          x={x}
          theme={theme}
          accent={accent}
          entered={entered}
          factoryStop={factoryStop}
          onSelectStop={onSelectStop}
          crates={FACTORY_CRATE_STACKS[si] ?? FACTORY_CRATE_STACKS[0]}
        />
      ))}
    </group>
  )
}
