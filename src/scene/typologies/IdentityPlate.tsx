import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { profile } from '../../data/profile'
import type { Theme } from '../../context/SiteContext'
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

/** Identity plate mesh — mounted on 99F top front edge (R signage) */
export function IdentityPlate({
  theme,
  focus = false,
  muted = false,
}: {
  theme: Theme
  /** Roof selected — full prominence */
  focus?: boolean
  /** 99F selected — fade so vault floor reads first */
  muted?: boolean
}) {
  const m = typologyMat(theme, '#2F6BFF', focus)
  const plateMap = useIdentityPlateMap(theme)
  const frameEdges = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.38, 0.48, 0.018)), [])
  const plateOpacity = muted ? (theme === 'dark' ? 0.16 : 0.1) : 1
  const frameColor = focus ? m.pal.signal : m.pal.graphite
  const frameOpacity = muted ? 0.08 : focus ? 0.95 : 0.72
  const ghosted = muted && !focus

  return (
    <group>
      <mesh position={[0, 0.24, 0.01]} raycast={() => null}>
        <boxGeometry args={[0.38, 0.48, 0.018]} />
        <meshStandardMaterial
          map={plateMap}
          roughness={0.85}
          transparent={ghosted || plateOpacity < 1}
          opacity={plateOpacity}
          depthWrite={!ghosted}
        />
      </mesh>

      {!ghosted && (
        <lineSegments geometry={frameEdges} position={[0, 0.24, 0.02]} raycast={() => null}>
          <lineBasicMaterial color={frameColor} transparent opacity={frameOpacity} />
        </lineSegments>
      )}
    </group>
  )
}
