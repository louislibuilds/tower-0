import { Line } from '@react-three/drei'
import * as THREE from 'three'
import {
  lobbyDoorBaysAligned,
  lobbyDoorPanelHeight,
  lobbyDoorTransomSpan,
  lobbyFacadeMetrics,
} from '../lobbyBlueprint'
import { lobbyTransomRows } from '../towerFacade'
import { usePalette } from './InkEdges'
import { WindowMatrix } from './WindowMatrix'

interface LobbyAutoDoorsProps {
  bandWidth: number
  bandHeight: number
  z?: number
  night?: boolean
  active?: boolean
}

function AutoDoorBay({
  centerX,
  bayW,
  floorY,
  panelH,
  panelY,
  headerH,
  sillH,
  z,
  night,
  active,
  frameColor,
  glassColor,
  showSensor,
}: {
  centerX: number
  bayW: number
  floorY: number
  panelH: number
  panelY: number
  headerH: number
  sillH: number
  z: number
  night: boolean
  active: boolean
  frameColor: string
  glassColor: string
  showSensor?: boolean
}) {
  const skipRay = () => null
  const panelW = bayW * 0.46
  const gap = bayW * 0.04
  const hw = bayW / 2
  const top = panelY + panelH / 2 + headerH

  const outerFrame = [
    new THREE.Vector3(centerX - hw, floorY + sillH, z),
    new THREE.Vector3(centerX + hw, floorY + sillH, z),
    new THREE.Vector3(centerX + hw, top, z),
    new THREE.Vector3(centerX - hw, top, z),
    new THREE.Vector3(centerX - hw, floorY + sillH, z),
  ]

  return (
    <group>
      <Line
        points={outerFrame}
        color={frameColor}
        lineWidth={active ? 1.4 : 1}
        transparent
        opacity={night ? 0.68 : active ? 0.88 : 0.52}
        raycast={skipRay}
      />

      <mesh position={[centerX, panelY + panelH / 2 + headerH / 2, z]} raycast={skipRay}>
        <planeGeometry args={[bayW * 0.98, headerH]} />
        <meshStandardMaterial color={frameColor} roughness={0.72} metalness={0.38} />
      </mesh>

      <mesh position={[centerX, floorY + sillH / 2, z + 0.003]} raycast={skipRay}>
        <planeGeometry args={[bayW * 0.99, sillH]} />
        <meshStandardMaterial color={frameColor} roughness={0.55} metalness={0.45} />
      </mesh>

      <mesh position={[centerX, panelY, z + 0.004]} raycast={skipRay}>
        <planeGeometry args={[0.018, panelH * 0.94]} />
        <meshStandardMaterial color={frameColor} roughness={0.5} metalness={0.55} />
      </mesh>

      {[
        { x: centerX - panelW / 2 - gap / 2, slide: -0.012 },
        { x: centerX + panelW / 2 + gap / 2, slide: 0.012 },
      ].map((leaf, i) => (
        <group key={i}>
          <mesh position={[leaf.x + leaf.slide, panelY, z + 0.005]} raycast={skipRay}>
            <planeGeometry args={[panelW, panelH * 0.93]} />
            <meshStandardMaterial
              color={glassColor}
              emissive={night ? '#88ccff' : '#000000'}
              emissiveIntensity={night ? (active ? 0.1 : 0.05) : 0}
              transparent
              opacity={night ? 0.26 : 0.2}
              roughness={0.14}
              metalness={0.1}
              depthWrite={false}
            />
          </mesh>
          <Line
            points={[
              new THREE.Vector3(leaf.x + leaf.slide - panelW / 2, panelY - panelH * 0.465, z + 0.006),
              new THREE.Vector3(leaf.x + leaf.slide + panelW / 2, panelY - panelH * 0.465, z + 0.006),
              new THREE.Vector3(leaf.x + leaf.slide + panelW / 2, panelY + panelH * 0.465, z + 0.006),
              new THREE.Vector3(leaf.x + leaf.slide - panelW / 2, panelY + panelH * 0.465, z + 0.006),
              new THREE.Vector3(leaf.x + leaf.slide - panelW / 2, panelY - panelH * 0.465, z + 0.006),
            ]}
            color={frameColor}
            lineWidth={0.85}
            transparent
            opacity={0.6}
            raycast={skipRay}
          />
        </group>
      ))}

      {showSensor && (
        <mesh position={[centerX, top + 0.025, z + 0.007]} raycast={skipRay}>
          <planeGeometry args={[0.05, 0.02]} />
          <meshStandardMaterial
            color={night ? '#66ff99' : frameColor}
            emissive={night ? '#66ff99' : '#000000'}
            emissiveIntensity={night ? 0.32 : 0}
          />
        </mesh>
      )}
    </group>
  )
}

