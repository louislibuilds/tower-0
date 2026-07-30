export type Locale = 'en' | 'zh-TW' | 'ja'
export type Theme = 'dark' | 'light'

export interface LocaleStrings {
  site: {
    siteTitle: string
    siteCode: string
    architectName: string
    creditsComplete: string
    linkGithub: string
    linkLinkedin: string
    linkPortfolio: string
    constructing: string
    rollingDrawing: string
    fallback: string
    floors: string
    details: string
    hint: string
    themeDark: string
    themeLight: string
    rollDrawing: string
    printResume: string
    elevatorLabel: string
  }
  stamp: {
    code: string
    name: string
  }
  exit: {
    label: string
    reopen: string
  }
  floors: Record<
    string,
    { title: string; subtitle: string; exhibitTitle: string; exhibitHook: string }
  >
  lobby: {
    welcomeName: string
    motto: string
    floorIntro: string
    wam: string
    gpa: string
    cp: string
    hdCount: string
    deansList: string
    hint: string
  }
  factory: {
    wam: string
    cp: string
    avg: string
    heroTitle: string
    floorIntro: string
    panelTitle: string
    panelFloor: string
    selectArea: string
    allAreas: string
    overview: string
    completionLabel: string
    tsaCertTitle: string
    deansListCertTitle: string
    degreeCertTitle: string
  }
  lab: {
    heroTitle: string
    floorIntro: string
    statusPending: string
    statusActive: string
    statusCompleted: string
    emptyResearchTitle: string
    emptyIntro: string
    role: string
    team: string
    course: string
  }
  infra: {
    heroTitle: string
    floorIntro: string
    softSkillsTitle: string
    softSkillGroups: { category: string; items: string[] }[]
  }
  tech: {
    heroTitle: string
    floorIntro: string
    socialTitle: string
    printerTitle: string
    resumeIntro: string
    previewTitle: string
    previewHint: string
    openPreview: string
    print: string
    printDesc: string
    printNow: string
    kataNote: string
    openKata: string
    linkLabels: {
      linkedin: string
      instagram: string
      threads: string
      portfolio: string
      github: string
    }
  }
  resumePrint: {
    drawerTitle: string
    drawerDoc: string
    printNow: string
    close: string
  }
  library: {
    heroTitle: string
    archiveTitle: string
    archiveTagline: string
    libraryTitle: string
    libraryTagline: string
    archiveIntro: string
    libraryIntro: string
    librarianTitle: string
    featuredRole: string
    featuredBullets: string[]
    publicationsTitle: string
    publications: Record<string, { title: string; description: string }>
  }
  roof: {
    cta: string
    printResume: string
    linkLabels: {
      email: string
      github: string
      linkedin: string
      portfolio: string
      kata: string
    }
  }
  projects: Record<
    string,
    { title: string; hook: string; body: string; role: string; team?: string; course?: string; credit?: string }
  >
  credentials: Record<string, { title: string; detail?: string; body?: string; bullets?: string[]; credit?: string }>
  focus: {
    panelHint: string
    back: string
    backToArchive: string
    backToLibrary: string
    bookOpen: string
    credentialEyebrow: string
  }
}

