import { OrthographicCamera } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import type { FloorId } from '../building/program'
import { getProgramFloor, programCenterY, towerTotalHeight } from '../scene/towerGeometry'
import { DUR, EASE_SITE } from '../scene/motion'

interface CameraPreset {
  position: [number, number, number]
  lookAt: [number, number, number]
  zoom: number
}

function presetForFloor(floorId: FloorId): CameraPreset {
  const pf = getProgramFloor(floorId)
  const y = programCenterY(pf)
  const isBasement = floorId === 'B10' || floorId === 'B2'
  const isRoof = floorId === 'roof'

  // G · lobby — pull back to show full slim tower
  if (floorId === 'G') {
    const midY = towerTotalHeight() / 2 - 1
    return { position: [5, midY, 14], lookAt: [0, midY, 0], zoom: 28 }
  }
  if (isRoof) {
    return { position: [3.5, y + 1.5, 10], lookAt: [0, y, 0], zoom: 38 }
  }
  if (isBasement) {
    return { position: [4.5, y + 0.8, 9], lookAt: [0, y, 0], zoom: 40 }
  }
  // Tower program floors — frame the band + room
  return { position: [4, y + 0.6, 8.5], lookAt: [0, y, 0], zoom: 42 }
}

interface OrthoRigProps {
  floorId: FloorId
  reducedMotion: boolean
}

export function OrthoRig({ floorId, reducedMotion }: OrthoRigProps) {
  const camRef = useRef<THREE.OrthographicCamera>(null)
  const look = useRef(new THREE.Vector3(0, 4, 0))
  const prevFloor = useRef<FloorId>(floorId)
  const invalidate = useThree((s) => s.invalidate)

  useEffect(() => {
    const cam = camRef.current
    if (!cam) return

    const target = presetForFloor(floorId)
    const isRoof = floorId === 'roof'
    const sameZone = prevFloor.current === floorId

    if (reducedMotion) {
      cam.position.set(...target.position)
      cam.zoom = target.zoom
      look.current.set(...target.lookAt)
      cam.lookAt(look.current)
      cam.updateProjectionMatrix()
      invalidate()
      prevFloor.current = floorId
      return
    }

    const from = {
      x: cam.position.x,
      y: cam.position.y,
      z: cam.position.z,
      zoom: cam.zoom,
      lx: look.current.x,
      ly: look.current.y,
      lz: look.current.z,
    }

    const tween = gsap.to(from, {
      x: target.position[0],
      y: target.position[1],
      z: target.position[2],
      zoom: target.zoom,
      lx: target.lookAt[0],
      ly: target.lookAt[1],
      lz: target.lookAt[2],
      duration: isRoof ? DUR.roofAscent : sameZone ? DUR.civic : DUR.threshold,
      ease: EASE_SITE,
      onUpdate: () => {
        cam.position.set(from.x, from.y, from.z)
        cam.zoom = from.zoom
        look.current.set(from.lx, from.ly, from.lz)
        cam.lookAt(look.current)
        cam.updateProjectionMatrix()
        invalidate()
      },
    })

    prevFloor.current = floorId
    return () => {
      tween.kill()
    }
  }, [floorId, reducedMotion, invalidate])

  const midY = towerTotalHeight() / 2 - 1
  return (
    <OrthographicCamera
      ref={camRef}
      makeDefault
      near={0.1}
      far={300}
      position={[5, midY, 14]}
      zoom={28}
    />
  )
}

export function SiteLights({ theme }: { theme: 'dark' | 'light' }) {
  if (theme === 'light') {
    return (
      <>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 20, 8]} intensity={1.0} />
        <directionalLight position={[-8, 12, -5]} intensity={0.25} />
      </>
    )
  }
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[6, 18, 8]} intensity={0.55} color="#8090ff" />
      <directionalLight position={[-5, 10, -4]} intensity={0.12} color="#ff4080" />
    </>
  )
}
