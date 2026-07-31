export interface LabProject {
  slug: string
  title: string
  hook: string
  role: string
  team?: string
  stack: string[]
  course?: string
  mark?: number
  grade?: string
  links: { label: string; url: string }[]
}

/** Fork template — add your projects in content/data/projects.ts. */
export const labProjects: LabProject[] = [
  {
    slug: 'sample-project',
    title: 'Sample Project',
    hook: 'One-line hook — problem, stack, or outcome.',
    role: 'Your Role',
    stack: ['React', 'TypeScript', 'Node.js'],
    links: [
      { label: 'Live', url: 'https://example.com' },
      { label: 'GitHub', url: 'https://github.com/your-handle/sample-project' },
    ],
  },
  {
    slug: 'tower-zero',
    title: 'Tower Zero',
    hook: 'This template — walk-in 3D portfolio. Each floor is a résumé chapter.',
    role: 'Template by Louis Li',
    stack: ['React 19', 'Three.js', 'R3F', 'TypeScript', 'Vite'],
    links: [
      { label: 'GitHub', url: 'https://github.com/louislibuilds/tower-0' },
      { label: 'Live demo', url: 'https://www.bubblechickenlab.com/towerzero/' },
    ],
  },
]