/** G-floor +Z facade — doors aligned to escalator · counter · security booth */
export function LobbyAutoDoors({
  bandWidth: w,
  bandHeight: h,
  z = 0.012,
  night = false,
  active = false,
}: LobbyAutoDoorsProps) {
  const pal = usePalette()
  const bays = lobbyDoorBaysAligned(w)
  const transom = lobbyDoorTransomSpan(w)
  const facade = lobbyFacadeMetrics(w)

  const floorY = -h / 2
  const ceilingY = h / 2
  const sillH = 0.028
  const panelH = lobbyDoorPanelHeight(h)
  const headerH = Math.max(panelH * 0.07, 0.02)
  const panelY = floorY + sillH + panelH / 2
  const transomBottom = panelY + panelH / 2 + headerH
  const transomH = ceilingY - transomBottom - h * 0.03

  const frameColor = night ? pal.glow : active ? pal.bpEdge : pal.fg
  const glassColor = night ? pal.bpFace : pal.panel
  const skipRay = () => null

  const firstDoorLeft = bays[0].centerX - bays[0].bayW / 2
  const lastDoorRight = bays[2].centerX + bays[2].bayW / 2
  const leftSpandrelW = firstDoorLeft - facade.facadeLeft
  const rightSpandrelW = facade.facadeRight - lastDoorRight

  /** Curtain-wall spandrel beside the three door bays — keep glassy, not concrete slabs */
  const spandrelMat = {
    color: glassColor,
    transparent: true as const,
    opacity: night ? 0.16 : 0.1,
    roughness: 0.16,
    metalness: 0.08,
    depthWrite: false,
  }

  const transomRows = lobbyTransomRows(transomH)

  return (
    <group>
      {leftSpandrelW > 0.01 && (
        <mesh
          position={[(facade.facadeLeft + firstDoorLeft) / 2, (floorY + ceilingY) / 2, z - 0.002]}
          raycast={skipRay}
        >
          <planeGeometry args={[leftSpandrelW * 0.96, h * 0.9]} />
          <meshStandardMaterial {...spandrelMat} />
        </mesh>
      )}

      {rightSpandrelW > 0.01 && (
        <mesh
          position={[(lastDoorRight + facade.facadeRight) / 2, (floorY + ceilingY) / 2, z - 0.002]}
          raycast={skipRay}
        >
          <planeGeometry args={[rightSpandrelW * 0.96, h * 0.9]} />
          <meshStandardMaterial {...spandrelMat} />
        </mesh>
      )}

      <group position={[transom.centerX, transomBottom + transomH / 2, z + 0.002]}>
        <WindowMatrix
          width={transom.width * 0.96}
          height={transomH * 0.94}
          cols={5}
          rows={transomRows}
          pattern="grid"
          night={night}
          active={active}
          z={0}
        />
      </group>

      {bays.map((bay, i) => (
        <AutoDoorBay
          key={i}
          centerX={bay.centerX}
          bayW={bay.bayW}
          floorY={floorY}
          panelH={panelH}
          panelY={panelY}
          headerH={headerH}
          sillH={sillH}
          z={z}
          night={night}
          active={active}
          frameColor={frameColor}
          glassColor={glassColor}
          showSensor={i === 1}
        />
      ))}

    </group>
  )
}
