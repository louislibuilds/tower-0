import fs from 'node:fs'

const src = fs.readFileSync('src/i18n/strings.ts', 'utf8')

/** Extract `{ ... }` object literal assigned to `const <name>`. */
function extractLocaleObject(varName) {
  const marker = `const ${varName}: LocaleStrings = {`
  const start = src.indexOf(marker)
  if (start < 0) throw new Error(`marker not found: ${varName}`)

  let i = start + marker.length - 1
  let depth = 0
  let inString = null
  let escape = false

  for (; i < src.length; i++) {
    const ch = src[i]

    if (inString) {
      if (escape) {
        escape = false
        continue
      }
      if (ch === '\\') {
        escape = true
        continue
      }
      if (ch === inString) inString = null
      continue
    }

    if (ch === "'" || ch === '"' || ch === '`') {
      inString = ch
      continue
    }

    if (ch === '{') depth++
    else if (ch === '}') {
      depth--
      if (depth === 0) return src.slice(start + marker.length - 1, i + 1)
    }
  }

  throw new Error(`unclosed object for ${varName}`)
}

function pick(objText, paths) {
  const out = {}
  for (const [key, path] of Object.entries(paths)) {
    if (Array.isArray(path)) {
      const sub = extractNested(objText, path[0])
      out[key] = `{ ${path.slice(1).map((p) => `${p}: ${extractNested(sub, p)}`).join(', ')} }`
    } else if (path === null) {
      out[key] = extractNested(objText, key)
    } else {
      out[key] = extractNested(objText, path)
    }
  }
  return out
}

function extractNested(objText, key) {
  const re = new RegExp(`\\b${key}\\s*:\\s*`)
  const m = re.exec(objText)
  if (!m) throw new Error(`key ${key} not found`)

  let i = m.index + m[0].length
  while (i < objText.length && /\s/.test(objText[i])) i++

  const open = objText[i]
  if (open === '{' || open === '[') {
    const close = open === '{' ? '}' : ']'
    let depth = 0
    let inString = null
    let escape = false
    for (let j = i; j < objText.length; j++) {
      const ch = objText[j]
      if (inString) {
        if (escape) {
          escape = false
          continue
        }
        if (ch === '\\') {
          escape = true
          continue
        }
        if (ch === inString) inString = null
        continue
      }
      if (ch === "'" || ch === '"' || ch === '`') {
        inString = ch
        continue
      }
      if (ch === open) depth++
      else if (ch === close) {
        depth--
        if (depth === 0) return objText.slice(i, j + 1)
      }
    }
    throw new Error(`unclosed ${key}`)
  }

  // string literal
  if (open === "'" || open === '"') {
    let j = i + 1
    let escape = false
    for (; j < objText.length; j++) {
      const ch = objText[j]
      if (escape) {
        escape = false
        continue
      }
      if (ch === '\\') {
        escape = true
        continue
      }
      if (ch === open) return objText.slice(i, j + 1)
    }
  }

  throw new Error(`unsupported value for ${key}`)
}

const localeVars = [
  ['en', 'en'],
  ['zhTW', 'zh-TW'],
  ['ja', 'ja'],
]

let file = `import type { SiteCopyLocales } from '../../src/i18n/copyTypes'\n\nexport const SITE_COPY: SiteCopyLocales = {\n`

for (const [varName, locale] of localeVars) {
  const obj = extractLocaleObject(varName)
  const site = extractNested(obj, 'site')
  const lobby = extractNested(obj, 'lobby')
  const factory = extractNested(obj, 'factory')
  const infra = extractNested(obj, 'infra')
  const library = extractNested(obj, 'library')

  file += `  '${locale}': {
    site: { siteCode: ${extractNested(site, 'siteCode')}, architectName: ${extractNested(site, 'architectName')} },
    stamp: ${extractNested(obj, 'stamp')},
    lobby: { motto: ${extractNested(lobby, 'motto')}, floorIntro: ${extractNested(lobby, 'floorIntro')} },
    factory: {
      panelTitle: ${extractNested(factory, 'panelTitle')},
      completionLabel: ${extractNested(factory, 'completionLabel')},
      tsaCertTitle: ${extractNested(factory, 'tsaCertTitle')},
      deansListCertTitle: ${extractNested(factory, 'deansListCertTitle')},
      degreeCertTitle: ${extractNested(factory, 'degreeCertTitle')},
    },
    infra: { softSkillGroups: ${extractNested(infra, 'softSkillGroups')} },
    library: {
      featuredRole: ${extractNested(library, 'featuredRole')},
      featuredBullets: ${extractNested(library, 'featuredBullets')},
      publications: ${extractNested(library, 'publications')},
    },
    projects: ${extractNested(obj, 'projects')},
    credentials: ${extractNested(obj, 'credentials')},
  },
`
}

file += '}\n'

fs.mkdirSync('content/i18n', { recursive: true })
fs.writeFileSync('content/i18n/copy.ts', file)
console.log(`wrote content/i18n/copy.ts (${file.length} bytes)`)
