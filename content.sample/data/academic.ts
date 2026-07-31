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
  { code: '10101', title: 'Sample Course A', year: 2024, session: 'Autumn', mark: 85, grade: 'HD', cp: 6 },
  { code: '10102', title: 'Sample Course B', year: 2024, session: 'Autumn', mark: 78, grade: 'D', cp: 6 },
  { code: '10103', title: 'Sample Course C', year: 2025, session: 'Spring', mark: 82, grade: 'D', cp: 6 },
  { code: '10104', title: 'Sample Course D', year: 2025, session: 'Spring', mark: 90, grade: 'HD', cp: 6 },
]

function semesterAvg(subjs: Subject[]): number | null {
  const marked = subjs.filter((s) => s.mark !== null)
  if (marked.length === 0) return null
  return Math.round((marked.reduce((sum, s) => sum + (s.mark ?? 0), 0) / marked.length) * 10) / 10
}

export const semesters: Semester[] = [
  {
    id: '2024-autumn',
    label: '2024 Autumn',
    year: 2024,
    session: 'Autumn',
    subjects: subjects.filter((s) => s.year === 2024),
    avgMark: semesterAvg(subjects.filter((s) => s.year === 2024)),
  },
  {
    id: '2025-spring',
    label: '2025 Spring',
    year: 2025,
    session: 'Spring',
    subjects: subjects.filter((s) => s.year === 2025),
    avgMark: semesterAvg(subjects.filter((s) => s.year === 2025)),
  },
]

export const gradeSummary = { HD: 2, D: 2, CR: 0 } as const
