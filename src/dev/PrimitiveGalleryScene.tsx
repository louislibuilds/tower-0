import { Line, OrthographicCamera } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { SiteLights } from '../camera/OrthoRig'
import { DUR, EASE_INK } from '../scene/motion'
import { getScenePalette } from '../scene/palette'
import {
  BlobShadow,
  FlowTrace,
  GroundWash,
  InkEdges,
  PaletteProvider,
  partialPolyline,
  Plinth,
  SurveyGrid,
  usePalette,
  WindowMatrix,
} from '../scene/primitives'

function InkFootprintDemo() {
  const pal = usePalette()
  const [ink, setInk] = useState(0)
  const invalidate = useThree((s) => s.invalidate)

  useEffect(() => {
    const state = { t: 0 }
    const tween = gsap.to(state, {
      t: 1,
      duration: DUR.ink,
      ease: EASE_INK,
      repeat: -1,
      yoyo: true,
      onUpdate: () => {
        setInk(state.t)
        invalidate()
      },
    })
    return () => {
      tween.kill()
    }
  }, [invalidate])

  const pts = useMemo(() => {
    const full = [
      new THREE.Vector3(-1.2, 0.02, -0.8),
      new THREE.Vector3(1.2, 0.02, -0.8),
      new THREE.Vector3(1.2, 0.02, 0.8),
      new THREE.Vector3(-1.2, 0.02, 0.8),
      new THREE.Vector3(-1.2, 0.02, -0.8),
    ]
    return partialPolyline(full, ink)
  }, [ink])

  return <Line points={pts} color={pal.signal} lineWidth={2} transparent opacity={0.95} />
}

function InkEdgesDemo() {
  const pal = usePalette()
  return (
    <mesh position={[0, 0.35, 0]}>
      <boxGeometry args={[0.7, 0.7, 0.7]} />
      <meshStandardMaterial color={pal.resin} transparent opacity={0.35} />
      <InkEdges lineWidth={1.5} />
    </mesh>
  )
}

function PlinthDemo() {
  const [hover, setHover] = useState(false)
  const pal = usePalette()
  return (
    <Plinth width={0.9} depth={0.6} hover={hover} onHover={setHover}>
      <mesh>
        <boxGeometry args={[0.35, 0.35, 0.35]} />
        <meshStandardMaterial color={hover ? pal.signal : pal.concrete} />
        <InkEdges color={hover ? pal.signal : pal.graphite} />
      </mesh>
    </Plinth>
  )
}

function FlowTraceDemo({ active }: { active: boolean }) {
  const path = useMemo(
    () => [
      new THREE.Vector3(-0.5, 0.05, 0),
      new THREE.Vector3(-0.2, 0.05, 0.3),
      new THREE.Vector3(0.15, 0.05, 0.1),
      new THREE.Vector3(0.5, 0.05, 0.35),
    ],
    [],
  )
  const rest = useMemo(
    () => [
      [new THREE.Vector3(-0.5, 0.05, -0.15), new THREE.Vector3(0.5, 0.05, -0.15)],
      [new THREE.Vector3(-0.5, 0.05, 0.45), new THREE.Vector3(0.5, 0.05, 0.45)],
    ],
    [],
  )
  return <FlowTrace restRuns={rest} path={path} active={active} />
}

function GalleryContent({ night }: { night: boolean }) {
  const camRef = useRef<THREE.OrthographicCamera>(null)
  const [flowActive, setFlowActive] = useState(false)

  useFrame(() => {
    camRef.current?.lookAt(0, 0.5, 0)
  })

  return (
    <>
      <OrthographicCamera ref={camRef} makeDefault position={[0, 8, 14]} zoom={52} near={0.1} far={200} />
      <SurveyGrid extent={8} step={1} opacity={0.2} />

      <group position={[-5, 0, 0]}>
        <InkFootprintDemo />
      </group>

      <group position={[-2.5, 0, 0]}>
        <InkEdgesDemo />
        <BlobShadow position={[0, 0.002, 0.1]} width={1.2} depth={0.9} />
      </group>

      <group position={[0, 0, 0]}>
        <WindowMatrix width={1.4} height={1.1} night={night} active cols={5} rows={4} pattern="grid" />
      </group>

      <group position={[2.5, 0, 0]}>
        <GroundWash width={2} depth={1.4} opacity={0.55} />
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[0.8, 0.5, 0.6]} />
          <meshStandardMaterial color="#3A3C40" transparent opacity={0.5} />
          <InkEdges />
        </mesh>
      </group>

      <group position={[5, 0, 0]}>
        <PlinthDemo />
      </group>

      <group
        position={[0, 0, 2.2]}
        onPointerOver={() => setFlowActive(true)}
        onPointerOut={() => setFlowActive(false)}
      >
        <FlowTraceDemo active={flowActive} />
      </group>
    </>
  )
}

export function PrimitiveGalleryCanvas({ night }: { night: boolean }) {
  const pal = getScenePalette('dark')
  return (
    <div className="typology-gallery__canvas">
      <Canvas orthographic frameloop="always" dpr={[1, 2]} gl={{ antialias: true }}>
        <color attach="background" args={[pal.paper]} />
        <SiteLights theme="dark" />
        <PaletteProvider palette={pal}>
          <GalleryContent night={night} />
        </PaletteProvider>
      </Canvas>
    </div>
  )
}
