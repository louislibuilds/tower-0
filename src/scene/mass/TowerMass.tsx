import { Line } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import type { Theme } from '../../context/SiteContext'
import { foundationExtrudeProgress } from '../../building/sitePhase'
import { getScenePalette } from '../palette'
import { GroundWash, partialPolyline, SurveyGrid } from '../primitives'

interface TowerMassProps {
  ink: number
  extrude: number
  theme: Theme
  showSurveyGrid?: boolean
  footprintW: number
  footprintD: number
}

/** Boot-layer massing — footprint ink, survey grid, poured ground */
export function TowerMass({
  ink,
  extrude,
  theme,
  showSurveyGrid = true,
  footprintW,
  footprintD,
}: TowerMassProps) {
  const pal = getScenePalette(theme)
  const foundation = foundationExtrudeProgress(extrude)

  const footprint = useMemo(() => {
    const full = [
      new THREE.Vector3(-footprintW / 2, 0.02, -footprintD / 2),
      new THREE.Vector3(footprintW / 2, 0.02, -footprintD / 2),
      new THREE.Vector3(footprintW / 2, 0.02, footprintD / 2),
      new THREE.Vector3(-footprintW / 2, 0.02, footprintD / 2),
      new THREE.Vector3(-footprintW / 2, 0.02, -footprintD / 2),
    ]
    return partialPolyline(full, ink)
  }, [ink, footprintW, footprintD])

  return (
    <group>
      {showSurveyGrid && ink > 0.05 && extrude < 0.98 && (
        <SurveyGrid extent={10} step={1} opacity={0.28 * (1 - extrude * 0.5)} />
      )}

      {foundation > 0 && (
        <GroundWash
          width={footprintW + 0.8}
          depth={footprintD + 0.8}
          opacity={0.45 * foundation}
        />
      )}

      {footprint.length >= 2 && (
        <Line points={footprint} color={pal.signal} lineWidth={1.5} transparent opacity={ink} />
      )}

      {foundation > 0.2 && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.008 * foundation, 0]}>
          <planeGeometry args={[footprintW * foundation, footprintD * foundation]} />
          <meshStandardMaterial color={pal.concrete} transparent opacity={0.35 * foundation} />
        </mesh>
      )}
    </group>
  )
}
