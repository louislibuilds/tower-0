import { OrthographicCamera } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import type { FloorId } from '../building/program'
import type { LibraryRoomSlug } from '../data/libraryRooms'
import { getProgramFloor, programCenterY, towerTotalHeight } from '../scene/towerGeometry'
import { WAREHOUSE_STOPS } from '../scene/timelineStops'
import { DUR, EASE_SITE } from '../scene/motion'

interface CameraPreset {
  position: [number, number, number]
  lookAt: [number, number, number]
  zoom: number
}

function presetForFloor(
  floorId: FloorId,
  warehouseStop: number,
  libraryRoomSlug: LibraryRoomSlug | null,
): CameraPreset {
  const pf = getProgramFloor(floorId)
  const y = programCenterY(pf)
  const isBasement = floorId === 'B10' || floorId === 'B2'
  const isRoof = floorId === 'roof'

  if (floorId === 'G') {
    const midY = towerTotalHeight() / 2 - 1
    return { position: [6.5, midY + 0.5, 16], lookAt: [0, midY - 0.2, 0], zoom: 30 }
  }

  if (isRoof) {
    return { position: [2.5, y + 2.2, 11], lookAt: [0, y + 0.3, 0], zoom: 44 }
  }

  if (isBasement) {
    const depth = floorId === 'B10' ? 9.5 : 9
    return { position: [5, y + 1.0, depth], lookAt: [0, y - 0.05, 0], zoom: 46 }
  }

  if (floorId === '23') {
    const stopX = WAREHOUSE_STOPS[Math.min(warehouseStop, WAREHOUSE_STOPS.length - 1)] ?? 0
    return {
      position: [stopX + 0.2, y + 0.85, 10],
      lookAt: [stopX, y + 0.05, 0],
      zoom: 52,
    }
  }

  if (floorId === '52') {
    return { position: [3.8, y + 0.75, 9], lookAt: [0, y + 0.05, 0], zoom: 50 }
  }

  if (floorId === '99') {
    const lib = libraryRoomSlug === 'library'
    return {
      position: [lib ? 1.8 : 4.2, y + 0.9, 9.5],
      lookAt: [lib ? -0.45 : 0.35, y + 0.05, 0],
      zoom: 50,
    }
  }

  return { position: [4, y + 0.6, 8.5], lookAt: [0, y, 0], zoom: 42 }
}

interface OrthoRigProps {
  floorId: FloorId
  warehouseStop: number
  libraryRoomSlug: LibraryRoomSlug | null
  reducedMotion: boolean
}

export function OrthoRig({ floorId, warehouseStop, libraryRoomSlug, reducedMotion }: OrthoRigProps) {
  const camRef = useRef<THREE.OrthographicCamera>(null)
  const look = useRef(new THREE.Vector3(0, 4, 0))
  const prevFloor = useRef<FloorId>(floorId)
  const prevStop = useRef(warehouseStop)
  const prevLib = useRef(libraryRoomSlug)
  const invalidate = useThree((s) => s.invalidate)

  useEffect(() => {
    const cam = camRef.current
    if (!cam) return

    const target = presetForFloor(floorId, warehouseStop, libraryRoomSlug)
    const isRoof = floorId === 'roof'
    const sameFloor = prevFloor.current === floorId
    const panOnly =
      sameFloor &&
      ((floorId === '23' && prevStop.current !== warehouseStop) ||
        (floorId === '99' && prevLib.current !== libraryRoomSlug))

    if (reducedMotion) {
      cam.position.set(...target.position)
      cam.zoom = target.zoom
      look.current.set(...target.lookAt)
      cam.lookAt(look.current)
      cam.updateProjectionMatrix()
      invalidate()
      prevFloor.current = floorId
      prevStop.current = warehouseStop
      prevLib.current = libraryRoomSlug
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

    const duration = panOnly
      ? DUR.pan
      : isRoof
        ? DUR.roofAscent
        : sameFloor
          ? DUR.civic
          : DUR.threshold

    const tween = gsap.to(from, {
      x: target.position[0],
      y: target.position[1],
      z: target.position[2],
      zoom: target.zoom,
      lx: target.lookAt[0],
      ly: target.lookAt[1],
      lz: target.lookAt[2],
      duration,
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
    prevStop.current = warehouseStop
    prevLib.current = libraryRoomSlug
    return () => {
      tween.kill()
    }
  }, [floorId, warehouseStop, libraryRoomSlug, reducedMotion, invalidate])

  useFrame(() => {
    camRef.current?.lookAt(look.current)
  })

  const midY = towerTotalHeight() / 2 - 1
  return (
    <OrthographicCamera
      ref={camRef}
      makeDefault
      near={0.1}
      far={300}
      position={[6.5, midY + 0.5, 16]}
      zoom={30}
    />
  )
}

export function SiteLights({ theme }: { theme: 'dark' | 'light' }) {
  if (theme === 'light') {
    return (
      <>
        <ambientLight intensity={0.85} />
        <directionalLight position={[10, 20, 8]} intensity={0.95} color="#ffffff" />
        <directionalLight position={[-8, 12, -5]} intensity={0.2} color="#ffffff" />
      </>
    )
  }
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 18, 8]} intensity={0.65} color="#E6E4DF" />
      <directionalLight position={[-5, 10, -4]} intensity={0.15} color="#6A7078" />
    </>
  )
}
