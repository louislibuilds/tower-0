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
    title: 'your·rock·is·coming',
    hook: 'Sydney tennis court discovery, weather-aware booking — built in 48 hours at UniHack 2026.',
    role: 'Team Lead & Full-stack Developer',
    team: 'UniHack 2026 cross-functional team',
    stack: ['React', 'TypeScript', 'Express', 'Leaflet', 'Open-Meteo'],
    links: [
      { label: 'Case Study', url: 'https://www.bubblechickenlab.com/work/your-rock-is-coming' },
      { label: 'GitHub', url: 'https://github.com/louislibuilds/your-rock-is-coming' },
    ],
  },
  {
    slug: 'cloud-computing',
    title: 'SUNishop — Cloud E-Commerce',
    hook: 'LAMP → MERN migration with CI gates and a storefront that kept shipping after AWS credits expired.',
    role: 'Full-stack Developer',
    course: '42904 (100 HD) · 42891 (95 HD)',
    stack: ['React', 'Node.js', 'MongoDB', 'AWS', 'CI/CD'],
    links: [{ label: 'GitHub', url: 'https://github.com/louislibuilds/SUNi-Make-Your-Day-Shining' }],
  },
  {
    slug: 'nlp',
    title: 'Mock Interview Coach',
    hook: 'STT → structured STAR scoring → feedback. Hybrid LLM + offline mock.',
    role: 'Lead Developer',
    course: '42850 NLP Algorithms (94 HD)',
    stack: ['Python', 'FastAPI', 'faster-whisper', 'React', 'STAR Scoring'],
    links: [
      { label: 'Case Study', url: 'https://www.bubblechickenlab.com/work/mock-interview-coach' },
      {
        label: 'GitHub',
        url: 'https://github.com/louis-li-builds/mock-interview-coach-stt-star-feedback-scoring-nlp-uts-project',
      },
    ],
  },
  {
    slug: 'dl',
    title: 'VTuber MoCap',
    hook: 'Browser motion capture: webcam → MediaPipe → Kalidokit → VRM. TechFest 2026 · 95 HD.',
    role: 'Software Dev · Productization · Team Coordination',
    team: 'Ko-Chun Liao (framework), Junjie Niu (experiments)',
    course: '42028 Deep Learning & CNN (95 HD)',
    stack: ['MediaPipe', 'Kalidokit', 'VRM', 'ONNX', 'Three.js'],
    links: [
      { label: 'Case Study', url: 'https://www.bubblechickenlab.com/work/vtuber-mocap' },
      {
        label: 'GitHub',
        url: 'https://github.com/louis-li-builds/dl-cnn-UTSproject51-vtuber-mediapipe-kalidokit',
      },
    ],
  },
  {
    slug: 'kata',
    title: 'KATA',
    hook: 'Guided résumé builder with live A4 preview, four templates, print-ready PDF.',
    role: 'Sole Builder',
    stack: ['React', 'TypeScript', 'Vite', 'PDF Export', 'Local-first'],
    links: [
      { label: 'Case Study', url: 'https://www.bubblechickenlab.com/work/kata' },
      { label: 'Live', url: 'https://www.bubblechickenlab.com/kata' },
      { label: 'GitHub', url: 'https://github.com/louislibuilds/kata.app' },
    ],
  },
]
