/** Reference: 1440×900 landscape. Narrower or shorter viewports scale zoom down. */
export function viewportZoomScale(width: number, height: number): number {
  const aspect = width / height
  const refAspect = 1440 / 900
  const narrow = Math.min(1, aspect / refAspect)
  const short = Math.min(1, height / 720)
  return Math.max(0.72, Math.min(1, narrow * 0.85 + short * 0.15))
}

export function scaledZoom(baseZoom: number, width: number, height: number): number {
  return baseZoom * viewportZoomScale(width, height)
}
