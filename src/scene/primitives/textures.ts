import * as THREE from 'three'

let groundTex: THREE.CanvasTexture | null = null
let shadowTex: THREE.CanvasTexture | null = null

function softShadowTexture(): THREE.CanvasTexture {
  if (shadowTex) return shadowTex
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(64, 64, 6, 64, 64, 64)
  g.addColorStop(0, 'rgba(42, 44, 46, 0.8)')
  g.addColorStop(0.35, 'rgba(42, 44, 46, 0.4)')
  g.addColorStop(0.72, 'rgba(42, 44, 46, 0.12)')
  g.addColorStop(1, 'rgba(42, 44, 46, 0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 128, 128)
  shadowTex = new THREE.CanvasTexture(c)
  return shadowTex
}

function groundWashTexture(): THREE.CanvasTexture {
  if (groundTex) return groundTex
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(64, 64, 12, 64, 64, 64)
  g.addColorStop(0, 'rgba(42, 44, 46, 0.5)')
  g.addColorStop(0.55, 'rgba(42, 44, 46, 0.32)')
  g.addColorStop(0.85, 'rgba(42, 44, 46, 0.1)')
  g.addColorStop(1, 'rgba(42, 44, 46, 0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 128, 128)
  groundTex = new THREE.CanvasTexture(c)
  return groundTex
}

export function useSoftShadowTexture(): THREE.CanvasTexture {
  return softShadowTexture()
}

export function useGroundWashTexture(): THREE.CanvasTexture {
  return groundWashTexture()
}
