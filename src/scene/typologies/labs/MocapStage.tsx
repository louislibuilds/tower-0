import { typologyMat, type TypologyProps } from '../types'

/** 004 · Mocap Stage — ring light + skeleton + CNN stack + tripod */
export function MocapStage({ theme, accent, entered, active }: TypologyProps) {
  const m = typologyMat(theme, accent, entered)
  const lit = entered || active

  return (
    <group>
      <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.05, 0.075, 24]} />
        <meshStandardMaterial
          color={lit ? m.pal.chicken : m.pal.concrete}
          emissive={lit ? m.pal.chicken : '#000'}
          emissiveIntensity={lit ? 0.4 : 0}
        />
      </mesh>
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          position={[Math.cos(i * Math.PI / 2) * 0.062, 0.04, Math.sin(i * Math.PI / 2) * 0.062]}
        >
          <boxGeometry args={[0.012, 0.08, 0.012]} />
          <meshStandardMaterial color={m.edge} metalness={0.7} />
        </mesh>
      ))}
      <mesh position={[0, 0.1, 0]}>
        <capsuleGeometry args={[0.022, 0.08, 4, 8]} />
        <meshStandardMaterial color={m.pal.glass} wireframe />
      </mesh>
      <mesh position={[0, 0.17, 0]}>
        <sphereGeometry args={[0.028, 8, 8]} />
        <meshStandardMaterial
          color={lit ? accent : m.alt}
          emissive={lit ? accent : '#000'}
          emissiveIntensity={lit ? 0.25 : 0}
        />
      </mesh>
      <group position={[0.06, 0.06, -0.02]}>
        {Array.from({ length: 4 }).map((_, i) => (
          <mesh key={i} position={[0, i * 0.02, 0]}>
            <boxGeometry args={[0.048 - i * 0.007, 0.016, 0.048 - i * 0.007]} />
            <meshStandardMaterial
              color={lit ? accent : m.pal.concrete}
              emissive={lit ? accent : '#000'}
              emissiveIntensity={lit ? 0.15 : 0}
              transparent
              opacity={0.88 - i * 0.05}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}
