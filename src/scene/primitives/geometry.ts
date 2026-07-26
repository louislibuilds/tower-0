import * as THREE from 'three'

/** Partial polyline along a path — ink-on technique for boot footprint and flow traces. */
export function partialPolyline(points: THREE.Vector3[], t: number): THREE.Vector3[] {
  if (t >= 0.999) return points
  if (t <= 0) return [points[0].clone(), points[0].clone()]

  const lens: number[] = []
  let total = 0
  for (let i = 0; i < points.length - 1; i++) {
    const l = points[i].distanceTo(points[i + 1])
    lens.push(l)
    total += l
  }
  if (total <= 0) return [points[0].clone(), points[0].clone()]

  let remain = t * total
  const out: THREE.Vector3[] = [points[0].clone()]
  for (let i = 0; i < lens.length; i++) {
    if (remain <= 0) break
    if (remain >= lens[i]) {
      out.push(points[i + 1].clone())
      remain -= lens[i]
    } else {
      out.push(new THREE.Vector3().lerpVectors(points[i], points[i + 1], remain / lens[i]))
      remain = 0
    }
  }
  return out.length >= 2 ? out : [points[0].clone(), points[0].clone()]
}

/** Deterministic 0–1 hash from grid indices (stable warm-window picks). */
export function gridHash(col: number, row: number, salt = 0): number {
  const n = Math.sin(col * 12.9898 + row * 78.233 + salt * 43.17) * 43758.5453
  return n - Math.floor(n)
}
