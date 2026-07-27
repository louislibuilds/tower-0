/** Shared ghost styling for non-active station pods */
export const THIN_MESH_OPACITY = 0.11
export const THIN_LINE_OPACITY = 0.06
export const THIN_INK = '#9aa0a8'

export function ghostLit(thin: boolean | undefined, entered: boolean, active?: boolean) {
  return !thin && (entered || !!active)
}