const en: LocaleStrings = {
  site: {
    siteTitle: 'The Tower of STEM, Zone 0',
    siteCode: 'bubblechickenlab · Louis Li present',
    architectName: 'Louis Li',
    creditsComplete: 'COMPLETE',
    linkGithub: 'GITHUB',
    linkLinkedin: 'LINKEDIN',
    linkPortfolio: 'PORTFOLIO',
    constructing: 'Constructing…',
    rollingDrawing: 'Ending set…',
    fallback: '2D elevation · WebGL unavailable',
    floors: 'FLOORS',
    details: 'DETAILS',
    hint: 'Select a floor or room on the model or rail.',
    themeDark: 'Night',
    themeLight: 'Day',
    rollDrawing: 'End set',
    printResume: 'RESUME',
    elevatorLabel: 'ELEVATOR',
  },
  stamp: {
    code: 'TOWER 0',
    name: 'LOUIS LI',
  },
  exit: {
    label: 'END OF SET',
    reopen: 'REOPEN THE TOWER',
  },
  floors: {
    B10: {
      title: 'Tech Centre',
      subtitle: 'Social · Print Resume',
      exhibitTitle: 'Tech Centre · B10',
      exhibitHook: 'Outbound social links — plus a printer for resume export.',
    },
    B2: {
      title: 'Infrastructure',
      subtitle: 'Skills · Tech & Soft',
      exhibitTitle: 'Infrastructure · B2',
      exhibitHook: 'Risers, pipes, and the circuit board beneath the tower.',
    },
    G: {
      title: 'Lobby',
      subtitle: 'Welcome · About',
      exhibitTitle: 'Lobby · Ground',
      exhibitHook: 'Thesis wall and identity plate at grade.',
    },
    '23': {
      title: 'Factory',
      subtitle: 'Production Lines · Grades',
      exhibitTitle: 'Factory · 23',
      exhibitHook: 'Four semester assembly lines — marks, grades, milestones.',
    },
    '52': {
      title: 'Laboratory',
      subtitle: 'Group Projects',
      exhibitTitle: 'Laboratory · 52',
      exhibitHook: 'Five project rooms — hackathon to research pipeline.',
    },
    '99': {
      title: 'Library & Archive',
      subtitle: 'Awards · Credentials',
      exhibitTitle: 'Library · 99',
      exhibitHook: 'Degrees, dean\'s list, leadership, certificates.',
    },
    roof: {
      title: 'Roof',
      subtitle: 'Contact',
      exhibitTitle: 'Roof',
      exhibitHook: '',
    },
  },
  lobby: {
    welcomeName: 'Welcome',
    motto: 'Rome wasn\'t built in a day — neither is good software.',
    floorIntro:
      'I build systems the way architects build towers — structure first, then the rooms that tell the story.',
    wam: 'WAM',
    gpa: 'GPA',
    cp: 'Credit Points',
    hdCount: 'HD',
    deansList: "Dean's List",
    hint: 'Select a floor from the rail — the tower is the map.',
  },
  factory: {
    wam: 'WAM',
    cp: 'Credit Points',
    avg: 'Avg',
    heroTitle: 'Factory',
    floorIntro: 'Four semester production lines — marks, averages, and the degree at end of belt.',
    panelTitle: 'University of Technology Sydney · Master of Information Technology',
    panelFloor: 'Factory · 23F',
    selectArea: 'Select a line on the model or rail — Area 01–04.',
    allAreas: 'All production lines',
    overview: 'Four semester lines run parallel — click an area to zoom in.',
    completionLabel: 'UTS MIT COMPLETE',
    tsaCertTitle: 'UTS TSA · Letter of Recognition',
    deansListCertTitle: "UTS · Dean's List 2026",
    degreeCertTitle: 'UTS · Master of IT Testamur',
  },
  lab: {
    heroTitle: 'Laboratory',
    floorIntro: 'Eight lab suites — research status, notes, and output on record.',
    statusPending: 'Research not started',
    statusActive: 'Research in progress',
    statusCompleted: 'Research completed',
    emptyResearchTitle: '—',
    emptyIntro: 'Suite reserved — research not yet assigned.',
    role: 'Role',
    team: 'Team',
    course: 'Course',
  },
  infra: {
    heroTitle: 'Infrastructure',
    floorIntro:
      'Mechanical core beneath the tower — the technical stack and working habits that connect every floor.',
    softSkillsTitle: 'Soft Skills',
    softSkillGroups: [
      {
        category: 'Leadership & Collaboration',
        items: [
          'Team leadership',
          'Cross-functional planning',
          'Stakeholder communication',
          'Volunteer coordination',
          'Code review participation',
        ],
      },
      {
        category: 'Delivery & Quality',
        items: [
          'End-to-end ownership',
          'Deadline-driven delivery',
          'Automated testing',
          'Agile delivery',
          'Technical documentation',
        ],
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
    ],
  },
  tech: {
    heroTitle: 'Tech Centre',
    floorIntro:
      'Basement print room — outbound links to LinkedIn, Instagram, Threads, portfolio, and GitHub. Use the printer when you need a hard copy.',
    socialTitle: 'Connect',
    printerTitle: 'PRINTER',
    resumeIntro:
      'A4 two-page resume PDF (EN / zh-TW). Preview below; Print opens the file with clickable links.',
    previewTitle: 'Resume preview',
    previewHint: 'Scroll · links work · Print uses the PDF file',
    openPreview: 'Open preview',
    print: 'Print Resume',
    printDesc: 'Two A4 pages — linked PDF',
    printNow: 'Print now',
    kataNote: 'Need an editable version? KATA builds and exports these sheets.',
    openKata: 'Open KATA ↗',
    linkLabels: {
      linkedin: 'LinkedIn',
      instagram: 'Instagram',
      threads: 'Threads',
      portfolio: 'Portfolio',
      github: 'GitHub',
    },
  },
  resumePrint: {
    drawerTitle: 'Resume preview',
    drawerDoc: 'PDF · A4 · 2 pages',
    printNow: 'Print',
    close: 'Close',
  },
  library: {
    heroTitle: 'Library & Archive',
    archiveTitle: 'Archive',
    archiveTagline: 'Credentials · Honors · Leadership',
    libraryTitle: 'Library',
    libraryTagline: 'Platform · Writing · Projects',
    archiveIntro: 'Document vault — what was earned, recognized, and led along the way.',
    libraryIntro: 'Desk of shipped work — bubblechickenlab tools, repos, and ongoing builds.',
    librarianTitle: 'Librarian',
    featuredRole: 'Founder · Developer · Creator',
    featuredBullets: [
      'Independent practice under bubblechickenlab — products, portfolios, and tools where software meets storytelling and craft.',
      'Full-stack ownership from idea to ship: design, engineering, deployment, and the narrative around what gets published.',
    ],
    publicationsTitle: 'Publications',
    publications: {
      nagi: {
        title: 'NAGI · Portfolio',
        description: 'Self-hosted personal site — portfolio and writing in one place.',
      },
      kata: {
        title: 'KATA · Résumé & Tracker',
        description:
          'Draft résumés and track applications in one workflow — local or cloud saves, PDF export when you need it.',
      },
      github: {
        title: 'GitHub · louislibuilds',
        description: 'github.com/louislibuilds',
      },
      linkedin: {
        title: 'LinkedIn',
        description: 'linkedin.com/in/louis-li-builds',
      },
    },
  },
  roof: {
    cta: "Let's keep in touch!",
    printResume: 'RESUME',
    linkLabels: {
      email: 'Email',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      portfolio: 'Portfolio',
      kata: 'KATA.app',
    },
  },
  projects: {
    'unihack-2026': {
      title: 'your·rock·is·coming',
      hook: 'Sydney tennis court discovery, weather-aware booking — built in 48 hours at UniHack 2026.',
      body: 'Sydney tennis players juggle fragmented council, club, and school sites — each with its own booking flow. Outdoor courts depend on weather, yet most tools treat forecast as an afterthought.\n\nyour·rock·is·coming maps Sydney venues with surface, lighting, parking, and suburb filters; booking flows through date, slot, and confirmation with a 7-day forecast, rain chance, and dryness index before you commit.\n\nShipped full-stack (React + Express + SQLite) and a frontend-only demo path for hackathon delivery. I formed the UniHack 2026 team and drove end-to-end integration — map, weather APIs, and a demo-ready booking path.',
      role: 'Team Lead & Full-stack Developer (Team of 6)',
      credit:
        'Amber H. Hong — full-stack architecture: Express + SQLite, three-panel map UI, booking with conflict detection, weather-aware cancellation & court dryness algorithm. Carrie XIE — lead PM & product advisor: initial concept, PRD, problem definition, close engineering collaboration. Penny Hsieh, Julia Hsieh, Isla Shen — testing & feedback.',
    },
    'cloud-computing': {
      title: 'SUNishop — Cloud E-Commerce',
      hook: 'LAMP → MERN migration with CI gates, automated server tests, and a live storefront that kept shipping after AWS Academy credits expired.',
      body: 'Course deliverable for Cloud Computing & SaaS and Infrastructure for Cloud Computing — migrate a legacy LAMP e-commerce stack to MERN, deploy on AWS, and treat release hygiene as part of the product.\n\nBuilt React storefront, Node/Express API, MongoDB data layer, CI pipeline, and automated server tests before every release. Initial deployment ran on AWS via UTS AWS Academy; when credits expired, re-hosted to Vercel (frontend), Railway (API), and MongoDB Atlas so the shop could stay live.\n\nWalked in thinking deploy-and-done; left knowing environment config, rollback, test gates — and when to move stacks — are all part of shipping.',
      role: 'Full-stack Developer',
      course: '42904 Cloud Computing & SaaS (100 HD) · 42891 Infrastructure for Cloud (95 HD)',
    },
    nlp: {
      title: 'Mock Interview Coach',
      hook: 'STT → structured STAR scoring → feedback. Hybrid LLM + deterministic mock so demos always run.',
      body: 'Self-practice interviews lack immediate, structured feedback — STAR evidence, fluency, filler words. Recording and replaying is slow and hard to quantify.\n\nWizard flow: record → faster-whisper STT → preprocess → /v1/score. With OPENAI_API_KEY, LLM JSON scoring; otherwise deterministic NLP mock (keywords, structure, fluency, evidence). LLM failures fall back to mock so demos stay reproducible.\n\nBuilt end-to-end: FastAPI + faster-whisper, NLP mock engine, React wizard with score breakdown UI, EN/zh-TW docs. Assessment 3 final: 94 HD (NLP Algorithms, 42850). The lesson that stuck: measure, validate, document — not just pick a model.',
      role: 'Lead Developer',
      course: '42850 NLP Algorithms (94 HD)',
    },
    dl: {
      title: 'VTuber MoCap',
      hook: 'Browser VTuber motion capture: webcam → MediaPipe → Kalidokit → VRM. TechFest 2026 showcase · 95 HD.',
      body: 'Deep Learning & CNN (42028) — real-time pose capture driving a VRM avatar entirely in the browser. Open localhost, allow camera, run the full pipeline.\n\nWebcam → MediaPipe Holistic → Kalidokit (head, arms, finger curl) → three.js + @pixiv/three-vrm retarget. Optional gesture CNN (ONNX) for throttled browser classification.\n\nOwned browser pipeline productization: ESM import maps, CDN deps, camera permissions, EN/zh-TW docs for a stable TechFest demo. Final grade: 95 HD. Nominated to UTS TechFest 2026 AI Showcase (Dr. Nabin Sharma). CV pipelines fail quietly before models fail loudly — smoothing and browser constraints matter as much as the network.',
      role: 'Software Dev · Productization · Team Coordination (Team of 3)',
      team: 'Ko-Chun Liao (concept & framework), Junjie Niu (experiments)',
      course: '42028 Deep Learning & CNN (95 HD)',
    },
    kata: {
      title: 'KATA',
      hook: 'Guided résumé builder with live A4 preview, four templates, and print-ready PDF — the tool behind my own applications.',
      body: 'Evolved from desktop RESUmade — step-by-step filling beat one long form. Renamed KATA (型) to mean “shape your professional form,” with landing, editor, and PDF export in one deployable app.\n\nNine-step builder: contact → summary → education → experience → skills → projects → certifications → references → layout. Live A4 preview with zoom and collapsible panels. Heritage, Clean, Sidebar, Classic templates; PDF export with clickable links and multi-page support up to four pages.\n\nLocal-first drafts with .kata.json export (legacy .resumade.json import). Integrated with JOBO tracker under bubblechickenlab.com/kata — résumé shapes the document, tracker holds the pipeline. Active build: template system, Suite AI assist, deeper tracker workflow.',
      role: 'Sole Builder',
    },
    nagi: {
      title: 'NAGI · 凪',
      hook: 'Personal brand platform — WebGL water surface entry, editorial depth layer, TipTap CMS, and work case studies.',
      body: 'bubblechickenlab.com needs more than a link list — it needs a memorable entry and a quiet place to read. NAGI (凪, “calm after the wave”) is that hub: full-screen WebGL surface on arrival, then Depth routes for /work, /articles, /about, and an owner-only CMS at /edit.\n\nBuilt as a Vite SPA with a Three.js water shader on Surface and typography-first editorial layout underneath. Supabase stores articles, works, categories, and subscribers; TipTap JSONB bodies power long-form case studies (SUNishop, KATA, Tower Zero, and the rest). RLS separates public read from editor write; build-time prerender gives crawlers HTML snapshots for key routes.\n\nNAGI is the narrative layer of the bubblechickenlab product family — portfolio, writing, and case-study archive — while KATA handles résumé tooling and Tower Zero handles the walk-in 3D resume.',
      role: 'Founder & Full-Stack Developer',
    },
    'tower-zero': {
      title: 'Tower Zero',
      hook: 'Walk-in 3D portfolio — each floor is one chapter of the résumé.',
      body: 'G Lobby — where you enter and meet the author. B2 Infrastructure — the foundation: tech stack and soft skills that support everything above. 23 Factory — four semester production lines, coursework assembled over time. 52 Laboratory — project experiments, each with status and output (including this room). 99 Library & Archive — credentials and published work, everything on record. B10 Tech Centre — social links and résumé print. R Roof — contact and paths to every project.\n\nBuilt with React and Three.js (orthographic 3D), trilingual UI, and Day/Night themes.',
      role: 'Sole Developer · Designer',
      credit:
        'salieri009/resume2 (SITE 009) — orthographic navigation, HUD layout, camera stations, boot/transition language. Visual system and content original to Tower Zero.',
    },
  },
  credentials: {
    'deans-list': {
      title: "Dean's List 2026",
      detail: 'Outstanding academic achievement · 2026',
      body: 'Recognised for consistently high marks across the MIT program — WAM 86.9 over 96 CP, including nine High Distinctions.',
    },
    degree: {
      title: 'Master of Information Technology',
      detail: 'C04295 · 96 CP · WAM 86.9 · GPA 6.5/7',
      body: 'Completed Aug 2024 – Aug 2026 with 9 High Distinctions across 96 credit points. Software engineering coursework included Cloud Computing & SaaS, Infrastructure for Cloud Computing, and Fundamentals of Software Development — delivering a LAMP-to-MERN e-commerce platform deployed on AWS with CI/CD. Advanced work in NLP Algorithms and Deep Learning & CNN shipped ML pipelines to GitHub; Project Management and Industry Project strengthened cross-functional planning, stakeholder communication, team leadership, and deadline-driven delivery.',
    },
    techfest: {
      title: 'TechFest AI Showcase Nominee',
      detail: 'Deep Learning & CNN · 42028 · 95 HD · TechFest 2026',
      body: 'Nominated to present at the UTS TechFest 2026 AI Showcase. Led a browser-based VTuber motion-capture pipeline for Deep Learning & CNN (42028): webcam → MediaPipe Holistic → Kalidokit → VRM avatar, with optional gesture classification via ONNX CNN inference in the browser. Drove software integration, productization, and team coordination — tuning landmark smoothing, pipeline stability, and demo-ready delivery for a live stage showcase. High Distinction (95); case study and open-source repo on bubblechickenlab.com/work/vtuber-mocap.',
      credit: 'Ko-Chun Liao — project concept and framework; Junjie Niu — experiment design and research support throughout.',
    },
    tsa: {
      title: 'UTS Taiwan Student Association',
      detail: 'Co-founder · Vice President & Secretary · Consultant · Jun 2025 – Jun 2026',
      body: 'Co-founded UTS TSA from zero and served across the founding cycle into an advisory consultant role. Grew community channels 25%+ to 1,000+ followers while building cross-cultural events and programming for Taiwanese students at UTS.',
      bullets: [
        'Co-founder: brand identity, social channels, first-semester event calendar, and founding executive structure',
        'Vice President & Secretary (Jun 2025 – Jun 2026): event delivery, volunteer coordination, stakeholder liaison, and internal communications',
        'Consultant (2026): governance continuity, executive handover, and long-term planning for the next committee',
      ],
    },
    acf: {
      title: 'ACF Mentoring Program',
      detail: 'Mentee · Mentor: Howard C. · Organizer: Peter Wei',
      body: 'Joined the Australia Career Forum (ACF) Mentoring Program in 2026 as a mentee. Through structured sessions and ongoing check-ins with Howard C., worked on graduate job-search strategy, resume refinement, interview preparation, and navigating the Australian tech hiring market — with honest, practical feedback tied to real applications. Mentorship here was more than career tactics: having someone in your corner who normalizes growing, stumbling, and trying again made a real difference — including walking alongside me through imposter syndrome, a common psychological struggle, and working together to address it when job search was at its hardest.',
      credit: 'Peter Wei — organized the program and created space for mentors and mentees to learn from one another. Howard C. — resume reviews, fresh insights when they were needed most, and encouragement to keep going.',
    },
  },
  focus: {
    panelHint: 'Focus detail · side panel',
    back: 'Back to room',
    backToArchive: 'Back to Archive',
    backToLibrary: 'Back to Library',
    bookOpen: 'Open link ↗',
    credentialEyebrow: 'Archive · credential',
  },
}

const zhTW: LocaleStrings = {
  site: {
    siteTitle: 'The Tower of STEM, Zone 0',
    siteCode: 'bubblechickenlab · Louis Li present',
    architectName: 'Louis Li',
    creditsComplete: '完成',
    linkGithub: 'GITHUB',
    linkLinkedin: 'LINKEDIN',
    linkPortfolio: 'PORTFOLIO',
    constructing: '建造中…',
    rollingDrawing: '收起中…',
    fallback: '2D 立面 · WebGL 不可用',
    floors: '樓層',
    details: '詳情',
    hint: '在模型或左欄選擇樓層或房間。',
    themeDark: 'Night',
    themeLight: 'Day',
    rollDrawing: '收起',
    printResume: 'RESUME',
    elevatorLabel: 'ELEVATOR',
  },
  stamp: {
    code: 'TOWER 0',
    name: 'LOUIS LI',
  },
  exit: {
    label: 'END OF SET',
    reopen: 'REOPEN THE TOWER',
  },
  floors: {
    B10: {
      title: '科技中心',
      subtitle: '社群 · Print Resume',
      exhibitTitle: '科技中心 · B10',
      exhibitHook: '對外社群連結 — 需要紙本時可用影印機輸出 resume。',
    },
    B2: {
      title: '基礎設施',
      subtitle: '技能 · 技術 & 軟技能',
      exhibitTitle: '基礎設施 · B2',
      exhibitHook: '塔樓底下的管線、機電井與電路板。',
    },
    G: {
      title: '大廳',
      subtitle: '歡迎 · 關於',
      exhibitTitle: '大廳 · 地面',
      exhibitHook: '論述牆與地面層的身份铭牌。',
    },
    '23': {
      title: '工廠',
      subtitle: '產線 · 成績',
      exhibitTitle: '工廠 · 23F',
      exhibitHook: '四條學期產線 — 成績、等級、里程碑。',
    },
    '52': {
      title: '實驗室',
      subtitle: '團隊專案',
      exhibitTitle: '實驗室 · 52F',
      exhibitHook: '五間專案房 — 從黑客松到研究管線。',
    },
    '99': {
      title: '圖書館 & 檔案室',
      subtitle: '獎項 · 證書',
      exhibitTitle: '圖書館 · 99F',
      exhibitHook: '學位、院長榮譽榜、領導經歷、證書。',
    },
    roof: {
      title: '屋頂',
      subtitle: '聯絡',
      exhibitTitle: '屋頂',
      exhibitHook: '',
    },
  },
  lobby: {
    welcomeName: '歡迎',
    motto: '萬丈高樓平地起 — 一磚一瓦，皆為根基。',
    floorIntro:
      '我用蓋樓的方式寫軟體——先承重結構，再讓每層有自己的故事。',
    wam: 'WAM',
    gpa: 'GPA',
    cp: '學分',
    hdCount: 'HD',
    deansList: "Dean's List",
    hint: '從樓層導覽選擇 — 這座塔就是你的地圖。',
  },
  factory: {
    wam: 'WAM',
    cp: '學分',
    avg: '平均',
    heroTitle: '工廠',
    floorIntro: '四條學期產線 — 成績、平均與輸送帶末端的學位證書。',
    panelTitle: 'University of Technology Sydney · Master of Information Technology',
    panelFloor: '工廠 · 23F',
    selectArea: '在模型或左側導覽選擇產線 — Area 01–04。',
    allAreas: '全部產線',
    overview: '四條學期產線並行 — 點選區域以拉近檢視。',
    completionLabel: 'UTS MIT COMPLETE',
    tsaCertTitle: 'UTS 台灣同學會 · 服務證明',
    deansListCertTitle: 'UTS · 2026 院長榮譽榜',
    degreeCertTitle: 'UTS · 資訊科技碩士學位證書',
  },
  lab: {
    heroTitle: '實驗室',
    floorIntro: '八間實驗室 — 研究狀態、主題與產出紀錄。',
    statusPending: '尚未開始研究',
    statusActive: '研究中',
    statusCompleted: '研究結束',
    emptyResearchTitle: '—',
    emptyIntro: '保留中的實驗室 — 尚未指派研究主題。',
    role: '角色',
    team: '團隊',
    course: '課程',
  },
  infra: {
    heroTitle: '基礎設施',
    floorIntro: '塔下的機電核心 — 串連各樓層的技術棧與工作方式。',
    softSkillsTitle: '軟技能',
    softSkillGroups: [
      {
        category: '領導與協作',
        items: [
          '團隊領導',
          '跨職能規劃',
          '利害關係人溝通',
          '志工協調',
          '程式碼審查參與',
        ],
      },
      {
        category: '交付與品質',
        items: [
          '端到端負責',
          '期限導向交付',
          '自動化測試',
          '敏捷交付',
          '技術文件撰寫',
        ],
      },
      {
        category: '溝通',
        items: [
          '英語（流利）',
          '中文（母語）',
          '日語學習中',
          '向非技術對象說明權衡',
          '非同步／遠端協作',
          '風險溝通',
        ],
      },
    ],
  },
  tech: {
    heroTitle: '科技中心',
    floorIntro:
      '地下室影印室 — 對外的 LinkedIn、Instagram、Threads、作品集與 GitHub。需要紙本時使用影印機。',
    socialTitle: '連結',
    printerTitle: 'PRINTER',
    resumeIntro: 'A4 雙頁 resume PDF（EN / zh-TW）。下方預覽；列印會開啟 PDF 並保留可點連結。',
    previewTitle: 'Resume 預覽',
    previewHint: '可捲動 · 連結可點 · 列印使用 PDF 檔',
    openPreview: '開啟預覽',
    print: 'Print Resume',
    printDesc: '兩頁 A4 — 連結保留的 PDF',
    printNow: '立即列印',
    kataNote: '需要可編輯版本？KATA 可撰寫並匯出這些頁面。',
    openKata: '開啟 KATA ↗',
    linkLabels: {
      linkedin: 'LinkedIn',
      instagram: 'Instagram',
      threads: 'Threads',
      portfolio: 'Portfolio',
      github: 'GitHub',
    },
  },
  resumePrint: {
    drawerTitle: 'Resume 預覽',
    drawerDoc: 'PDF · A4 · 2 頁',
    printNow: '列印',
    close: '關閉',
  },
  library: {
    heroTitle: '圖書館 & 檔案室',
    archiveTitle: '檔案室',
    archiveTagline: '證照 · 榮譽 · 領導',
    libraryTitle: '圖書館',
    libraryTagline: '平台 · 寫作 · 專案',
    archiveIntro: '文件庫 — 一路走來的成就、榮譽與領導經歷。',
    libraryIntro: '出貨書桌 — bubblechickenlab 工具、repo 與進行中的作品。',
    librarianTitle: '館長',
    featuredRole: '創辦人 · 開發者 · 創作者',
    featuredBullets: [
      '以 bubblechickenlab 為名的獨立工作室 — 在軟體、敘事與工藝的交會處，打造產品、作品集與工具。',
      '從構想到上線全責：設計、工程、部署，以及圍繞每次發佈的敘事與迭代。',
    ],
    publicationsTitle: '著作',
    publications: {
      nagi: {
        title: 'NAGI · Portfolio',
        description: '自架個人網站，收錄作品集與文章。',
      },
      kata: {
        title: 'KATA · Résumé & Tracker',
        description: '一站式撰寫履歷、追蹤求職申請 — 支援本地與雲端存檔，可匯出 PDF。',
      },
      github: {
        title: 'GitHub · louislibuilds',
        description: 'github.com/louislibuilds',
      },
      linkedin: {
        title: 'LinkedIn',
        description: 'linkedin.com/in/louis-li-builds',
      },
    },
  },
  roof: {
    cta: '保持聯繫！',
    printResume: 'RESUME',
    linkLabels: {
      email: 'Email',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      portfolio: 'Portfolio',
      kata: 'KATA.app',
    },
  },
  projects: {
    'unihack-2026': {
      title: 'your·rock·is·coming',
      hook: 'Sydney 網球場探索 + 天氣感知訂場 — UniHack 2026 48 小時作品。',
      body: 'Sydney 打網球的人面對碎片化生態：場地散在各 council、俱樂部、學校網站，訂場工具各寫各的；戶外場地還受天氣影響，訂完才發現會淋雨很常見。\n\nyour·rock·is·coming 用互動地圖探索 Sydney 場地，依 surface、夜燈、停車、suburb 篩選；訂場整合 7 日 forecast、rain chance 與 dryness index，確認前就知道天氣風險。\n\n支援 full stack（React + Express + SQLite）與 frontend-only demo。我組建 UniHack 2026 團隊，負責前後端整合、天氣 API 串接，以及 hackathon 現場可 demo 的最小完整路徑。',
      role: '隊長 & 全端開發（六人團隊）',
      credit:
        'Amber H. Hong — 全端架構：Express + SQLite、三欄地圖 UI、含衝突檢測的訂場、天氣感知取消與場地乾燥演算法。Carrie XIE — 主要 PM 與產品顧問：初始題目、產品雛形、PRD 與問題定義，後續與工程師密集協作。Penny Hsieh、Julia Hsieh、Isla Shen — 品質管理與產品測試，提供具體改進建議，協助與支持開發團隊、產品團隊。',
    },
    'cloud-computing': {
      title: 'SUNishop — Cloud E-Commerce',
      hook: 'LAMP → MERN 遷移，CI 關卡與自動化 server 測試；AWS Academy credits 到期後仍持續部署的線上商店。',
      body: 'Cloud Computing & SaaS 與 Infrastructure for Cloud Computing 課程產出 — 把 legacy LAMP 電商遷到 MERN，在 AWS 部署，並把 release 紀律當成產品的一部分。\n\nReact  storefront、Node/Express API、MongoDB、CI pipeline，每次 release 前跑自動化 server 測試。初期透過 UTS AWS Academy 部署在 AWS；credits 到期後改部署到 Vercel（前端）、Railway（API）、MongoDB Atlas（資料庫），讓商店能繼續跑。\n\n原本以為 deploy 完就結束，後來才懂環境、回滾、測試關卡——以及什麼時候該換 hosting——都是產品的一部分。',
      role: '全端開發',
      course: '42904 雲端運算 & SaaS (100 HD) · 42891 雲端基礎設施 (95 HD)',
    },
    nlp: {
      title: 'Mock Interview Coach',
      hook: 'STT → STAR 結構化評分 → 回饋。LLM + 離線 mock 混合，demo 永遠跑得通。',
      body: '自練面試缺的不是題庫，而是講完之後立刻知道哪裡弱——STAR 結構、證據、語速與填充詞。錄影回放 feedback 慢，也難量化。\n\nWizard 流程：錄音 → faster-whisper STT → 前處理 → /v1/score。有 OPENAI_API_KEY 走 LLM JSON 評分；否則 deterministic NLP mock（keywords、structure、fluency、evidence）。LLM 失敗自動 fallback mock，demo 可重現。\n\nEnd-to-end：FastAPI + faster-whisper、NLP mock engine、React wizard 與 score breakdown UI，EN/zh-TW 文件。Assessment 3 最終 94 HD（NLP Algorithms, 42850）。這門課教我的：NLP 落地要先能 measure、validate、document。',
      role: '主要開發',
      course: '42850 NLP 演算法 (94 HD)',
    },
    dl: {
      title: 'VTuber MoCap',
      hook: '瀏覽器 VTuber 動捕：webcam → MediaPipe → Kalidokit → VRM。TechFest 2026 展示 · 95 HD。',
      body: 'Deep Learning & CNN（42028）——在瀏覽器內完成即時動作捕捉並驅動 VRM 虛擬角色。打開 localhost、允許相機，就能 demo 完整 pipeline。\n\nWebcam → MediaPipe Holistic → Kalidokit（頭、手臂、手指 curl）→ three.js + @pixiv/three-vrm retarget。可選手勢 CNN（ONNX）在瀏覽器做 throttled 分類。\n\n負責 browser pipeline 產品化：ESM import map、CDN 依賴、相機權限、EN/zh-TW 文件，讓 TechFest 當天穩定展示。最終 95 HD；獲 Dr. Nabin Sharma 提名 UTS TechFest 2026 AI Showcase。CV pipeline 常常比模型更早、更安靜地壞掉——smoothing 與瀏覽器限制和網路一樣重要。',
      role: '軟體開發 · 產品化 · 團隊協調（三人團隊）',
      team: 'Ko-Chun Liao（構想與框架）、Junjie Niu（實驗設計）',
      course: '42028 深度學習 & CNN (95 HD)',
    },
    kata: {
      title: 'KATA',
      hook: '引導式履歷編輯 + 即時 A4 預覽、四款模板、可點擊連結的 PDF — 我自己求職在用的工具。',
      body: '前身是桌面版 RESUmade——分步填寫比一次性長表單更不容易放棄。2026 年改名 KATA（型），強調「打造你的專業樣貌」，landing、editor、PDF 匯出收斂成可部署的單頁應用。\n\n九步驟：聯絡 → 簡介 → 學歷 → 經歷 → 技能 → 專案 → 證照 → 推薦人 → 版面。右側 A4 即時預覽；Heritage、Clean、Sidebar、Classic 四款模板；PDF 滿版 A4、連結可點擊，最多四頁。\n\n本機草稿 + .kata.json 匯出（相容 .resumade.json）。與 JOBO tracker 同在 bubblechickenlab.com/kata — 履歷負責「長什麼樣」，tracker 負責「投到哪」。持續迭代模板、Suite AI 輔助與 tracker 工作流串接。',
      role: '獨立開發',
    },
    nagi: {
      title: 'NAGI · 凪',
      hook: '個人品牌平台 — WebGL 水面入口、深度內容層、TipTap CMS、作品 case study 與多語系文章。',
      body: 'bubblechickenlab.com 需要的不只是連結清單，而是「記得住的入口 + 安靜可讀的內容層」。NAGI（凪）就是這個 hub：Surface 是全螢幕 WebGL 水面；點進去才是 Depth 的 /work、/articles、/about，以及 /edit 的 owner CMS。\n\nVite SPA + Three.js 水面 shader 做 immersive entry；底下是 typography-first 的 editorial layout。Supabase 存文章、作品、分類、訂閱；TipTap JSONB 正文支撐長篇 case study（SUNishop、KATA、Tower Zero 等）。RLS 區分 public read 與 editor write；build-time prerender 讓 crawler 能讀到關鍵路由的 HTML snapshot。\n\nNAGI 是 bubblechickenlab 產品家族的敘事層 — portfolio、寫作、案例沉澱 — KATA 負責履歷工具，Tower Zero 負責可走進去的 3D 履歷。',
      role: '創辦人 & 全端開發',
    },
    'tower-zero': {
      title: 'Tower Zero',
      hook: '可走進去的 3D 作品集 — 每層對應履歷的一章。',
      body: 'G 大廳 — 進入大樓的起點，簡介作者與就讀背景。B2 基礎設施 — 大樓根基，技術棧與軟技能在此匯集，支撐上層運轉。23F 工廠 — 四條學期產線，修課歷程在此組裝成形。52F 實驗室 — 各項專案實驗，標示狀態與產出（含你現在所在的這間）。99F 圖書館與檔案 — 證書與出版作品，記錄一切成果。B10 科技中心 — 社群連結與履歷列印。R 屋頂 — 聯絡方式與各作品入口。\n\n以 React、Three.js 建構正交 3D 場景，支援繁中、英文、日文與日夜雙主題。',
      role: '獨立開發 · 設計',
      credit:
        'salieri009/resume2（SITE 009）— 正交導覽、HUD 布局、鏡頭站、開場轉場語法。視覺系統與內容為 Tower Zero 原創。',
    },
  },
  credentials: {
    'deans-list': {
      title: '院長榮譽榜 2026',
      detail: '優異學術成就 · 2026',
      body: '因資訊科技碩士學程持續優異成績獲選 — WAM 86.9、96 學分，含九科 HD。',
    },
    degree: {
      title: '資訊科技碩士',
      detail: 'C04295 · 96 學分 · WAM 86.9 · GPA 6.5/7',
      body: '2024/08 – 2026/08 完成，96 學分中共 9 科 HD。軟體工程課程含 Cloud Computing & SaaS、Infrastructure for Cloud Computing、Fundamentals of Software Development — 實作 LAMP 至 MERN 電商平台並部署於 AWS 與 CI/CD。NLP Algorithms、Deep Learning & CNN 等進階課程產出可部署的 ML 管線；Project Management 與 Industry Project 強化跨團隊規劃、利害關係人溝通、團隊領導，以及在期限下協作交付。',
    },
    techfest: {
      title: 'TechFest AI 展示提名',
      detail: 'Deep Learning & CNN · 42028 · 95 HD · TechFest 2026',
      body: '獲 Dr. Nabin Sharma 提名，於 UTS TechFest 2026 AI Showcase 上台展示。主導 Deep Learning & CNN (42028) 瀏覽器 VTuber 動作捕捉 pipeline：webcam → MediaPipe Holistic → Kalidokit → VRM 虛擬角色，並以 ONNX CNN 在瀏覽器端做可選手勢分類。負責軟體整合、產品化與團隊協調 — 調 landmark 平滑、pipeline 穩定度與現場 demo 交付。High Distinction (95)；case study 與開源 repo 見 bubblechickenlab.com/work/vtuber-mocap。',
      credit: 'Ko-Chun Liao — 專案構想與框架；Junjie Niu — 實驗設計與研究支援。',
    },
    tsa: {
      title: 'UTS Taiwan Student Association',
      detail: '共同創辦人 · 副會長 & 秘書 · 顧問 · 2025/06 – 2026/06',
      body: '從零共同創辦 UTS TSA，歷經創會期至顧問角色。社群渠道成長 25%+、達 1,000+ 追蹤，並為 UTS 台灣學生建立跨文化活動與學期規劃。',
      bullets: [
        '共同創辦人：品牌識別、社群渠道、首學期活動行事曆與創會幹部架構',
        '副會長 & 秘書（2025/06 – 2026/06）：活動執行、志工協調、對外聯繫與內部溝通',
        '顧問（2026）：治理延續、幹部交接與下一屆團隊的中長期規劃',
      ],
    },
    acf: {
      title: 'ACF 導師計畫',
      detail: '學員 · 導師：Howard C. · 舉辦：Peter Wei',
      body: '2026 年參加 Australia Career Forum (ACF) 導師計畫。與 Howard C. 定期會談，針對畢業求職策略、履歷修訂、面試準備與澳洲科技業市場 — 獲得務實、誠實、貼近真實申請的回饋。導師的價值不只是求職技巧：有人在旁提醒你可以成長、可以跌倒、可以再試一次，意義重大 — 求職最艱難的時候，也一路陪伴我面對冒牌者症候群（imposter syndrome）這類常見的心理困境，並一起嘗試化解。',
      credit: 'Peter Wei — 策劃計畫並建立導師與學員互相學習的空間。Howard C. — 履歷檢視、關鍵時刻的新視角，以及持續的鼓勵。',
    },
  },
  focus: {
    panelHint: '特寫詳情 · 右側面板',
    back: '返回房間',
    backToArchive: '返回檔案室',
    backToLibrary: '返回圖書館',
    bookOpen: '開啟連結 ↗',
    credentialEyebrow: '檔案室 · 證書',
  },
}

const ja: LocaleStrings = {
  site: {
    siteTitle: 'The Tower of STEM, Zone 0',
    siteCode: 'bubblechickenlab · Louis Li present',
    architectName: 'Louis Li',
    creditsComplete: '修了',
    linkGithub: 'GITHUB',
    linkLinkedin: 'LINKEDIN',
    linkPortfolio: 'PORTFOLIO',
    constructing: '構築中…',
    rollingDrawing: 'セットを終了中…',
    fallback: '2D 表示 · WebGL 非対応',
    floors: '階',
    details: '詳細',
    hint: 'モデルまたは左のレールで階・部屋を選んでください。',
    themeDark: 'Night',
    themeLight: 'Day',
    rollDrawing: 'セット終了',
    printResume: 'RESUME',
    elevatorLabel: 'ELEVATOR',
  },
  stamp: {
    code: 'TOWER 0',
    name: 'LOUIS LI',
  },
  exit: {
    label: 'セット終了',
    reopen: '塔を再開する',
  },
  floors: {
    B10: {
      title: 'テックセンター',
      subtitle: 'SNS · 履歴書印刷',
      exhibitTitle: 'テックセンター · B10',
      exhibitHook: 'SNS リンクと履歴書プリンター。',
    },
    B2: {
      title: 'インフラ',
      subtitle: 'スキル · テック & ソフト',
      exhibitTitle: 'インフラ · B2',
      exhibitHook: '塔の下の立管、配管、回路基板。',
    },
    G: {
      title: 'ロビー',
      subtitle: 'ようこそ · プロフィール',
      exhibitTitle: 'ロビー · 地面',
      exhibitHook: 'コンセプトウォールと、地上階のアイデンティティプレート。',
    },
    '23': {
      title: 'ファクトリー',
      subtitle: '生産ライン · 成績',
      exhibitTitle: 'ファクトリー · 23F',
      exhibitHook: '4学期の組立ライン — 成績、グレード、マイルストーン。',
    },
    '52': {
      title: 'ラボラトリー',
      subtitle: 'グループプロジェクト',
      exhibitTitle: 'ラボラトリー · 52F',
      exhibitHook: '8 つのラボスイート — ハッカソンから研究パイプラインまで。',
    },
    '99': {
      title: '図書館 & アーカイブ',
      subtitle: '受賞 · 資格',
      exhibitTitle: '図書館 · 99F',
      exhibitHook: '学位、ディーンズリスト、リーダーシップ、証書。',
    },
    roof: {
      title: '屋上',
      subtitle: '連絡先',
      exhibitTitle: '屋上',
      exhibitHook: '',
    },
  },
  lobby: {
    welcomeName: 'ようこそ',
    motto: '高い塔は、一階から。良いソフトウェアも、一行から。',
    floorIntro:
      '建築のようにシステムを組み立てる — 構造を先に、物語を語る部屋を後に。',
    wam: 'WAM',
    gpa: 'GPA',
    cp: '単位',
    hdCount: 'HD',
    deansList: "Dean's List",
    hint: '左のレールから階を選択 — この塔が地図です。',
  },
  factory: {
    wam: 'WAM',
    cp: '単位',
    avg: '平均',
    heroTitle: 'ファクトリー',
    floorIntro: '4学期の生産ライン — 成績、平均、ベルト末端の学位証書。',
    panelTitle: 'University of Technology Sydney · Master of Information Technology',
    panelFloor: 'ファクトリー · 23F',
    selectArea: 'モデルまたはレールでラインを選択 — Area 01–04。',
    allAreas: 'すべての生産ライン',
    overview: '4学期のラインが並行 — エリアをクリックしてズーム。',
    completionLabel: 'UTS MIT COMPLETE',
    tsaCertTitle: 'UTS TSA · Letter of Recognition',
    deansListCertTitle: "UTS · Dean's List 2026",
    degreeCertTitle: 'UTS · Master of IT Testamur',
  },
  lab: {
    heroTitle: 'ラボラトリー',
    floorIntro: '8 つのラボスイート — 研究状態、テーマ、成果の記録。',
    statusPending: '研究未開始',
    statusActive: '研究中',
    statusCompleted: '研究完了',
    emptyResearchTitle: '—',
    emptyIntro: '予約済みスイート — 研究テーマは未割当。',
    role: '役割',
    team: 'チーム',
    course: 'コース',
  },
  infra: {
    heroTitle: 'インフラ',
    floorIntro: '塔の下の機械室 — 各階をつなぐ技術スタックと働き方。',
    softSkillsTitle: 'ソフトスキル',
    softSkillGroups: [
      {
        category: 'リーダーシップ & 協働',
        items: [
          'チームリーダーシップ',
          'クロスファンクショナルな連携',
          'ステークホルダーとのコミュニケーション',
          'ボランティアコーディネーション',
          'コードレビュー',
        ],
      },
      {
        category: 'デリバリー & 品質',
        items: [
          'エンドツーエンドのオーナーシップ',
          '納期遵守',
          '自動テスト',
          'アジャイル開発',
          '技術ドキュメント作成',
        ],
      },
      {
        category: 'コミュニケーション',
        items: [
          '英語（ビジネスレベル）',
          '中国語（ネイティブ）',
          '日本語（学習中）',
          '非技術者への技術的トレードオフの説明',
          'リモート環境での協働',
          'リスクコミュニケーション',
        ],
      },
    ],
  },
  tech: {
    heroTitle: 'テックセンター',
    floorIntro:
      '地下の印刷室 — LinkedIn、Instagram、Threads、ポートフォリオ、GitHub へのリンク。紙が必要なときはプリンターを使う。',
    socialTitle: 'リンク',
    printerTitle: 'プリンター',
    resumeIntro:
      'A4 二枚の履歴書 PDF（EN / zh-TW）。下でプレビュー。印刷するとリンク付き PDF が開きます。',
    previewTitle: '履歴書プレビュー',
    previewHint: 'スクロール可 · リンク有効 · 印刷は PDF ファイル',
    openPreview: 'プレビューを開く',
    print: '履歴書を印刷',
    printDesc: 'A4 二枚 — リンク付き PDF',
    printNow: '今すぐ印刷',
    kataNote: '編集可能な版が必要ですか？KATA で作成・エクスポートできます。',
    openKata: 'KATA を開く ↗',
    linkLabels: {
      linkedin: 'LinkedIn',
      instagram: 'Instagram',
      threads: 'Threads',
      portfolio: 'Portfolio',
      github: 'GitHub',
    },
  },
  resumePrint: {
    drawerTitle: '履歴書プレビュー',
    drawerDoc: 'PDF · A4 · 2 ページ',
    printNow: '印刷',
    close: '閉じる',
  },
  library: {
    heroTitle: '図書館 & アーカイブ',
    archiveTitle: 'アーカイブ',
    archiveTagline: '資格 · 栄誉 · リーダーシップ',
    libraryTitle: '図書館',
    libraryTagline: 'プラットフォーム · 執筆 · プロジェクト',
    archiveIntro: '文書保管庫 — これまでに得た実績、評価、リーダーシップ。',
    libraryIntro: '出荷デスク — bubblechickenlab のツール、リポジトリ、進行中のビルド。',
    librarianTitle: '館長',
    featuredRole: '創設者 · 開発者 · クリエイター',
    featuredBullets: [
      'bubblechickenlab 名義の独立スタジオ — ソフトウェアとストーリーテリング、クラフトが交わるプロダクト・ポートフォリオ・ツールを構築。',
      'アイデアから公開まで一貫して担当：デザイン、エンジニアリング、デプロイ、そして発表物をめぐるナラティブ。',
    ],
    publicationsTitle: '著作',
    publications: {
      nagi: {
        title: 'NAGI · ポートフォリオ',
        description: '自前ホストの個人サイト — ポートフォリオと文章をひとまとめに。',
      },
      kata: {
        title: 'KATA · 履歴書 & トラッカー',
        description: '履歴書の作成から応募管理まで — ローカル／クラウド保存、PDF エクスポート対応。',
      },
      github: {
        title: 'GitHub · louislibuilds',
        description: 'github.com/louislibuilds',
      },
      linkedin: {
        title: 'LinkedIn',
        description: 'linkedin.com/in/louis-li-builds',
      },
    },
  },
  roof: {
    cta: 'また連絡しましょう！',
    printResume: 'RESUME',
    linkLabels: {
      email: 'Email',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      portfolio: 'Portfolio',
      kata: 'KATA.app',
    },
  },
  projects: {
    'unihack-2026': {
      title: 'your·rock·is·coming',
      hook: 'Sydney テニスコート探索 + 天候連動予約 — UniHack 2026・48時間。',
      body: 'Sydney のテニスプレイヤーは council・クラブ・学校サイトに散らばった予約フローと格闘する。屋外コートは天候依存なのに、多くのツールは forecast を後付けにしている。\n\nyour·rock·is·coming は Sydney コートを地図で探索し、surface・照明・駐車・suburb で絞り込み。7日間 forecast、rain chance、dryness index を予約前に表示。\n\nfull stack（React + Express + SQLite）と frontend-only demo の両方。UniHack 2026 チームを組成し、地図・天候 API・デモ可能な最小 booking パスを end-to-end で担当。',
      role: 'チームリード & フルスタック（6名）',
      credit:
        'Amber H. Hong — フルスタック設計：Express + SQLite、三ペイン地図 UI、競合検出付き予約、天候連動キャンセルとコート乾燥アルゴリズム。Carrie XIE — リード PM・プロダクト顧問：初期コンセプト、PRD、問題定義、エンジニアリング協働。Penny Hsieh、Julia Hsieh、Isla Shen — テストとフィードバック。',
    },
    'cloud-computing': {
      title: 'SUNishop — Cloud E-Commerce',
      hook: 'LAMP → MERN 移行、CI ゲート、自動 server テスト。AWS Academy credits 終了後も稼働するストアフロント。',
      body: 'Cloud Computing & SaaS と Infrastructure for Cloud Computing の成果物 — legacy LAMP EC を MERN に移行し AWS にデプロイ。リリース規律もプロダクトの一部。\n\nReact storefront、Node/Express API、MongoDB、CI、リリース前の自動 server テスト。初期は UTS AWS Academy 経由で AWS；credits 終了後 Vercel（FE）・Railway（API）・MongoDB Atlas に再ホスト。\n\ndeploy すれば終わり、と思っていた。環境設定、ロールバック、テストゲート、スタック移行の判断 — すべて shipping の一部だと学んだ。',
      role: 'フルスタック開発者',
      course: '42904 Cloud Computing & SaaS (100 HD) · 42891 Infrastructure for Cloud (95 HD)',
    },
    nlp: {
      title: 'Mock Interview Coach',
      hook: 'STT → STAR 構造化スコア → フィードバック。LLM + オフライン mock でデモは常に再現可能。',
      body: '独学面接に足りないのは題集ではなく、話した直後の構造化フィードバック — STAR 証拠、流暢さ、フィラー語。録画の再生は遅く、定量化も難しい。\n\nWizard：録音 → faster-whisper STT → 前処理 → /v1/score。OPENAI_API_KEY があれば LLM JSON 採点、なければ deterministic NLP mock。LLM 失敗時は mock に fallback。\n\nFastAPI + faster-whisper、NLP mock engine、React wizard、EN/zh-TW ドキュメントを end-to-end で構築。Assessment 3：94 HD（NLP Algorithms, 42850）。measure、validate、document — モデル選び以上に残った教訓。',
      role: 'リード開発者',
      course: '42850 NLP アルゴリズム (94 HD)',
    },
    dl: {
      title: 'VTuber MoCap',
      hook: 'ブラウザ VTuber モーキャプ：webcam → MediaPipe → Kalidokit → VRM。TechFest 2026 · 95 HD。',
      body: 'Deep Learning & CNN（42028）— ブラウザ内リアルタイム pose capture で VRM アバターを駆動。localhost を開き、カメラ許可で pipeline 全体を demo。\n\nWebcam → MediaPipe Holistic → Kalidokit → three.js + @pixiv/three-vrm。任意で gesture CNN（ONNX）をブラウザで throttled 分類。\n\nbrowser pipeline の製品化：ESM import map、CDN、カメラ権限、TechFest 向け EN/zh-TW ドキュメント。最終 95 HD。UTS TechFest 2026 AI Showcase ノミネート（Dr. Nabin Sharma）。CV pipeline はモデルより先に、静かに壊れる — smoothing とブラウザ制約が同じくらい重要。',
      role: 'ソフトウェア開発 · 製品化 · チーム調整（3名）',
      team: 'Ko-Chun Liao（構想・フレームワーク）、Junjie Niu（実験設計）',
      course: '42028 深層学習 & CNN (95 HD)',
    },
    kata: {
      title: 'KATA',
      hook: 'ガイド付き履歴書ビルダー + ライブ A4 プレビュー、4テンプレート、クリック可能 PDF — 自分の応募で使用中。',
      body: 'デスクトップ版 RESUmade から進化 — ステップ入力が長いフォームより続けやすい。2026年 KATA（型）に改名し、landing・editor・PDF を一つの deployable app に。\n\n9ステップ builder + ライブ A4 プレビュー。Heritage、Clean、Sidebar、Classic。PDF は A4 フル、リンククリック可、最大4ページ。\n\nローカルファースト + .kata.json エクスポート（.resumade.json 互換）。JOBO tracker と bubblechickenlab.com/kata で一体 — 履歴書は形、tracker は pipeline。テンプレート、Suite AI、tracker 連携を継続開発中。',
      role: '単独開発者',
    },
    nagi: {
      title: 'NAGI · 凪',
      hook: '個人ブランド hub — WebGL 水面エントリー、editorial depth、TipTap CMS、work case study、多言語記事。',
      body: 'bubblechickenlab.com に必要なのはリンク集以上のもの — 記憶に残る入口と、静かに読めるコンテンツ層。NAGI（凪）はその hub：Surface は full-screen WebGL 水面、Depth は /work · /articles · /about、owner CMS は /edit。\n\nVite SPA + Three.js water shader の immersive entry と typography-first editorial layout。Supabase に articles · works · categories · subscribers；TipTap JSONB で長文 case study（SUNishop、KATA、Tower Zero など）。RLS で public read と editor write を分離；build-time prerender で crawler 向け HTML snapshot。\n\nbubblechickenlab product family の narrative 層 — portfolio · writing · case study archive。KATA は résumé tooling、Tower Zero は walk-in 3D resume。',
      role: 'Founder & フルスタック開発',
    },
    'tower-zero': {
      title: 'Tower Zero',
      hook: 'Walk-in 3D ポートフォリオ — 各フロアが履歴書の一章。',
      body: 'G Lobby — 入場と作者紹介。B2 Infrastructure — 基盤：技術スタックとソフトスキルが上層を支える。23 Factory — 四つの学期ライン、履修の組み立て。52 Laboratory — 各プロジェクト実験、状態と成果（今いるこの lab も含む）。99 Library & Archive — 資格と公開作品の記録。B10 Tech Centre — SNS リンクと履歴書印刷。R Roof — 連絡先と各作品への入口。\n\nReact + Three.js の正交 3D、三言語 UI、Day/Night テーマ。',
      role: '単独開発 · デザイン',
      credit:
        'salieri009/resume2（SITE 009）— 正交ナビ、HUD レイアウト、カメラステーション、boot/transition 言語。ビジュアルシステムとコンテンツは Tower Zero オリジナル。',
    },
  },
  credentials: {
    'deans-list': {
      title: 'ディーンズリスト 2026',
      detail: '優秀な学業成績 · 2026',
      body: '情報工学修士プログラムで優秀な成績 — WAM 86.9、96 単位、HD 9 科目。',
    },
    degree: {
      title: '情報工学修士',
      detail: 'C04295 · 96 単位 · WAM 86.9 · GPA 6.5/7',
      body: '2024/08 – 2026/08 修了。96 単位中 HD 9 科目。Cloud Computing & SaaS、Infrastructure for Cloud Computing、Fundamentals of Software Development で LAMP→MERN EC を AWS + CI/CD へデプロイ。NLP Algorithms、Deep Learning & CNN で ML パイプラインを GitHub 公開。Project Management と Industry Project でクロスファンクショナルな連携、ステークホルダーとのコミュニケーション、チームリーダーシップ、納期遵守のもとでのデリバリーを強化。',
    },
    techfest: {
      title: 'TechFest AI ショーケースノミネート',
      detail: 'Deep Learning & CNN · 42028 · 95 HD · TechFest 2026',
      body: 'UTS TechFest 2026 AI Showcase へのノミネート。Deep Learning & CNN (42028) のブラウザ VTuber モーションキャプチャをリード：webcam → MediaPipe Holistic → Kalidokit → VRM、任意の ONNX CNN ジェスチャ分類。ソフトウェア統合、製品化、チーム調整 — ランドマーク平滑化とデモ品質まで担当。High Distinction (95)。case study と OSS は bubblechickenlab.com/work/vtuber-mocap。',
      credit: 'Ko-Chun Liao — プロジェクト構想とフレームワーク；Junjie Niu — 実験設計と研究支援。',
    },
    tsa: {
      title: 'UTS Taiwan Student Association',
      detail: '共同創設者 · 副会長 & 秘書 · コンサルタント · 2025/06 – 2026/06',
      body: 'UTS TSA をゼロから共同創設し、創設期からアドバイザーまで担当。コミュニティチャネルを 25%+ 成長させ 1,000+ フォロワー、UTS の台湾人学生向けクロスカルチャー・プログラムを構築。',
      bullets: [
        '共同創設者：ブランド、SNS、初学期イベントカレンダー、創設幹部体制',
        '副会長 & 秘書（2025/06 – 2026/06）：イベント運営、ボランティアコーディネーション、対外連携、内部コミュニケーション',
        'コンサルタント（2026）：ガバナンス継続、幹部引き継ぎ、次期チームの中長期計画',
      ],
    },
    acf: {
      title: 'ACF メンタリングプログラム',
      detail: 'メンティ · メンター: Howard C. · 主催: Peter Wei',
      body: '2026 年に Australia Career Forum (ACF) メンタリングプログラムに参加。Howard C. との定期セッションで、新卒就職戦略、履歴書改善、面接準備、豪州テック市場への適応 — 実際の応募に即した実践的なフィードバックを得た。メンターシップはキャリア術だけではなく、成長・失敗・再挑戦を当たり前にしてくれる存在 — 就活が最も厳しい時期に、インポスター症候群（imposter syndrome）というよくある心理的な壁と向き合い、共に乗り越えようと寄り添ってくれたことも、大きな意味を持った。',
      credit: 'Peter Wei — プログラムを組織し、メンターとメンティが学び合う場を創出。Howard C. — 履歴書レビュー、必要な時の新しい視点、継続的な励まし。',
    },
  },
  focus: {
    panelHint: 'フォーカス詳細 · サイドパネル',
    back: 'ルームに戻る',
    backToArchive: 'アーカイブに戻る',
    backToLibrary: '図書館に戻る',
    bookOpen: 'リンクを開く ↗',
    credentialEyebrow: 'アーカイブ · 資格',
  },
}

export const STRINGS: Record<Locale, LocaleStrings> = { en, 'zh-TW': zhTW, ja }

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'EN',
  'zh-TW': '繁',
  ja: '日',
}

export const HTML_LANG: Record<Locale, string> = {
  en: 'en',
  'zh-TW': 'zh-Hant',
  ja: 'ja',
}

export function isLocale(value: string | null): value is Locale {
  return value !== null && value in STRINGS
}
