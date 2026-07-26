import { getScenePalette } from '../palette'
import type { Theme } from '../../context/SiteContext'

/** Simple geometric props per lab project slug */
export function LabProjectProps({ slug, theme, accent }: { slug: string; theme: Theme; accent: string }) {
  const pal = getScenePalette(theme)

  switch (slug) {
    case 'unihack-2026':
      return (
        <group>
          {/* Tennis racket — handle + oval head */}
          <mesh position={[-0.08, 0.08, 0]} rotation={[0, 0, 0.4]}>
            <boxGeometry args={[0.04, 0.22, 0.04]} />
            <meshStandardMaterial color={pal.graphite} />
          </mesh>
          <mesh position={[0.06, 0.2, 0]} rotation={[0, 0, 0.35]}>
            <boxGeometry args={[0.14, 0.16, 0.02]} />
            <meshStandardMaterial color={pal.concrete} wireframe />
          </mesh>
          {/* Tennis ball */}
          <mesh position={[0.12, 0.05, 0.08]}>
            <sphereGeometry args={[0.05, 10, 10]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.2} />
          </mesh>
        </group>
      )

    case 'cloud-computing':
      return (
        <group>
          {/* Monitor */}
          <mesh position={[0, 0.12, 0]}>
            <boxGeometry args={[0.22, 0.16, 0.02]} />
            <meshStandardMaterial color={pal.glass} />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <boxGeometry args={[0.08, 0.04, 0.06]} />
            <meshStandardMaterial color={pal.concrete} />
          </mesh>
          {/* Shipping boxes */}
          {[
            [0.18, 0.06, 0.1],
            [0.22, 0.12, 0.08],
            [-0.16, 0.05, 0.12],
          ].map(([x, y, z], i) => (
            <mesh key={i} position={[x, y, z]}>
              <boxGeometry args={[0.1, 0.1, 0.1]} />
              <meshStandardMaterial color={pal.resin} />
            </mesh>
          ))}
        </group>
      )

    case 'nlp':
      return (
        <group>
          {/* Interviewer chair */}
          <mesh position={[-0.12, 0.06, 0]}>
            <boxGeometry args={[0.1, 0.12, 0.1]} />
            <meshStandardMaterial color={pal.concrete} />
          </mesh>
          {/* Candidate */}
          <mesh position={[0.1, 0.14, 0]}>
            <capsuleGeometry args={[0.05, 0.12, 4, 8]} />
            <meshStandardMaterial color={pal.glass} />
          </mesh>
          {/* Desk mic */}
          <mesh position={[0, 0.08, 0.12]}>
            <cylinderGeometry args={[0.015, 0.015, 0.12, 6]} />
            <meshStandardMaterial color={pal.graphite} metalness={0.8} />
          </mesh>
        </group>
      )

    case 'dl':
      return (
        <group>
          {/* VTuber at desk streaming */}
          <mesh position={[0, 0.1, 0]}>
            <capsuleGeometry args={[0.05, 0.1, 4, 8]} />
            <meshStandardMaterial color={pal.glass} />
          </mesh>
          <mesh position={[0, 0.18, 0]}>
            <sphereGeometry args={[0.06, 8, 8]} />
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.25} />
          </mesh>
          <mesh position={[0.14, 0.1, 0]}>
            <boxGeometry args={[0.18, 0.12, 0.02]} />
            <meshStandardMaterial color={pal.ink} />
          </mesh>
          {/* REC dot */}
          <mesh position={[-0.1, 0.22, 0.05]}>
            <sphereGeometry args={[0.025, 6, 6]} />
            <meshStandardMaterial color="#e04040" emissive="#e04040" emissiveIntensity={0.8} />
          </mesh>
        </group>
      )

    case 'kata':
      return (
        <group>
          {/* Samurai figure — body + katana */}
          <mesh position={[0, 0.12, 0]}>
            <capsuleGeometry args={[0.05, 0.14, 4, 8]} />
            <meshStandardMaterial color={pal.concrete} />
          </mesh>
          <mesh position={[0.12, 0.14, 0]} rotation={[0, 0, -0.5]}>
            <boxGeometry args={[0.28, 0.025, 0.025]} />
            <meshStandardMaterial color={pal.graphite} metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0.26, 0.14, 0]}>
            <boxGeometry args={[0.04, 0.04, 0.04]} />
            <meshStandardMaterial color={accent} metalness={0.8} />
          </mesh>
        </group>
      )

    default:
      return null
  }
}
