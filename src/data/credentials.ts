export interface Credential {
  slug: string
  year: number
  title: string
  issuer: string
  detail?: string
  body?: string
  bullets?: string[]
  credit?: string
}

export const credentials: Credential[] = [
  {
    slug: 'deans-list',
    year: 2026,
    title: "Dean's List",
    issuer: 'UTS Faculty of Engineering & IT',
    detail: 'Outstanding academic achievement · 2026',
    body: 'Recognised for consistently high marks across the Master of Information Technology program — WAM 86.9 over 96 credit points, including nine High Distinctions.',
  },
  {
    slug: 'degree',
    year: 2026,
    title: 'Master of Information Technology',
    issuer: 'University of Technology Sydney',
    detail: 'C04295 · 96 CP · WAM 86.9 · GPA 6.5/7',
    body: 'Completed Aug 2024 – Aug 2026 with 9 High Distinctions across 96 credit points. Software engineering coursework included Cloud Computing & SaaS, Infrastructure for Cloud Computing, and Fundamentals of Software Development — delivering a LAMP-to-MERN e-commerce platform deployed on AWS with CI/CD. Advanced work in NLP Algorithms and Deep Learning & CNN shipped ML pipelines to GitHub; Project Management and Industry Project strengthened cross-functional planning, stakeholder communication, team leadership, and deadline-driven delivery.',
  },
  {
    slug: 'techfest',
    year: 2026,
    title: 'TechFest AI Showcase Nominee',
    issuer: 'UTS · Dr. Nabin Sharma',
    detail: 'Deep Learning & CNN · 42028 · 95 HD · TechFest 2026',
    body: 'Nominated to present at the UTS TechFest 2026 AI Showcase. Led a browser-based VTuber motion-capture pipeline for Deep Learning & CNN (42028): webcam → MediaPipe Holistic → Kalidokit → VRM avatar, with optional gesture classification via ONNX CNN inference in the browser. Drove software integration, productization, and team coordination — tuning landmark smoothing, pipeline stability, and demo-ready delivery for a live stage showcase. High Distinction (95); case study and open-source repo on bubblechickenlab.com/work/vtuber-mocap.',
    credit: 'Ko-Chun Liao — project concept and framework; Junjie Niu — experiment design and research support throughout.',
  },
  {
    slug: 'tsa',
    year: 2025,
    title: 'UTS Taiwan Student Association',
    issuer: 'UTS TSA',
    detail: 'Co-founder · Vice President & Secretary · Consultant · Jun 2025 – Jun 2026',
    body: 'Co-founded UTS TSA from zero and served across the founding cycle into an advisory consultant role. Grew community channels 25%+ to 1,000+ followers while building cross-cultural events and programming for Taiwanese students at UTS.',
    bullets: [
      'Co-founder: brand identity, social channels, first-semester event calendar, and founding executive structure',
      'Vice President & Secretary (Jun 2025 – Jun 2026): event delivery, volunteer coordination, stakeholder liaison, and internal communications',
      'Consultant (2026): governance continuity, executive handover, and long-term planning for the next committee',
    ],
  },
  {
    slug: 'acf',
    year: 2026,
    title: 'ACF Mentoring Program',
    issuer: 'Australia Career Forum',
    detail: 'Mentee · Mentor: Howard C. · Organizer: Peter Wei',
    body: 'Joined the Australia Career Forum (ACF) Mentoring Program in 2026 as a mentee. Through structured sessions and ongoing check-ins with Howard C., worked on graduate job-search strategy, resume refinement, interview preparation, and navigating the Australian tech hiring market — with honest, practical feedback tied to real applications. Mentorship here was more than career tactics: having someone in your corner who normalizes growing, stumbling, and trying again made a real difference — including walking alongside me through imposter syndrome, a common psychological struggle, and working together to address it when job search was at its hardest.',
    credit: 'Peter Wei — organized the program and created space for mentors and mentees to learn from one another. Howard C. — resume reviews, fresh insights when they were needed most, and encouragement to keep going.',
  },
]
