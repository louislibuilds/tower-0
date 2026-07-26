export interface SkillGroup {
  category: string
  items: string[]
}

export interface CourseLink {
  code: string
  title: string
  mark: number | null
  grade: string
  projectSlug?: string
  projectUrl?: string
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'SQL', 'C'],
  },
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'Three.js', 'Tailwind CSS'],
  },
  {
    category: 'Backend & Data',
    items: ['Node.js', 'Express', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Supabase'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['AWS', 'Docker', 'Git', 'CI/CD', 'Vercel', 'Railway'],
  },
  {
    category: 'ML / AI',
    items: ['PyTorch', 'MediaPipe', 'NLP', 'ONNX', 'CNN'],
  },
]

export const courseLinks: CourseLink[] = [
  { code: '42904', title: 'Cloud Computing & SaaS', mark: 100, grade: 'HD', projectSlug: 'cloud-computing', projectUrl: 'https://github.com/louislibuilds/SUNi-Make-Your-Day-Shining' },
  { code: '42891', title: 'Infrastructure for Cloud Computing', mark: 95, grade: 'HD', projectSlug: 'cloud-computing', projectUrl: 'https://github.com/louislibuilds/SUNi-Make-Your-Day-Shining' },
  { code: '42850', title: 'NLP Algorithms', mark: 94, grade: 'HD', projectSlug: 'nlp', projectUrl: 'https://github.com/louis-li-builds/mock-interview-coach-stt-star-feedback-scoring-nlp-uts-project' },
  { code: '42028', title: 'Deep Learning & CNN', mark: 95, grade: 'HD', projectSlug: 'dl', projectUrl: 'https://github.com/louis-li-builds/dl-cnn-UTSproject51-vtuber-mediapipe-kalidokit' },
  { code: '32541', title: 'Project Management', mark: 97, grade: 'HD' },
  { code: '32555', title: 'Software Development', mark: 91, grade: 'HD' },
  { code: '32557', title: 'Enterprise Information Systems', mark: 91, grade: 'HD' },
  { code: '32130', title: 'Data Analytics', mark: 87, grade: 'HD' },
  { code: '32040', title: 'Industry Project', mark: 77, grade: 'D' },
]
