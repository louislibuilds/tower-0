function viewportZoomScale(width, height) {
  const aspect = width / height
  const refAspect = 1440 / 900
  const narrow = Math.min(1, aspect / refAspect)
  const short = Math.min(1, height / 720)
  return Math.max(0.72, Math.min(1, narrow * 0.85 + short * 0.15))
}

function scaledZoom(baseZoom, width, height) {
  return baseZoom * viewportZoomScale(width, height)
}

const cases = [
  { w: 1440, h: 900, expectScale: 1, label: 'desktop reference' },
  { w: 390, h: 844, expectScaleMax: 0.85, label: 'iphone portrait' },
  { w: 844, h: 390, expectScaleMax: 0.95, label: 'iphone landscape' },
  { w: 1024, h: 768, expectScaleMax: 1, label: 'ipad landscape' },
]

let failed = 0
for (const c of cases) {
  const scale = viewportZoomScale(c.w, c.h)
  const zoom = scaledZoom(100, c.w, c.h)
  const okMin = scale >= 0.72 && scale <= 1
  const okMax = c.expectScale ? Math.abs(scale - c.expectScale) < 0.01 : scale <= (c.expectScaleMax ?? 1)
  const okZoom = Math.abs(zoom - 100 * scale) < 0.01
  const ok = okMin && okMax && okZoom
  console.log(ok ? '✓' : '✗', c.label, { scale, zoom })
  if (!ok) failed++
}

process.exit(failed ? 1 : 0)
