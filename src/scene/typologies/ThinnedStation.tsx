import { useLayoutEffect, useRef, type ReactNode } from 'react'
import * as THREE from 'three'

/** Non-active sibling stations — ghost fill + ink wireframe for focus isolation */
export function ThinnedStation({ thin, children }: { thin: boolean; children: ReactNode }) {
  const ref = useRef<THREE.Group>(null)

  useLayoutEffect(() => {
    const g = ref.current
    if (!g) return
    g.traverse((o) => {
      if (thin) {
        o.raycast = () => {}
      } else {
        o.raycast = THREE.Mesh.prototype.raycast
      }
      const mesh = o as THREE.Mesh
      if (!mesh.isMesh) return
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
      mats.forEach((mat) => {
        const m = mat as THREE.MeshStandardMaterial
        if (!m.isMeshStandardMaterial) return
        m.transparent = true
        m.opacity = thin ? 0.04 : 1
        m.wireframe = thin
        m.depthWrite = !thin
      })
    })
  }, [thin])

  return <group ref={ref}>{children}</group>
}
