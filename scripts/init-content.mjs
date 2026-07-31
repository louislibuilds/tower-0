import fs from 'node:fs'
import path from 'node:path'
import { projectRoot } from './resolveContentDir.mjs'

const sample = path.join(projectRoot, 'content.sample')
const personal = path.join(projectRoot, 'content')

if (fs.existsSync(personal)) {
  console.log('[content:init] content/ already exists — skipped')
  process.exit(0)
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name)
    const to = path.join(dest, entry.name)
    if (entry.isDirectory()) copyDir(from, to)
    else fs.copyFileSync(from, to)
  }
}

copyDir(sample, personal)
console.log('[content:init] created content/ from content.sample — customize before deploy')
