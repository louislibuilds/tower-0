import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { profile } from '../../data/profile'
import type { Theme } from '../../context/SiteContext'
import { WireBox } from '../primitives/WireBox'
import { typologyMat } from './types'

function useIdentityPlateMap(theme: Theme) {
  const m = typologyMat(theme, '#2F6BFF', true)

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

    ctx.fillStyle = m.body
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
  }, [theme, m.body])

  useEffect(() => () => tex.dispose(), [tex])
  return tex
}

/** R · Plate Deck — roof slab + identity plate at front edge */
export function PlateDeck({
  theme,
  entered,
}: {
  theme: Theme
  entered: boolean
  bandHeight?: number
}) {
  const m = typologyMat(theme, '#2F6BFF', entered)
  const plateMap = useIdentityPlateMap(theme)
  const frameEdges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.4, 0.5, 0.02)), [])

  return (
    <group>
      {/* helipad ring on deck surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.016, 0]}>
        <ringGeometry args={[0.22, 0.38, 32]} />
        <meshStandardMaterial color={m.pal.concrete} side={2} transparent opacity={entered ? 0.55 : 0.28} />
      </mesh>

      {/* identity plate — back-right edge, angled toward tower */}
      <group position={[0.36, 0.02, -0.42]} rotation={[0, -0.55, 0]}>
        <WireBox
          size={[0.85, 0.04, 0.65]}
          position={[0, 0, 0]}
          color={m.pal.graphite}
          fillOpacity={0.12}
          fillColor={m.pal.concrete}
        />

        {[-0.14, 0.14].map((x) => (
          <mesh key={x} position={[x, 0.14, 0.04]}>
            <boxGeometry args={[0.025, 0.22, 0.025]} />
            <meshStandardMaterial color={m.pal.graphite} metalness={0.7} />
          </mesh>
        ))}

        <mesh position={[0, 0.32, 0.05]}>
          <boxGeometry args={[0.38, 0.48, 0.018]} />
          <meshStandardMaterial map={plateMap} roughness={0.85} />
        </mesh>

        <lineSegments geometry={frameEdges} position={[0, 0.32, 0.06]}>
          <lineBasicMaterial color={entered ? m.pal.signal : m.pal.graphite} />
        </lineSegments>

        {entered && (
          <mesh position={[0, 0.38, 0.07]}>
            <boxGeometry args={[0.06, 0.02, 0.01]} />
            <meshStandardMaterial color={m.warm} emissive={m.warm} emissiveIntensity={0.5} />
          </mesh>
        )}
      </group>
    </group>
  )
}

export { PlateDeck as RoofPlate }
