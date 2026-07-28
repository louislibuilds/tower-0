import { useState } from 'react'

function detectWebGL(): boolean {
  if (typeof window === 'undefined') return true
  try {
    const canvas = document.createElement('canvas')
    return !!(
      canvas.getContext('webgl2') ??
      canvas.getContext('webgl') ??
      canvas.getContext('experimental-webgl')
    )
  } catch {
    return false
  }
}

export function useWebGL(): boolean {
  const [supported] = useState(detectWebGL)
  return supported
}
