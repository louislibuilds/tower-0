import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { Theme } from '../../context/SiteContext'
import type { FloorId } from '../../building/program'

interface FloorExhibitProps {
  floorId: FloorId
  active: boolean
  theme: Theme
  accent: string
  position: [number, number, number]
}

/** Holographic exhibit marker — pulses when floor is active */
export function FloorExhibit({ active, theme, accent, position }: FloorExhibitProps) {
  const ringRef = useRef<THREE.Mesh>(null)
  const panelRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!active || !ringRef.current || !panelRef.current) return
    const t = clock.getElapsedTime()
    ringRef.current.rotation.z = t * 0.4
    const pulse = 0.85 + Math.sin(t * 2.5) * 0.15
    panelRef.current.scale.setScalar(pulse)
  })

  const panelColor = theme === 'dark' ? accent : '#1a1a1a'
  const opacity = active ? 0.9 : 0.25

  return (
    <group position={position}>
      {/* Platform */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <ringGeometry args={[0.35, 0.55, 32]} />
        <meshStandardMaterial
          color={panelColor}
          emissive={active && theme === 'dark' ? accent : '#000000'}
          emissiveIntensity={active ? 1.5 : 0}
          transparent
          opacity={opacity * 0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Spinning ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.42, 0.015, 8, 32]} />
        <meshStandardMaterial
          color={panelColor}
          emissive={active && theme === 'dark' ? accent : '#000000'}
          emissiveIntensity={active ? 2 : 0}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Hologram panel */}
      <mesh ref={panelRef}>
        <planeGeometry args={[0.7, 0.45]} />
        <meshStandardMaterial
          color={theme === 'dark' ? '#0a1020' : '#ffffff'}
          emissive={active && theme === 'dark' ? accent : '#000000'}
          emissiveIntensity={active ? 0.8 : 0}
          transparent
          opacity={active ? 0.85 : 0.2}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Floor label chip */}
      <mesh position={[0, -0.15, 0.05]}>
        <boxGeometry args={[0.5, 0.08, 0.02]} />
        <meshStandardMaterial
          color={theme === 'dark' ? '#141824' : '#ece8e0'}
          emissive={active && theme === 'dark' ? accent : '#000000'}
          emissiveIntensity={active ? 0.5 : 0}
        />
      </mesh>
    </group>
  )
}
