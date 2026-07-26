import { Line } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { Theme } from '../context/SiteContext'
import type { FloorId } from '../building/program'
import { getTier, SPIRE_BASE, SPIRE_HEIGHT, TOWER_TIERS, tierCenterY } from './towerTiers'
import { DUR, EASE_INK, EASE_SITE } from './motion'
import { FloorExhibit } from './exhibits/FloorExhibit'
import { CircuitBase } from './exhibits/CircuitBase'

interface CyberTowerProps {
  activeFloorId: FloorId
  extrude: number
  ink: number
  reducedMotion: boolean
  theme: Theme
}

function themeColors(theme: Theme) {
  if (theme === 'dark') {
    return {
      void: '#030308',
      body: '#0c0e18',
      bodyAlt: '#141824',
      edge: '#2a3050',
      windowOff: '#0a0c14',
      ground: '#060810',
      spire: '#1a1e30',
      fog: '#030308',
    }
  }
  return {
    void: '#eae6df',
    body: '#f8f6f2',
    bodyAlt: '#ece8e0',
    edge: '#1a1a1a',
    windowOff: '#d8d4cc',
    ground: '#f0ece4',
    spire: '#2a2a2a',
    fog: '#eae6df',
  }
}

function TierBlock({
  tier,
  active,
  extrude,
  theme,
}: {
  tier: (typeof TOWER_TIERS)[0]
  active: boolean
  extrude: number
  theme: Theme
}) {
  const colors = themeColors(theme)
  const y = tier.yBase + (tier.height / 2) * extrude
  const h = tier.height * extrude
  const w = tier.width
  const d = tier.depth

  const edges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d)), [w, h, d])

  const neonIntensity = theme === 'dark' ? (active ? 2.5 : 0.3) : active ? 0 : 0
  const bodyColor = active ? colors.bodyAlt : colors.body

  return (
    <group position={[0, y, 0]}>
      {/* Main mass */}
      <mesh>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial
          color={bodyColor}
          roughness={theme === 'dark' ? 0.35 : 0.85}
          metalness={theme === 'dark' ? 0.65 : 0.05}
        />
      </mesh>

      {/* Edge ink / neon outline */}
      <lineSegments geometry={edges}>
        <lineBasicMaterial
          color={active ? tier.accent : colors.edge}
          transparent
          opacity={active ? 1 : 0.7}
        />
      </lineSegments>

      {/* Vertical window strips — cyberpunk facade */}
      {Array.from({ length: 7 }).map((_, i) => {
        const x = -w / 2 + 0.28 + i * ((w - 0.56) / 6)
        return (
          <mesh key={i} position={[x, 0, d / 2 + 0.008]}>
            <planeGeometry args={[0.08, h * 0.82]} />
            <meshStandardMaterial
              color={active ? tier.accent : colors.windowOff}
              emissive={active ? tier.accent : '#000000'}
              emissiveIntensity={neonIntensity}
              transparent
              opacity={active ? 0.95 : 0.55}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        )
      })}

      {/* Setback ledge */}
      <mesh position={[0, h / 2 + 0.02, 0]}>
        <boxGeometry args={[w + 0.08, 0.05, d + 0.08]} />
        <meshStandardMaterial
          color={colors.edge}
          emissive={active ? tier.accent : '#000000'}
          emissiveIntensity={active && theme === 'dark' ? 0.8 : 0}
        />
      </mesh>

      {/* Side fins — art deco */}
      {[-1, 1].map((side) => (
        <mesh key={side} position={[side * (w / 2 + 0.06), 0, 0]}>
          <boxGeometry args={[0.06, h * 0.95, d * 0.7]} />
          <meshStandardMaterial
            color={colors.bodyAlt}
            emissive={active ? tier.accent : '#000000'}
            emissiveIntensity={active && theme === 'dark' ? 0.4 : 0}
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>
      ))}

      {/* Exhibit hologram plate */}
      {extrude > 0.7 && (
        <FloorExhibit
          floorId={tier.floorId}
          active={active}
          theme={theme}
          accent={tier.accent}
          position={[0, 0, d / 2 + 0.35]}
        />
      )}
    </group>
  )
}

function Spire({ extrude, theme, active }: { extrude: number; theme: Theme; active: boolean }) {
  const colors = themeColors(theme)
  const y = SPIRE_BASE * extrude

  return (
    <group position={[0, y, 0]}>
      {[0, 1, 2, 3].map((i) => {
        const taper = 1 - i * 0.18
        return (
          <mesh key={i} position={[0, i * 0.45 + 0.3, 0]}>
            <boxGeometry args={[0.5 * taper, 0.4, 0.5 * taper]} />
            <meshStandardMaterial
              color={colors.spire}
              emissive={active && theme === 'dark' ? '#ffc400' : '#000000'}
              emissiveIntensity={active ? 1.2 : 0}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
        )
      })}
      {/* Needle antenna */}
      <mesh position={[0, SPIRE_HEIGHT * 0.85, 0]}>
        <cylinderGeometry args={[0.02, 0.04, SPIRE_HEIGHT * 0.9, 6]} />
        <meshStandardMaterial
          color={colors.edge}
          emissive={active && theme === 'dark' ? '#00e5ff' : '#000000'}
          emissiveIntensity={active ? 2 : 0}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  )
}

