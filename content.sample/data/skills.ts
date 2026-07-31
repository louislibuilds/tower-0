export interface SkillGroup {
  category: string
  items: string[]
}

/**
 * Technical skills — union of archived résumé tiers (swe-26-06 master, cloud/web variants).
 */
export const techSkillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'SQL', 'HTML', 'CSS'],
  },
  {
    category: 'Frontend & UI',
    items: ['React', 'Next.js', 'Three.js', 'Tailwind CSS', 'Responsive UI', 'i18n (EN / zh-TW / zh-CN)', 'SEO', 'Google Analytics'],
  },
  {
    category: 'Backend & Data',
    items: ['Node.js', 'Express', 'FastAPI', 'REST APIs', 'JSON schemas', 'PostgreSQL', 'MongoDB', 'Supabase', 'OAuth'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['AWS', 'Azure', 'GCP', 'Docker', 'Git', 'GitHub', 'CI/CD', 'Vercel', 'Railway', 'Linux', 'UNIX', 'Networking (TCP/IP, DNS)'],
  },
  {
    category: 'CS & Systems',
    items: ['Data structures & algorithms', 'Databases', 'Object-oriented design', 'System design basics', 'Debugging & troubleshooting'],
  },
  {
    category: 'ML / AI',
    items: ['PyTorch', 'NLP', 'Deep Learning', 'CNN', 'MediaPipe', 'ONNX', 'Computer vision'],
  },
]

/** Soft skills — leadership, delivery, communication from archived résumés & UTS experience. */
export const softSkillGroups: SkillGroup[] = [
  {
    category: 'Leadership & Collaboration',
    items: ['Team leadership', 'Cross-functional planning', 'Stakeholder communication', 'Volunteer coordination', 'Code review participation'],
  },
  {
    category: 'Delivery & Quality',
    items: ['End-to-end ownership', 'Deadline-driven delivery', 'Automated testing', 'Agile delivery', 'Technical documentation'],
  },
  {
    category: 'Communication',
    items: [
      'English (Fluent)',
      'Mandarin Chinese (Native)',
      'Japanese (Learning)',
      'Explaining trade-offs to non-technical audiences',
      'Async / remote collaboration',
      'Risk communication',
    ],
  },
]
