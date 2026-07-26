import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { profile } from '../../data/profile'
import { getScenePalette } from '../palette'
import type { Theme } from '../../context/SiteContext'
import { SPIRE_HEIGHT } from '../towerGeometry'

function useIdentityPlateMap(theme: Theme) {
  const pal = getScenePalette(theme)

  const tex = useMemo(() => {
    const w = 512
    const h = 640
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')!
    const ink = theme === 'dark' ? '#f0eee8' : '#1e2022'
    const mute = theme === 'dark' ? '#a8aaae' : '#5a5d61'
    const rule = theme === 'dark' ? '#3a3c40' : '#c4c2bc'
    const pad = 36
    let y = 48

    ctx.fillStyle = pal.resin
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = mute
    ctx.font = '600 16px monospace'
    ctx.fillText(`${profile.displayName} · TOWER 0`, pad, y)
    y += 48

    ctx.fillStyle = ink
    ctx.font = '600 34px Georgia, serif'
    ctx.fillText(profile.legalName, pad, y)
    y += 40

    ctx.fillStyle = mute
    ctx.font = 'italic 18px Georgia, serif'
    ctx.fillText(profile.degree, pad, y)
    y += 32

    ctx.fillStyle = ink
    ctx.font = '16px Georgia, serif'
    ctx.fillText(`${profile.institution}`, pad, y)
    y += 28
    ctx.fillText(`WAM ${profile.wam} · GPA ${profile.gpa}/${profile.gpaScale}`, pad, y)
    y += 36

    ctx.strokeStyle = rule
    ctx.beginPath()
    ctx.moveTo(pad, y)
    ctx.lineTo(w - pad, y)
    ctx.stroke()
    y += 36

    const doors: [string, string][] = [
      ['MAIL', 'louis.li.builds@gmail.com'],
      ['GITHUB', 'github.com/louislibuilds'],
      ['LINKEDIN', 'linkedin.com/in/louis-li-builds'],
      ['NAGI', 'bubblechickenlab.com'],
    ]
    ctx.font = '600 13px monospace'
    for (const [label, addr] of doors) {
      ctx.fillStyle = mute
      ctx.fillText(label, pad, y)
      ctx.fillStyle = ink
      ctx.font = '14px monospace'
      ctx.fillText(addr, pad + 100, y)
      ctx.font = '600 13px monospace'
      y += 30
    }

    y = h - 44
    ctx.fillStyle = mute
    ctx.fillText('ZONE 0 · END OF SET', pad, y)

    const map = new THREE.CanvasTexture(canvas)
    map.colorSpace = THREE.SRGBColorSpace
    map.anisotropy = 4
    return map
  }, [theme, pal.resin])

  useEffect(() => () => tex.dispose(), [tex])
  return tex
}

/** Identity plate mounted at spire apex (resume2 R-ROOF) */
export function RoofPlate({ theme, entered }: { theme: Theme; entered: boolean }) {
  const pal = getScenePalette(theme)
  const plateMap = useIdentityPlateMap(theme)
  const apex = SPIRE_HEIGHT * 0.82

  return (
    <group position={[0, apex, 0]}>
      {/* Base cap */}
      <mesh position={[0, -0.04, 0]}>
        <cylinderGeometry args={[0.14, 0.18, 0.06, 6]} />
        <meshStandardMaterial color={pal.concrete} metalness={0.5} />
      </mesh>

      {/* Two posts */}
      {[-0.2, 0.2].map((x) => (
        <mesh key={x} position={[x, 0.12, 0.04]}>
          <boxGeometry args={[0.035, 0.28, 0.035]} />
          <meshStandardMaterial color={pal.graphite} metalness={0.7} />
        </mesh>
      ))}

      {/* Identity plate — vertical sign */}
      <mesh position={[0, 0.38, 0.06]}>
        <boxGeometry args={[0.62, 0.82, 0.028]} />
        <meshStandardMaterial map={plateMap} roughness={0.85} />
      </mesh>

      <mesh position={[0, 0.38, 0.075]}>
        <boxGeometry args={[0.64, 0.84, 0.012]} />
        <meshStandardMaterial color={entered ? pal.signal : pal.graphite} wireframe />
      </mesh>
    </group>
  )
}

/** Roof band — minimal ring only (plate lives on spire) */
export function RoofRoom({ theme, entered }: { theme: Theme; entered: boolean }) {
  const pal = getScenePalette(theme)
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.12, 0]}>
        <ringGeometry args={[0.35, 0.55, 32]} />
        <meshStandardMaterial color={pal.concrete} side={2} transparent opacity={entered ? 0.7 : 0.4} />
      </mesh>
    </group>
  )
}
