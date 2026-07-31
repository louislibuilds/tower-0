export type Locale = 'en' | 'zh-TW' | 'ja'

export interface ProjectCopy {
  title: string
  hook: string
  body: string
  role: string
  team?: string
  course?: string
  credit?: string
}

export interface CredentialCopy {
  title: string
  detail?: string
  body?: string
  bullets?: string[]
  credit?: string
}

/** Personal narrative overlay — lives in content/ (gitignored) or content.sample/. */
export interface SiteCopy {
  site: {
    siteCode: string
    architectName: string
  }
  stamp: {
    code: string
    name: string
  }
  lobby: {
    motto: string
    floorIntro: string
  }
  factory: {
    panelTitle: string
    completionLabel: string
    tsaCertTitle: string
    deansListCertTitle: string
    degreeCertTitle: string
  }
  infra: {
    softSkillGroups: { category: string; items: string[] }[]
  }
  library: {
    featuredRole: string
    featuredBullets: string[]
    publications: Record<string, { title: string; description: string }>
  }
  projects: Record<string, ProjectCopy>
  credentials: Record<string, CredentialCopy>
}

export type SiteCopyLocales = Record<Locale, SiteCopy>
