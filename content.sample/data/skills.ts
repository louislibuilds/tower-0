export interface SkillGroup {
  category: string
  items: string[]
}

/** Placeholder groups — replace in content/data/skills.ts. */
export const techSkillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    items: ['JavaScript', 'TypeScript', 'Python', '…在此列出你的語言'],
  },
  {
    category: 'Frontend',
    items: ['React', 'CSS', '…在此列出前端技術棧'],
  },
  {
    category: 'Backend & Data',
    items: ['Node.js', 'PostgreSQL', '…在此列出後端與資料'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['Docker', 'CI/CD', '…在此列出部署與工具'],
  },
]

export const softSkillGroups: SkillGroup[] = [
  {
    category: 'Communication',
    items: ['English', 'Your other languages', 'Technical writing'],
  },
  {
    category: 'Delivery',
    items: ['End-to-end ownership', 'Agile / deadline-driven delivery'],
  },
]
