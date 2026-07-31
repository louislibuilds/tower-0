export interface Experience {
  slug: string
  company: string
  title: string
  location: string
  start: string
  end: string
  current?: boolean
  bullets: string[]
}

/** Placeholder — first entry powers 99F Library "librarian" block. Replace in content/. */
export const experiences: Experience[] = [
  {
    slug: 'sample-role',
    company: 'Your Studio or Brand',
    title: 'Your Role · e.g. Developer · Designer',
    location: 'City, Country',
    start: 'Jan 20XX',
    end: 'Present',
    current: true,
    bullets: [
      '這裡放你的工作室／品牌描述 — 你維護或發佈什麼（作品集、工具、開源）。',
      '建議寫法：一句 scope（design → ship → iterate）。',
    ],
  },
]