export function CyberTower({ activeFloorId, extrude, ink, theme }: CyberTowerProps) {
  const colors = themeColors(theme)
  const invalidate = useThree((s) => s.invalidate)
  const activeTier = getTier(activeFloorId)
  const activeY = activeTier ? tierCenterY(activeTier) : 0.6

  const glowRef = useRef<THREE.PointLight>(null)

  useEffect(() => {
    if (!glowRef.current) return
    const target = theme === 'dark' ? (activeTier?.accent ?? '#ffc400') : '#ffffff'
    glowRef.current.color.set(target)
    invalidate()
  }, [activeFloorId, activeTier, theme, invalidate])

  const footprint = useMemo(() => {
    const w = TOWER_TIERS[0].width
    const d = TOWER_TIERS[0].depth
    const pts = [
      new THREE.Vector3(-w / 2, 0.02, -d / 2),
      new THREE.Vector3(w / 2, 0.02, -d / 2),
      new THREE.Vector3(w / 2, 0.02, d / 2),
      new THREE.Vector3(-w / 2, 0.02, d / 2),
      new THREE.Vector3(-w / 2, 0.02, -d / 2),
    ]
    return pts.slice(0, Math.max(2, Math.floor(pts.length * ink)))
  }, [ink])

  return (
    <group>
      <fog attach="fog" args={[colors.fog, 18, 45]} />

      {/* Reflective ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color={colors.ground}
          roughness={theme === 'dark' ? 0.15 : 0.9}
          metalness={theme === 'dark' ? 0.85 : 0.05}
        />
      </mesh>

      {/* Ground reflection hint (dark mode) */}
      {theme === 'dark' && extrude > 0.3 && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.015, 0]}>
          <planeGeometry args={[5, 5]} />
          <meshBasicMaterial color={activeTier?.accent ?? '#00e5ff'} transparent opacity={0.04} />
        </mesh>
      )}

      {/* Footprint ink line */}
      {footprint.length >= 2 && (
        <Line
          points={footprint}
          color={theme === 'dark' ? (activeTier?.accent ?? '#00e5ff') : '#1a1a1a'}
          lineWidth={1.5}
          transparent
          opacity={ink}
        />
      )}

      {/* Circuit board basement */}
      {extrude > 0.15 && <CircuitBase extrude={extrude} theme={theme} active={activeFloorId === 'B10' || activeFloorId === 'B2'} />}

      {/* Tier blocks */}
      {extrude > 0.02 &&
        TOWER_TIERS.map((tier) => (
          <TierBlock
            key={tier.floorId}
            tier={tier}
            active={tier.floorId === activeFloorId}
            extrude={extrude}
            theme={theme}
          />
        ))}

      {/* Spire / roof */}
      {extrude > 0.85 && (
        <Spire extrude={extrude} theme={theme} active={activeFloorId === 'roof'} />
      )}

      {/* Active floor glow */}
      {theme === 'dark' && extrude > 0.5 && (
        <pointLight
          ref={glowRef}
          position={[2, activeY * extrude, 3]}
          intensity={activeTier ? 1.8 : 0.5}
          distance={8}
          decay={2}
        />
      )}
    </group>
  )
}

interface BootControllerProps {
  reducedMotion: boolean
  onComplete: () => void
  onExtrude: (v: number) => void
  onInk: (v: number) => void
  children: React.ReactNode
}

export function BootController({
  reducedMotion,
  onComplete,
  onExtrude,
  onInk,
  children,
}: BootControllerProps) {
  const done = useRef(false)
  const invalidate = useThree((s) => s.invalidate)

  useEffect(() => {
    if (done.current) return
    if (reducedMotion) {
      done.current = true
      onInk(1)
      onExtrude(1)
      onComplete()
      invalidate()
      return
    }
    const state = { ink: 0, extrude: 0 }
    const tl = gsap.timeline({
      onComplete: () => {
        if (!done.current) {
          done.current = true
          onComplete()
        }
      },
    })
    tl.to(state, {
      ink: 1,
      duration: DUR.ink,
      ease: EASE_INK,
      onUpdate: () => {
        onInk(state.ink)
        invalidate()
      },
    }).to(state, {
      extrude: 1,
      duration: DUR.extrude,
      ease: EASE_SITE,
      onUpdate: () => {
        onExtrude(state.extrude)
        invalidate()
      },
    })
    return () => {
      tl.kill()
    }
  }, [reducedMotion, onComplete, onExtrude, onInk, invalidate])

  return <>{children}</>
}
