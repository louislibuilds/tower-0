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

/** Illustrative rows only — put your real transcript in content/data/academic.ts (private). */
export const subjects: Subject[] = [
  { code: '10101', title: 'Sample Course A', year: 2024, session: 'Spring', mark: 85, grade: 'HD', cp: 6 },
  { code: '10102', title: 'Sample Course B', year: 2024, session: 'Spring', mark: 78, grade: 'D', cp: 6 },
  { code: '10103', title: 'Sample Course C', year: 2024, session: 'Autumn', mark: 82, grade: 'D', cp: 6 },
  { code: '10104', title: 'Sample Course D', year: 2024, session: 'Autumn', mark: 90, grade: 'HD', cp: 6 },
  { code: '10105', title: 'Sample Course E', year: 2025, session: 'Spring', mark: 88, grade: 'HD', cp: 6 },
  { code: '10106', title: 'Sample Course F', year: 2025, session: 'Spring', mark: 76, grade: 'D', cp: 6 },
  { code: '10107', title: 'Sample Course G', year: 2025, session: 'Autumn', mark: 84, grade: 'D', cp: 6 },
  { code: '10108', title: 'Sample Course H', year: 2025, session: 'Autumn', mark: 92, grade: 'HD', cp: 6 },
]

function semesterAvg(subjs: Subject[]): number | null {
  const marked = subjs.filter((s) => s.mark !== null)
  if (marked.length === 0) return null
  return Math.round((marked.reduce((sum, s) => sum + (s.mark ?? 0), 0) / marked.length) * 10) / 10
}

export const semesters: Semester[] = [
  {
    id: '2024-spring',
    label: '20XX Spring',
    year: 2024,
    session: 'Spring',
    subjects: subjects.filter((s) => s.year === 2024 && s.session === 'Spring'),
    avgMark: semesterAvg(subjects.filter((s) => s.year === 2024 && s.session === 'Spring')),
  },
  {
    id: '2024-autumn',
    label: '20XX Autumn',
    year: 2024,
    session: 'Autumn',
    subjects: subjects.filter((s) => s.year === 2024 && s.session === 'Autumn'),
    avgMark: semesterAvg(subjects.filter((s) => s.year === 2024 && s.session === 'Autumn')),
  },
  {
    id: '2025-spring',
    label: '20XX Spring',
    year: 2025,
    session: 'Spring',
    subjects: subjects.filter((s) => s.year === 2025 && s.session === 'Spring'),
    avgMark: semesterAvg(subjects.filter((s) => s.year === 2025 && s.session === 'Spring')),
  },
  {
    id: '2025-autumn',
    label: '20XX Autumn',
    year: 2025,
    session: 'Autumn',
    subjects: subjects.filter((s) => s.year === 2025 && s.session === 'Autumn'),
    avgMark: semesterAvg(subjects.filter((s) => s.year === 2025 && s.session === 'Autumn')),
  },
]

export const gradeSummary = { HD: 4, D: 4, CR: 0 } as const
