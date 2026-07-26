export type Grade = 'HD' | 'D' | 'CR'

export interface Subject {
  code: string
  title: string
  year: number
  session: 'Autumn' | 'Spring'
  mark: number | null
  grade: Grade
  cp: number
}

export interface Semester {
  id: string
  label: string
  year: number
  session: 'Autumn' | 'Spring'
  subjects: Subject[]
  avgMark: number | null
}

export const subjects: Subject[] = [
  { code: '32040', title: 'Industry Project', year: 2026, session: 'Autumn', mark: 77, grade: 'D', cp: 6 },
  { code: '42028', title: 'Deep Learning & CNN', year: 2026, session: 'Autumn', mark: 95, grade: 'HD', cp: 6 },
  { code: '42850', title: 'NLP Algorithms', year: 2026, session: 'Autumn', mark: 94, grade: 'HD', cp: 6 },
  { code: '43030', title: 'Professional Practice in Computing', year: 2026, session: 'Autumn', mark: null, grade: 'HD', cp: 6 },
  { code: '32541', title: 'Project Management', year: 2025, session: 'Spring', mark: 97, grade: 'HD', cp: 6 },
  { code: '32547', title: 'UNIX Systems Programming', year: 2025, session: 'Spring', mark: 82, grade: 'D', cp: 6 },
  { code: '32548', title: 'Cybersecurity', year: 2025, session: 'Spring', mark: 83, grade: 'D', cp: 6 },
  { code: '42891', title: 'Infrastructure for Cloud Computing', year: 2025, session: 'Spring', mark: 95, grade: 'HD', cp: 6 },
  { code: '32130', title: 'Fundamentals of Data Analytics', year: 2025, session: 'Autumn', mark: 87, grade: 'HD', cp: 6 },
  { code: '32144', title: 'Technology Research Preparation', year: 2025, session: 'Autumn', mark: 84, grade: 'D', cp: 6 },
  { code: '42904', title: 'Cloud Computing & SaaS', year: 2025, session: 'Autumn', mark: 100, grade: 'HD', cp: 6 },
  { code: '43031', title: 'Python for Data Processing', year: 2025, session: 'Autumn', mark: 78, grade: 'D', cp: 6 },
  { code: '32524', title: 'LANS and Routing', year: 2024, session: 'Spring', mark: 77, grade: 'D', cp: 6 },
  { code: '32555', title: 'Fundamentals of Software Development', year: 2024, session: 'Spring', mark: 91, grade: 'HD', cp: 6 },
  { code: '32557', title: 'Enabling Enterprise Information Systems', year: 2024, session: 'Spring', mark: 91, grade: 'HD', cp: 6 },
  { code: '32606', title: 'Database', year: 2024, session: 'Spring', mark: 73, grade: 'CR', cp: 6 },
]

function semesterAvg(subjs: Subject[]): number | null {
  const marked = subjs.filter((s) => s.mark !== null)
  if (marked.length === 0) return null
  return Math.round((marked.reduce((sum, s) => sum + (s.mark ?? 0), 0) / marked.length) * 10) / 10
}

export const semesters: Semester[] = [
  {
    id: '2026-autumn',
    label: '2026 Autumn',
    year: 2026,
    session: 'Autumn',
    subjects: subjects.filter((s) => s.year === 2026 && s.session === 'Autumn'),
    avgMark: semesterAvg(subjects.filter((s) => s.year === 2026 && s.session === 'Autumn')),
  },
  {
    id: '2025-spring',
    label: '2025 Spring',
    year: 2025,
    session: 'Spring',
    subjects: subjects.filter((s) => s.year === 2025 && s.session === 'Spring'),
    avgMark: semesterAvg(subjects.filter((s) => s.year === 2025 && s.session === 'Spring')),
  },
  {
    id: '2025-autumn',
    label: '2025 Autumn',
    year: 2025,
    session: 'Autumn',
    subjects: subjects.filter((s) => s.year === 2025 && s.session === 'Autumn'),
    avgMark: semesterAvg(subjects.filter((s) => s.year === 2025 && s.session === 'Autumn')),
  },
  {
    id: '2024-spring',
    label: '2024 Spring',
    year: 2024,
    session: 'Spring',
    subjects: subjects.filter((s) => s.year === 2024 && s.session === 'Spring'),
    avgMark: semesterAvg(subjects.filter((s) => s.year === 2024 && s.session === 'Spring')),
  },
]

export const gradeSummary = { HD: 9, D: 6, CR: 1 } as const
