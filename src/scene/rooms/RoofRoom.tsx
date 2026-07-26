import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { profile } from '../../data/profile'
import { getScenePalette } from '../palette'
import type { Theme } from '../../context/SiteContext'
import { WireBox } from '../primitives/WireBox'

function useIdentityPlateMap(theme: Theme) {
  const pal = getScenePalette(theme)

  const tex = useMemo(() => {
    const w = 512
    const h = 560
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')!
    const ink = theme === 'dark' ? '#f0eee8' : '#1e2022'
    const mute = theme === 'dark' ? '#a8aaae' : '#5a5d61'
    const rule = theme === 'dark' ? '#3a3c40' : '#c4c2bc'
    const pad = 32
    let y = 40

    ctx.fillStyle = pal.resin
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = mute
    ctx.font = '600 14px monospace'
    ctx.fillText('TOWER 0 · ZONE 0', pad, y)
    y += 40

    ctx.fillStyle = ink
    ctx.font = '700 38px Georgia, serif'
    ctx.fillText(profile.displayName, pad, y)
    y += 36

    ctx.fillStyle = mute
    ctx.font = 'italic 16px Georgia, serif'
    ctx.fillText(profile.degree, pad, y)
    y += 28

    ctx.fillStyle = ink
    ctx.font = '15px Georgia, serif'
    ctx.fillText(profile.institution, pad, y)
    y += 24
    ctx.fillText(`WAM ${profile.wam} · GPA ${profile.gpa}/${profile.gpaScale}`, pad, y)
    y += 32

    ctx.strokeStyle = rule
    ctx.beginPath()
    ctx.moveTo(pad, y)
    ctx.lineTo(w - pad, y)
    ctx.stroke()
    y += 28

    const doors: [string, string][] = [
      ['MAIL', 'louis.li.builds@gmail.com'],
      ['GITHUB', 'github.com/louislibuilds'],
      ['LINKEDIN', 'linkedin.com/in/louis-li-builds'],
    ]
    ctx.font = '600 12px monospace'
    for (const [label, addr] of doors) {
      ctx.fillStyle = mute
      ctx.fillText(label, pad, y)
      ctx.fillStyle = ink
      ctx.font = '13px monospace'
      ctx.fillText(addr, pad + 88, y)
      ctx.font = '600 12px monospace'
      y += 26
    }

    const map = new THREE.CanvasTexture(canvas)
    map.colorSpace = THREE.SRGBColorSpace
    map.anisotropy = 4
    return map
  }, [theme, pal.resin])

  useEffect(() => () => tex.dispose(), [tex])
  return tex
}

/** Identity plate standing on roof deck (resume2 R-ROOF) */
export function RoofPlate({ theme, entered, bandHeight }: { theme: Theme; entered: boolean; bandHeight: number }) {
  const pal = getScenePalette(theme)
  const plateMap = useIdentityPlateMap(theme)
  const deckY = bandHeight / 2 - 0.02

  const frameEdges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.4, 0.5, 0.02)), [])

  return (
    <group position={[0, deckY, 0.12]}>
      {/* Roof deck slab */}
      <WireBox size={[0.85, 0.04, 0.65]} position={[0, 0, 0]} color={pal.graphite} fillOpacity={0.12} fillColor={pal.concrete} />

      {/* Two posts + plate — smaller physical size */}
      {[-0.14, 0.14].map((x) => (
        <mesh key={x} position={[x, 0.14, 0.04]}>
          <boxGeometry args={[0.025, 0.22, 0.025]} />
          <meshStandardMaterial color={pal.graphite} metalness={0.7} />
        </mesh>
      ))}

      <mesh position={[0, 0.32, 0.05]}>
        <boxGeometry args={[0.38, 0.48, 0.018]} />
        <meshStandardMaterial map={plateMap} roughness={0.85} />
      </mesh>

      <lineSegments geometry={frameEdges} position={[0, 0.32, 0.06]}>
        <lineBasicMaterial color={entered ? pal.signal : pal.graphite} />
      </lineSegments>
    </group>
  )
}

/** Roof band — deck + identity plate */
export function RoofRoom({ theme, entered, bandHeight = 0.9 }: { theme: Theme; entered: boolean; bandHeight?: number }) {
  const pal = getScenePalette(theme)
  return (
    <group>
      <RoofPlate theme={theme} entered={entered} bandHeight={bandHeight} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, bandHeight / 2 - 0.45, 0]}>
        <ringGeometry args={[0.3, 0.5, 32]} />
        <meshStandardMaterial color={pal.concrete} side={2} transparent opacity={entered ? 0.5 : 0.25} />
      </mesh>
    </group>
  )
}
