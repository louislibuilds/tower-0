import { OrthographicCamera } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import type { FloorId } from '../building/program'
import type { SitePhase } from '../building/sitePhase'
import type { ViewMode } from '../building/viewMode'
import type { LibraryRoomSlug } from '../data/libraryRooms'
import { cameraPreset } from './presets'
import { DUR, EASE_INK, EASE_SITE } from '../scene/motion'
import { towerTotalHeight } from '../scene/towerGeometry'

interface OrthoRigProps {
  floorId: FloorId
  viewMode: ViewMode
  phase: SitePhase
  bootDone: boolean
  factoryStop: number | null
  libraryRoomSlug: LibraryRoomSlug | null
  labRoomSlug: string | null
  selectedBookSlug: string | null
  selectedCredentialSlug: string | null
  reducedMotion: boolean
}

const ORBIT_SPEED = 0.07

export function OrthoRig({
  floorId,
  viewMode,
  phase,
  bootDone,
  factoryStop,
  libraryRoomSlug,
  labRoomSlug,
  selectedBookSlug,
  selectedCredentialSlug,
  reducedMotion,
}: OrthoRigProps) {
  const camRef = useRef<THREE.OrthographicCamera>(null)
  const look = useRef(new THREE.Vector3(0, 4, 0))
  const prevKey = useRef('')
  const orbitAngle = useRef(0)
  const orbitOffset = useRef(new THREE.Vector3())
  const orbitActive = useRef(false)
  const tweening = useRef(false)
  const invalidate = useThree((s) => s.invalidate)

  const focusTarget = selectedBookSlug
    ? 'book'
    : selectedCredentialSlug
      ? 'credential'
      : labRoomSlug && viewMode === 'focus'
        ? 'lab'
        : null

  const allowOrbit =
    viewMode === 'room' &&
    !focusTarget &&
    !!(labRoomSlug || libraryRoomSlug)

  function syncOrbitBase(position: [number, number, number], lookAt: [number, number, number]) {
    orbitOffset.current.set(
      position[0] - lookAt[0],
      position[1] - lookAt[1],
      position[2] - lookAt[2],
    )
    orbitAngle.current = 0
    orbitActive.current = allowOrbit && !reducedMotion
  }

  useEffect(() => {
    const cam = camRef.current
    if (!cam) return

    const target = cameraPreset(floorId, viewMode, {
      phase,
      bootDone,
      factoryStop,
      libraryRoomSlug,
      labRoomSlug,
      focusTarget,
    })

    const key = `${phase}-${floorId}-${viewMode}-${factoryStop}-${libraryRoomSlug}-${labRoomSlug}-${focusTarget}`
    const sameFloor = prevKey.current.includes(`-${floorId}-`)
    const inRoom = viewMode === 'room' && prevKey.current.includes(`${floorId}-room-`)

    const labStationSwitch =
      floorId === '52' && viewMode === 'room' && !!labRoomSlug && inRoom && prevKey.current !== key
    const vaultStationSwitch =
      floorId === '99' && viewMode === 'room' && !!libraryRoomSlug && inRoom && prevKey.current !== key

    const stationSwitch = labStationSwitch || vaultStationSwitch
    const panOnly = sameFloor && prevKey.current !== key && viewMode !== 'tower' && !stationSwitch

    orbitActive.current = false
    tweening.current = true

    if (reducedMotion) {
      cam.position.set(...target.position)
      cam.zoom = target.zoom
      look.current.set(...target.lookAt)
      cam.lookAt(look.current)
      cam.updateProjectionMatrix()
      syncOrbitBase(target.position, target.lookAt)
      tweening.current = false
      invalidate()
      prevKey.current = key
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

    const isRoofClose = floorId === 'roof' && (viewMode === 'room' || viewMode === 'focus' || viewMode === 'floor')
    const isBoot = phase === 'boot' || phase === 'survey'
    const duration = stationSwitch
      ? DUR.stationPan
      : panOnly
        ? DUR.pan
        : isBoot
          ? DUR.extrude
          : viewMode === 'focus'
            ? DUR.focus
            : isRoofClose
              ? DUR.roofAscent
              : viewMode === 'tower'
                ? DUR.threshold
                : viewMode === 'room'
                  ? DUR.room
                  : DUR.civic

    const ease = stationSwitch ? EASE_INK : EASE_SITE

    const tween = gsap.to(from, {
      x: target.position[0],
      y: target.position[1],
      z: target.position[2],
      zoom: target.zoom,
      lx: target.lookAt[0],
      ly: target.lookAt[1],
      lz: target.lookAt[2],
      duration,
      ease,
      onUpdate: () => {
        cam.position.set(from.x, from.y, from.z)
        cam.zoom = from.zoom
        look.current.set(from.lx, from.ly, from.lz)
        cam.lookAt(look.current)
        cam.updateProjectionMatrix()
        invalidate()
      },
      onComplete: () => {
        syncOrbitBase(target.position, target.lookAt)
        tweening.current = false
      },
    })

    prevKey.current = key
    return () => {
      tween.kill()
      tweening.current = false
    }
  }, [
    floorId,
    viewMode,
    phase,
    bootDone,
    factoryStop,
    libraryRoomSlug,
    labRoomSlug,
    focusTarget,
    reducedMotion,
    allowOrbit,
    invalidate,
  ])

  useFrame((_, delta) => {
    const cam = camRef.current
    if (!cam) return
    cam.lookAt(look.current)

    if (tweening.current || !orbitActive.current) return

    orbitAngle.current += delta * ORBIT_SPEED
    const offset = orbitOffset.current.clone()
    offset.applyAxisAngle(new THREE.Vector3(0, 1, 0), orbitAngle.current)
    cam.position.copy(look.current).add(offset)
    invalidate()
  })

  const midY = towerTotalHeight() / 2 - 1
  return (
    <OrthographicCamera
      ref={camRef}
      makeDefault
      near={0.1}
      far={300}
      position={[7.5, midY + 1.2, 19]}
      zoom={26}
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
      <ambientLight intensity={0.58} color="#B8DCE8" />
      <directionalLight position={[6, 18, 8]} intensity={0.75} color="#E6F4FA" />
      <directionalLight position={[-5, 10, -4]} intensity={0.28} color="#56DAFF" />
    </>
  )
}
