import { OrthographicCamera } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { getFloor, type FloorId } from '../building/program'
import { DUR, EASE_SITE } from '../scene/motion'

interface CameraPreset {
  position: [number, number, number]
  lookAt: [number, number, number]
  zoom: number
}

function presetForFloor(floorId: FloorId): CameraPreset {
  const y = getFloor(floorId).yCenter
  const isBasement = floorId === 'B10' || floorId === 'B2'
  const isRoof = floorId === 'roof'

  if (isRoof) {
    return { position: [5, y + 3.5, 9], lookAt: [0, y - 0.5, 0], zoom: 42 }
  }
  if (isBasement) {
    return { position: [6, y + 1.2, 7], lookAt: [0, y, 0], zoom: 48 }
  }
  return { position: [5.5, y + 1.8, 8], lookAt: [0, y, 0], zoom: 52 }
}

interface OrthoRigProps {
  floorId: FloorId
  reducedMotion: boolean
}

export function OrthoRig({ floorId, reducedMotion }: OrthoRigProps) {
  const camRef = useRef<THREE.OrthographicCamera>(null)
  const look = useRef(new THREE.Vector3(0, 0.6, 0))
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

  return <OrthographicCamera ref={camRef} makeDefault near={0.1} far={200} position={[5.5, 2.4, 8]} zoom={52} />
}

export function SiteLights() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[8, 12, 6]} intensity={0.85} />
      <directionalLight position={[-6, 8, -4]} intensity={0.25} />
    </>
  )
}
