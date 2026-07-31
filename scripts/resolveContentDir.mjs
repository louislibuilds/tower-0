import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

/** Personal site content — `content/` when present, else fork-safe `content.sample/`. */
export function resolveContentDir() {
  const personal = path.join(root, 'content')
  if (fs.existsSync(personal)) return personal
  return path.join(root, 'content.sample')
}

export const projectRoot = root
