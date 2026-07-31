import fs from 'node:fs'

const src = fs.readFileSync('content/i18n/copy.ts', 'utf8')

function extractLocaleBlock(localeKey) {
  const marker = `'${localeKey}': {`
  const start = src.indexOf(marker)
  if (start < 0) throw new Error(`locale ${localeKey} not found`)
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
  throw new Error(`unclosed locale ${localeKey}`)
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
  }
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
  throw new Error(`unsupported ${key}`)
}

function sanitizeProjects(text) {
  return text
    .replace(/\(\d+\s*HD\)/gi, '')
    .replace(/\b\d+\s*HD\b/gi, '')
    .replace(/WAM\s*[\d.]+/gi, '')
    .replace(/GPA\s*[\d.]+\/7/gi, '')
    .replace(/Assessment 3 final:\s*/gi, '')
    .replace(/Final grade:\s*[\d.]+\s*HD\.?/gi, '')
    .replace(/High Distinction \(\d+\)/gi, '')
    .replace(/,\s*course:\s*'[^']*',/g, '')
    .replace(/,\s*course:\s*"[^"]*",/g, '')
    .replace(/ · TechFest 2026 · \s*$/gm, ' · TechFest 2026 showcase.')
    .replace(/\n{3,}/g, '\n\n')
}

const GENERIC_FACTORY = `{
      panelTitle: 'University of Technology Sydney · Master of Information Technology',
      completionLabel: 'PROGRAM COMPLETE',
      tsaCertTitle: 'Certificate · Leadership / Service',
      deansListCertTitle: 'Certificate · Academic Honor',
      degreeCertTitle: 'Certificate · Degree',
    }`

const CREDENTIALS = {
  en: `{
      degree: {
        title: 'Master of Information Technology',
        detail: 'Program · credit points · add public summary if desired',
        body: 'Graduation summary — coursework themes and skills gained. Detailed marks and cert scans belong in gitignored content/.',
      },
      award: {
        title: 'Sample Honor or Award',
        detail: 'Issuer · year',
        body: 'Public-safe credential blurb — replace when forking.',
      },
    }`,
  'zh-TW': `{
      degree: {
        title: '資訊科技碩士',
        detail: '學程 · 學分 · 可填公開摘要',
        body: '畢業摘要 — 修課主軸與能力。詳細成績與證書掃描請放在 gitignored 的 content/。',
      },
      award: {
        title: '範例榮譽或獎項',
        detail: '頒發單位 · 年份',
        body: '可公開的證照摘要 — fork 時請替換成你自己的內容。',
      },
    }`,
  ja: `{
      degree: {
        title: '情報工学修士',
        detail: 'プログラム · 単位 · 公開する場合は概要のみ',
        body: '卒業サマリー — 履修テーマとスキル。詳細な成績と証書スキャンは gitignored の content/ へ。',
      },
      award: {
        title: 'サンプル表彰・受賞',
        detail: '授与機関 · 年',
        body: '公開してよい資格の概要 — fork 時に差し替え。',
      },
    }`,
}

let file = `import type { SiteCopyLocales } from '../../src/i18n/copyTypes'

/**
 * Public sample — Louis Li author identity & contact; no real grades, cert scans,
 * or mark-heavy credential narrative (those live in gitignored content/).
 */
export const SITE_COPY: SiteCopyLocales = {
`

for (const locale of ['en', 'zh-TW', 'ja']) {
  const obj = extractLocaleBlock(locale)
  const site = extractNested(obj, 'site')
  const lobby = extractNested(obj, 'lobby')
  const infra = extractNested(obj, 'infra')
  const library = extractNested(obj, 'library')
  const projects = sanitizeProjects(extractNested(obj, 'projects'))

  file += `  '${locale}': {
    site: { siteCode: ${extractNested(site, 'siteCode')}, architectName: ${extractNested(site, 'architectName')} },
    stamp: ${extractNested(obj, 'stamp')},
    lobby: { motto: ${extractNested(lobby, 'motto')}, floorIntro: ${extractNested(lobby, 'floorIntro')} },
    factory: ${GENERIC_FACTORY},
    infra: { softSkillGroups: ${extractNested(infra, 'softSkillGroups')} },
    library: {
      featuredRole: ${extractNested(library, 'featuredRole')},
      featuredBullets: ${extractNested(library, 'featuredBullets')},
      publications: ${extractNested(library, 'publications')},
    },
    projects: ${projects},
    credentials: ${CREDENTIALS[locale]},
  },
`
}

file += '}\n'
fs.writeFileSync('content.sample/i18n/copy.ts', file)
console.log('wrote content.sample/i18n/copy.ts')
