import fs from 'node:fs'

const src = fs.readFileSync('src/i18n/strings.ts', 'utf8')

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
      if (depth === 0) return { start: start + marker.length - 1, end: i + 1, text: src.slice(start + marker.length - 1, i + 1) }
    }
  }
  throw new Error(`unclosed ${varName}`)
}

function removeKeyBlock(objText, key) {
  const re = new RegExp(`\\n  ${key}: \\{`)
  const m = re.exec(objText)
  if (!m) throw new Error(`key ${key} not found`)
  let i = m.index + m[0].length - 1
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
    if (ch === '{') depth++
    else if (ch === '}') {
      depth--
      if (depth === 0) {
        let tail = j + 1
        if (objText[tail] === ',') tail++
        return objText.slice(0, m.index) + objText.slice(tail)
      }
    }
  }
  throw new Error(`unclosed block ${key}`)
}

function replaceStringValue(objText, key, value) {
  const re = new RegExp(`(${key}: )('(?:\\\\'|[^'])*'|"(?:\\\\"|[^"])*")`)
  return objText.replace(re, `$1${value}`)
}

const headerEnd = src.indexOf('const en: LocaleStrings = {')
const header = src.slice(0, headerEnd)

const footerStart = src.indexOf('export const STRINGS:')
const footer = src.slice(footerStart)

const localeVars = [
  ['en', 'enBase'],
  ['zhTW', 'zhTWBase'],
  ['ja', 'jaBase'],
]

let body = `import { SITE_COPY } from '@site-content/i18n/copy'\nimport type { SiteCopy } from './copyTypes'\n\n`

body += `function mergeSiteCopy(
  base: Omit<LocaleStrings, 'projects' | 'credentials'>,
  copy: SiteCopy,
): LocaleStrings {
  return {
    ...base,
    site: { ...base.site, siteCode: copy.site.siteCode, architectName: copy.site.architectName },
    stamp: copy.stamp,
    lobby: { ...base.lobby, motto: copy.lobby.motto, floorIntro: copy.lobby.floorIntro },
    factory: {
      ...base.factory,
      panelTitle: copy.factory.panelTitle,
      completionLabel: copy.factory.completionLabel,
      tsaCertTitle: copy.factory.tsaCertTitle,
      deansListCertTitle: copy.factory.deansListCertTitle,
      degreeCertTitle: copy.factory.degreeCertTitle,
    },
    infra: { ...base.infra, softSkillGroups: copy.infra.softSkillGroups },
    library: {
      ...base.library,
      featuredRole: copy.library.featuredRole,
      featuredBullets: copy.library.featuredBullets,
      publications: copy.library.publications,
    },
    projects: copy.projects,
    credentials: copy.credentials,
  }
}

`

for (const [varName, baseName] of localeVars) {
  let obj = extractLocaleObject(varName).text
  obj = removeKeyBlock(obj, 'projects')
  obj = removeKeyBlock(obj, 'credentials')
  obj = replaceStringValue(obj, 'siteCode', "'your-brand · Your Name present'")
  obj = replaceStringValue(obj, 'architectName', "'Your Name'")
  obj = replaceStringValue(obj, 'name', "'YOUR NAME'")
  obj = replaceStringValue(obj, 'motto', "'Your motto — one line that sets the tone.'")
  obj = replaceStringValue(obj, 'floorIntro', "'Your positioning paragraph — how you describe what you build.'")
  obj = replaceStringValue(obj, 'panelTitle', "'Your University · Your Degree'")
  obj = replaceStringValue(obj, 'completionLabel', "'PROGRAM COMPLETE'")
  obj = replaceStringValue(obj, 'tsaCertTitle', "'Certificate · Recognition'")
  obj = replaceStringValue(obj, 'deansListCertTitle', "'Certificate · Academic Honor'")
  obj = replaceStringValue(obj, 'degreeCertTitle', "'Certificate · Degree'")
  obj = replaceStringValue(obj, 'featuredRole', "'Your Role Title'")
  body += `const ${baseName} = ${obj} satisfies Omit<LocaleStrings, 'projects' | 'credentials'>\n\n`
}

body += `const en = mergeSiteCopy(enBase, SITE_COPY.en)
const zhTW = mergeSiteCopy(zhTWBase, SITE_COPY['zh-TW'])
const ja = mergeSiteCopy(jaBase, SITE_COPY.ja)

`

fs.writeFileSync('src/i18n/strings.ts', header + body + footer)
console.log('refactored src/i18n/strings.ts')
