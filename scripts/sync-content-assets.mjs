import fs from 'node:fs'
import path from 'node:path'
import { projectRoot, resolveContentDir } from './resolveContentDir.mjs'

const contentDir = resolveContentDir()
const resumeSrc = path.join(contentDir, 'resume')
const resumeDest = path.join(projectRoot, 'public', 'resume')

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    if (fs.existsSync(dest)) fs.rmSync(dest, { recursive: true, force: true })
    return
  }

  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name)
    const to = path.join(dest, entry.name)
    if (entry.isDirectory()) copyDir(from, to)
    else fs.copyFileSync(from, to)
  }
}

copyDir(resumeSrc, resumeDest)
console.log(`[sync-content-assets] resume ← ${path.relative(projectRoot, contentDir)}/resume`)
