import { Html } from '@react-three/drei'
import { RoomShell } from '../primitives/RoomShell'
import { typologyMat, type TypologyProps } from './types'

/** B10 · Rack Hall — server racks + KATA print slot */
export function RackHall({ theme, accent, entered, active }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered || active

  return (
    <RoomShell width={1.05} depth={0.72} height={0.48} color={m.pal.graphite} floorColor={m.body}>
      {[-0.32, 0, 0.32].map((x, i) => (
        <group key={i} position={[x, 0, -0.12]}>
          <mesh position={[0, 0.2, 0]}>
            <boxGeometry args={[0.26, 0.38, 0.3]} />
            <meshStandardMaterial color={m.alt} metalness={0.75} roughness={0.3} />
          </mesh>
          {Array.from({ length: 5 }).map((_, j) => (
            <mesh key={j} position={[0, 0.08 + j * 0.07, 0.16]}>
              <boxGeometry args={[0.22, 0.04, 0.02]} />
              <meshStandardMaterial
                color={lit && j % 2 === 0 ? accent : '#0a1020'}
                emissive={lit && j % 2 === 0 ? accent : '#000000'}
                emissiveIntensity={lit ? 0.85 : 0}
              />
            </mesh>
          ))}
        </group>
      ))}

      <mesh position={[0, 0.04, -0.02]}>
        <boxGeometry args={[0.92, 0.04, 0.08]} />
        <meshStandardMaterial color={m.pal.graphite} metalness={0.5} />
      </mesh>

      {/* Print slot — KATA output bay */}
      <group position={[0.42, 0.08, 0.18]}>
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.18, 0.22, 0.2]} />
          <meshStandardMaterial color={m.alt} metalness={0.6} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.04, 0.12]}>
          <boxGeometry args={[0.14, 0.02, 0.06]} />
          <meshStandardMaterial
            color={lit ? m.pal.chicken : m.pal.concrete}
            emissive={lit ? m.pal.chicken : '#000'}
            emissiveIntensity={lit ? 0.5 : 0}
          />
        </mesh>
        <Html center position={[0, 0.28, 0.08]} style={{ pointerEvents: 'none' }}>
          <div className="scene-label scene-label--tiny">PRINT</div>
        </Html>
      </group>
    </RoomShell>
  )
}
