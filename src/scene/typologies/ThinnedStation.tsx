import { useFrame } from '@react-three/fiber'
import { useLayoutEffect, useRef, type ReactNode } from 'react'
import * as THREE from 'three'

function nativeRaycast(o: THREE.Object3D): THREE.Object3D['raycast'] {
  const mesh = o as THREE.Mesh
  const line = o as THREE.Line
  const segments = o as THREE.LineSegments
  if (mesh.isMesh) return THREE.Mesh.prototype.raycast
  if (segments.isLineSegments) return THREE.LineSegments.prototype.raycast
  if (line.isLine) return THREE.Line.prototype.raycast
  return () => {}
}

/** Disable picks on ghost pods — visuals come from declarative `thin` props */
function applyThinRaycast(root: THREE.Object3D | null, thin: boolean) {
  if (!root) return
  root.traverse((o) => {
    if (thin) {
      if (!o.userData.thinRaycastDisabled) {
        o.userData.prevRaycast = o.raycast
        o.userData.thinRaycastDisabled = true
      }
      o.raycast = () => {}
    } else if (o.userData.thinRaycastDisabled) {
      o.raycast = o.userData.prevRaycast ?? nativeRaycast(o)
      delete o.userData.thinRaycastDisabled
      delete o.userData.prevRaycast
    }
  })
}

/** Non-active sibling stations — ghost visuals + no pointer hits */
export function ThinnedStation({ thin, children }: { thin: boolean; children: ReactNode }) {
  const ref = useRef<THREE.Group>(null)

  useLayoutEffect(() => {
    applyThinRaycast(ref.current, thin)
  }, [thin])

  useFrame(() => {
    if (thin) applyThinRaycast(ref.current, true)
  })

  return <group ref={ref}>{children}</group>
}
