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

export const labProjects: LabProject[] = [
  {
    slug: 'unihack-2026',
    title: 'UniHack 2026 — Your Rock Is Coming',
    hook: '48-hour MVP: map discovery + 7-day weather forecasts under deadline pressure.',
    role: 'Team Lead & Technical Director',
    team: 'Cross-functional hackathon team',
    stack: ['React', 'Node.js', 'Leaflet', 'REST'],
    links: [{ label: 'GitHub', url: 'https://github.com/louislibuilds/your-rock-is-coming' }],
  },
  {
    slug: 'cloud-computing',
    title: 'SUNishop — Cloud E-Commerce',
    hook: 'LAMP → MERN migration with CI, automated server tests, and AWS Academy deployment.',
    role: 'Full-stack Developer',
    course: '42904 (100 HD) · 42891 (95 HD)',
    stack: ['React', 'Node.js', 'MongoDB', 'AWS', 'CI/CD'],
    mark: 100,
    grade: 'HD',
    links: [{ label: 'GitHub', url: 'https://github.com/louislibuilds/SUNi-Make-Your-Day-Shining' }],
  },
  {
    slug: 'nlp',
    title: 'Mock Interview Coach',
    hook: 'STT-powered mock interviews with STAR-based scoring and NLP feedback.',
    role: 'Lead Developer',
    course: '42850 NLP Algorithms (94 HD)',
    stack: ['Python', 'STT', 'NLP', 'STAR Scoring'],
    mark: 94,
    grade: 'HD',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/louis-li-builds/mock-interview-coach-stt-star-feedback-scoring-nlp-uts-project',
      },
    ],
  },
  {
    slug: 'dl',
    title: 'VTuber Motion Pipeline',
    hook: 'Real-time pose → VRM avatar via MediaPipe Holistic, Kalidokit, and optional gesture CNN.',
    role: 'Software Dev · Productization · Team Coordination',
    team: 'Ko-Chun Liao (framework), Junjie Niu (experiments)',
    course: '42028 Deep Learning & CNN (95 HD)',
    stack: ['MediaPipe', 'Kalidokit', 'VRM', 'ONNX', 'Three.js'],
    mark: 95,
    grade: 'HD',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/louis-li-builds/dl-cnn-UTSproject51-vtuber-mediapipe-kalidokit',
      },
    ],
  },
  {
    slug: 'kata',
    title: 'KATA — Resume & Job Tracker',
    hook: 'Unified job-search platform: Craft résumés, deploy PDFs, track applications — used daily.',
    role: 'Sole Builder',
    stack: ['React', 'TypeScript', 'Supabase', 'PDF Export', 'Local-first'],
    links: [
      { label: 'Live', url: 'https://www.bubblechickenlab.com/kata' },
      { label: 'GitHub', url: 'https://github.com/louislibuilds/kata.app' },
    ],
  },
]
