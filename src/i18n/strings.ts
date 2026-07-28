export type Locale = 'en' | 'zh-TW' | 'ja'
export type Theme = 'dark' | 'light'

export interface LocaleStrings {
  site: {
    name: string
    siteTitle: string
    siteCode: string
    zoneName: string
    architectName: string
    architectRole: string
    tagline: string
    constructing: string
    rollingDrawing: string
    fallback: string
    floors: string
    hint: string
    themeDark: string
    themeLight: string
    rollDrawing: string
    printResume: string
  }
  stamp: {
    code: string
    name: string
    rev: string
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
    welcome: string
    thesis: string
    bio: string
    degree: string
    institution: string
    wam: string
    gpa: string
    cp: string
    hdCount: string
    deansList: string
    program: string
    location: string
    experienceTitle: string
    hint: string
  }
  factory: {
    wam: string
    cp: string
    hd: string
    d: string
    avg: string
    panelTitle: string
    panelFloor: string
    selectArea: string
    allAreas: string
    overview: string
    completionLabel: string
  }
  lab: {
    intro: string
    selectRoom: string
    role: string
    team: string
    course: string
  }
  infra: {
    skillsTitle: string
    coursesTitle: string
    viewProject: string
  }
  tech: {
    intro: string
    github: string
    githubDesc: string
    nagi: string
    nagiDesc: string
    kata: string
    kataDesc: string
    print: string
    printDesc: string
    reposTitle: string
    openProfile: string
    openNagi: string
    openKata: string
    printNow: string
  }
  library: {
    heroTitle: string
    heroTagline: string
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
    copy: string
  }
  projects: Record<
    string,
    { title: string; hook: string; role: string; team?: string; course?: string }
  >
  credentials: Record<string, { title: string; detail?: string; body?: string; bullets?: string[]; credit?: string }>
  skillGroups: Record<string, string>
  platformApps: Record<string, { name: string; hook: string }>
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
    name: 'Tower Zone 0',
    siteTitle: 'The Tower of STEM, Zone 0',
    siteCode: 'ZONE · 0',
    zoneName: 'Tower Zone 0',
    architectName: 'Louis Li',
    architectRole: 'Master of IT · Full-stack',
    tagline: 'Software is not written. It is constructed.',
    constructing: 'Constructing…',
    rollingDrawing: 'Ending set…',
    fallback: '2D elevation · WebGL unavailable',
    floors: 'FLOORS',
    hint: 'Select a floor or room on the model or rail.',
    themeDark: 'Night',
    themeLight: 'Day',
    rollDrawing: 'End set',
    printResume: 'RESUME',
  },
  stamp: {
    code: 'TOWER 0',
    name: 'LOUIS LI',
    rev: 'LEARNING IS CONSTRUCTION · REV A',
  },
  exit: {
    label: 'END OF SET',
    reopen: 'REOPEN THE TOWER',
  },
  floors: {
    B10: {
      title: 'Tech Centre',
      subtitle: 'GitHub · Print Résumé',
      exhibitTitle: 'Tech Centre · B10',
      exhibitHook: 'Source control, deployment artifacts, printable résumé sheets.',
    },
    B2: {
      title: 'Infrastructure',
      subtitle: 'Skills · Courses · Links',
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
    welcome: 'Welcome to',
    thesis: 'Every tower rises from the ground — learning is construction.',
    bio: 'Full-stack developer · UTS MIT · Sydney. I construct software the way buildings are built.',
    degree: 'Degree',
    institution: 'Institution',
    wam: 'WAM',
    gpa: 'GPA',
    cp: 'Credit Points',
    hdCount: 'HD',
    deansList: "Dean's List",
    program: 'Program',
    location: 'Location',
    experienceTitle: 'Experience',
    hint: 'Select a floor from the rail — the tower is the map.',
  },
  factory: {
    wam: 'WAM',
    cp: 'Credit Points',
    hd: 'High Distinction',
    d: 'Distinction',
    avg: 'Avg',
    panelTitle: 'University of Technology Sydney · Master of Information Technology',
    panelFloor: 'Factory · 23F',
    selectArea: 'Select a production line (Area 01–04) on the model or rail.',
    allAreas: 'All production lines',
    overview: 'Four semester lines run parallel — click an area to zoom in.',
    completionLabel: 'UTS MIT COMPLETE',
  },
  lab: { intro: 'Five project rooms on this floor.', selectRoom: 'Select a room on the model or rail.', role: 'Role', team: 'Team', course: 'Course' },
  infra: {
    skillsTitle: 'Skills — Risers & Pipes',
    coursesTitle: 'Course Links → Projects',
    viewProject: 'View project ↗',
  },
  tech: {
    intro: 'Underground tech centre — repos, exports, deployment.',
    github: 'GitHub',
    githubDesc: 'louislibuilds — repos, commits, open source',
    nagi: 'bubblechickenlab',
    nagiDesc: '3-app production platform — nagi, KATA editor, job tracker',
    kata: 'KATA Editor',
    kataDesc: 'Craft & export résumé with PDF export',
    print: 'Print Résumé',
    printDesc: 'Print identity plate or use KATA for full sheets',
    reposTitle: 'Highlighted Repos',
    openProfile: 'Open profile ↗',
    openNagi: 'Open site ↗',
    openKata: 'Open KATA ↗',
    printNow: 'Print now',
  },
  library: {
    heroTitle: 'Library & Archive',
    heroTagline: 'Leadership ‧ Certification ‧ Achievement',
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
    printResume: 'Print résumé',
    linkLabels: {
      email: 'Email',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      portfolio: 'Portfolio',
      kata: 'KATA.app',
    },
    copy: '© {year} Louis Li · Tower 0',
  },
  projects: {
    'unihack-2026': {
      title: 'UniHack 2026 — Your Rock Is Coming',
      hook: '48-hour MVP: map discovery + 7-day weather forecasts.',
      role: 'Team Lead & Technical Director',
      team: 'Cross-functional hackathon team',
    },
    'cloud-computing': {
      title: 'SUNishop — Cloud E-Commerce',
      hook: 'LAMP → MERN migration with CI and AWS Academy deployment.',
      role: 'Full-stack Developer',
      course: '42904 (100 HD) · 42891 (95 HD)',
    },
    nlp: {
      title: 'Mock Interview Coach',
      hook: 'STT-powered mock interviews with STAR-based NLP feedback.',
      role: 'Lead Developer',
      course: '42850 NLP Algorithms (94 HD)',
    },
    dl: {
      title: 'VTuber Motion Pipeline',
      hook: 'Real-time pose → VRM avatar via MediaPipe, Kalidokit, gesture CNN.',
      role: 'Software Dev · Productization',
      team: 'Ko-Chun Liao, Junjie Niu',
      course: '42028 Deep Learning & CNN (95 HD)',
    },
    kata: {
      title: 'KATA — Resume & Job Tracker',
      hook: 'Unified job-search: craft résumés, deploy PDFs, track applications.',
      role: 'Sole Builder',
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
      body: 'Joined the Australia Career Forum (ACF) Mentoring Program in 2026 as a mentee. Through structured sessions and ongoing check-ins with Howard C., worked on graduate job-search strategy, resume refinement, interview preparation, and navigating the Australian tech hiring market — with honest, practical feedback tied to real applications. Mentorship here was more than career tactics: having someone in your corner who normalizes growing, stumbling, and trying again made a real difference — including naming and working through imposter syndrome when it mattered most during job search.',
      credit: 'Peter Wei — organized the program and created space for mentors and mentees to learn from one another. Howard C. — resume reviews, fresh insights when they were needed most, and encouragement to keep going.',
    },
  },
  skillGroups: {
    Languages: 'Languages',
    Frontend: 'Frontend',
    'Backend & Data': 'Backend & Data',
    'Cloud & DevOps': 'Cloud & DevOps',
    'ML / AI': 'ML / AI',
  },
  platformApps: {
    nagi: { name: 'nagi', hook: 'Portfolio-as-architecture — multilingual CMS on bubblechickenlab.com.' },
    'kata-editor': { name: 'KATA Editor', hook: 'Résumé variants with live preview and PDF export.' },
    'kata-tracker': { name: 'KATA Tracker', hook: 'Local-first job application tracker.' },
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
    name: 'Tower Zone 0',
    siteTitle: 'The Tower of STEM, Zone 0',
    siteCode: 'ZONE · 0',
    zoneName: 'Tower Zone 0',
    architectName: 'Louis Li',
    architectRole: '資訊科技碩士 · 全端開發',
    tagline: '軟體不是寫出來的，是建造出來的。',
    constructing: '建造中…',
    rollingDrawing: '收起中…',
    fallback: '2D 立面 · WebGL 不可用',
    floors: '樓層',
    hint: '在模型或左欄選擇樓層或房間。',
    themeDark: '夜間',
    themeLight: '日間',
    rollDrawing: '收起',
    printResume: 'RESUME',
  },
  stamp: {
    code: 'TOWER 0',
    name: 'LOUIS LI',
    rev: 'LEARNING IS CONSTRUCTION · REV A',
  },
  exit: {
    label: 'END OF SET',
    reopen: 'REOPEN THE TOWER',
  },
  floors: {
    B10: {
      title: '科技中心',
      subtitle: 'GitHub · 列印履歷',
      exhibitTitle: '科技中心 · B10',
      exhibitHook: '原始碼、部署產物、可列印履歷。',
    },
    B2: {
      title: '基礎設施',
      subtitle: '技能 · 課程 · 連結',
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
    welcome: '歡迎來到',
    thesis: '萬丈高樓平地起 · 學習即建造',
    bio: '全端開發者 · UTS 資訊科技碩士 · 雪梨。',
    degree: '學位',
    institution: '學校',
    wam: 'WAM',
    gpa: 'GPA',
    cp: '學分',
    hdCount: 'HD',
    deansList: '院長榮譽榜',
    program: '學程',
    location: '地點',
    experienceTitle: '經歷',
    hint: '從樓層導覽選擇 — 這座塔就是你的地圖。',
  },
  factory: {
    wam: 'WAM',
    cp: '學分',
    hd: '高級優等',
    d: '優等',
    avg: '平均',
    panelTitle: 'University of Technology Sydney · Master of Information Technology',
    panelFloor: '工廠 · 23F',
    selectArea: '在模型或左側面板選擇產線（Area 01–04）。',
    allAreas: '全部產線',
    overview: '四條學期產線並行 — 點選區域以拉近檢視。',
    completionLabel: 'UTS MIT COMPLETE',
  },
  lab: { intro: '本層五間專案房。', selectRoom: '在模型或左側面板選擇一間房。', role: '角色', team: '團隊', course: '課程' },
  infra: {
    skillsTitle: '技能 — 管線與機電',
    coursesTitle: '課程連結 → 專案',
    viewProject: '查看專案 ↗',
  },
  tech: {
    intro: '地下科技中心 — 程式庫、匯出、部署。',
    github: 'GitHub',
    githubDesc: 'louislibuilds — 開源專案與提交紀錄',
    nagi: 'bubblechickenlab',
    nagiDesc: '三應用生產平台 — nagi、KATA 編輯器、求職追蹤',
    kata: 'KATA 編輯器',
    kataDesc: '撰寫與匯出 PDF 履歷',
    print: '列印履歷',
    printDesc: '列印身份铭牌或使用 KATA 完整版',
    reposTitle: '精選 Repos',
    openProfile: '開啟 GitHub ↗',
    openNagi: '開啟網站 ↗',
    openKata: '開啟 KATA ↗',
    printNow: '立即列印',
  },
  library: {
    heroTitle: '圖書館 & 檔案室',
    heroTagline: '領導經歷 ‧ 證照 ‧ 成就',
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
    printResume: '列印履歷',
    linkLabels: {
      email: 'Email',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      portfolio: 'Portfolio',
      kata: 'KATA.app',
    },
    copy: '© {year} Louis Li · Tower 0',
  },
  projects: {
    'unihack-2026': {
      title: 'UniHack 2026 — Your Rock Is Coming',
      hook: '48 小時 MVP：地圖探索 + 7 日天氣預報。',
      role: '隊長 & 技術總監',
      team: '跨領域黑客松團隊',
    },
    'cloud-computing': {
      title: 'SUNishop — 雲端電商',
      hook: 'LAMP → MERN 遷移，CI 與 AWS Academy 部署。',
      role: '全端開發',
      course: '42904 (100 HD) · 42891 (95 HD)',
    },
    nlp: {
      title: 'Mock Interview Coach',
      hook: 'STT 模擬面試，STAR 框架 NLP 評分回饋。',
      role: '主要開發',
      course: '42850 NLP 演算法 (94 HD)',
    },
    dl: {
      title: 'VTuber 動作管線',
      hook: '即時姿態 → VRM 虛擬角色，MediaPipe + Kalidokit + CNN。',
      role: '軟體開發 · 產品化',
      team: 'Ko-Chun Liao, Junjie Niu',
      course: '42028 深度學習 & CNN (95 HD)',
    },
    kata: {
      title: 'KATA — 履歷 & 求職追蹤',
      hook: '統一求職平台：撰寫履歷、匯出 PDF、追蹤申請。',
      role: '獨立開發',
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
      body: '2026 年參加 Australia Career Forum (ACF) 導師計畫。與 Howard C. 定期會談，針對畢業求職策略、履歷修訂、面試準備與澳洲科技業市場 — 獲得務實、誠實、貼近真實申請的回饋。導師的價值不只是求職技巧：有人在旁提醒你可以成長、可以跌倒、可以再試一次，意義重大 — 包括在求職期間一起面對並命名 imposter syndrome。',
      credit: 'Peter Wei — 策劃計畫並建立導師與學員互相學習的空間。Howard C. — 履歷檢視、關鍵時刻的新視角，以及持續的鼓勵。',
    },
  },
  skillGroups: {
    Languages: '程式語言',
    Frontend: '前端',
    'Backend & Data': '後端 & 資料',
    'Cloud & DevOps': '雲端 & DevOps',
    'ML / AI': '機器學習 / AI',
  },
  platformApps: {
    nagi: { name: 'nagi', hook: '作品集即建築 — bubblechickenlab.com 多語 CMS。' },
    'kata-editor': { name: 'KATA 編輯器', hook: '履歷變體即時預覽與 PDF 匯出。' },
    'kata-tracker': { name: 'KATA 追蹤器', hook: '本地優先的求職申請追蹤。' },
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
    name: 'Tower Zone 0',
    siteTitle: 'The Tower of STEM, Zone 0',
    siteCode: 'ZONE · 0',
    zoneName: 'Tower Zone 0',
    architectName: 'Louis Li',
    architectRole: '情報工学修士 · フルスタック',
    tagline: 'ソフトウェアは書かれるのではない。組み立てられる。',
    constructing: '建造中…',
    rollingDrawing: 'セット終了中…',
    fallback: '2D 立面 · WebGL 不可',
    floors: '階',
    hint: 'モデルまたは左レールで階・部屋を選択。',
    themeDark: 'ナイト',
    themeLight: 'デイ',
    rollDrawing: 'セット終了',
    printResume: 'RESUME',
  },
  stamp: {
    code: 'TOWER 0',
    name: 'LOUIS LI',
    rev: 'LEARNING IS CONSTRUCTION · REV A',
  },
  exit: {
    label: 'END OF SET',
    reopen: 'REOPEN THE TOWER',
  },
  floors: {
    B10: {
      title: 'テックセンター',
      subtitle: 'GitHub · 履歴書印刷',
      exhibitTitle: 'テックセンター · B10',
      exhibitHook: 'ソース管理、デプロイ成果物、印刷可能な履歴書。',
    },
    B2: {
      title: 'インフラ',
      subtitle: 'スキル · コース · リンク',
      exhibitTitle: 'インフラ · B2',
      exhibitHook: '塔の下の立管、配管、回路基板。',
    },
    G: {
      title: 'ロビー',
      subtitle: 'ようこそ · プロフィール',
      exhibitTitle: 'ロビー · 地面',
      exhibitHook: 'テーゼの壁と地上階のアイデンティティプレート。',
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
      exhibitHook: '5つのプロジェクトルーム — ハッカソンから研究パイプラインまで。',
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
    welcome: 'ようこそ',
    thesis: '万丈高層は平地から起こる · 学びは建造である',
    bio: 'フルスタック開発者 · UTS 情報工学修士 · シドニー。',
    degree: '学位',
    institution: '大学',
    wam: 'WAM',
    gpa: 'GPA',
    cp: '単位',
    hdCount: 'HD',
    deansList: 'ディーンズリスト',
    program: 'プログラム',
    location: '所在地',
    experienceTitle: '経歴',
    hint: '左のレールから階を選択 — この塔が地図です。',
  },
  factory: {
    wam: 'WAM',
    cp: '単位',
    hd: 'High Distinction',
    d: 'Distinction',
    avg: '平均',
    panelTitle: 'University of Technology Sydney · Master of Information Technology',
    panelFloor: 'Factory · 23F',
    selectArea: 'モデルまたはレールで生産ライン（Area 01–04）を選択。',
    allAreas: 'すべての生産ライン',
    overview: '4学期のラインが並行 — エリアをクリックしてズーム。',
    completionLabel: 'UTS MIT COMPLETE',
  },
  lab: {
    intro: 'この階に5つのプロジェクトルーム。',
    selectRoom: 'モデルまたはレールでルームを選択。',
    role: '役割',
    team: 'チーム',
    course: 'コース',
  },
  infra: {
    skillsTitle: 'スキル — 立管と配管',
    coursesTitle: 'コースリンク → プロジェクト',
    viewProject: 'プロジェクトを見る ↗',
  },
  tech: {
    intro: '地下テックセンター — リポジトリ、エクスポート、デプロイ。',
    github: 'GitHub',
    githubDesc: 'louislibuilds — リポジトリ、コミット、オープンソース',
    nagi: 'bubblechickenlab',
    nagiDesc: '3アプリ本番プラットフォーム — nagi、KATA エディター、求人トラッカー',
    kata: 'KATA エディター',
    kataDesc: 'PDF エクスポート付き履歴書作成',
    print: '履歴書を印刷',
    printDesc: 'アイデンティティプレートを印刷、または KATA で完全版',
    reposTitle: '注目リポジトリ',
    openProfile: 'プロフィールを開く ↗',
    openNagi: 'サイトを開く ↗',
    openKata: 'KATA を開く ↗',
    printNow: '今すぐ印刷',
  },
  library: {
    heroTitle: '図書館 & アーカイブ',
    heroTagline: 'リーダーシップ ‧ 資格 ‧ 実績',
    archiveTitle: 'アーカイブ',
    archiveTagline: '資格 · 栄誉 · リーダーシップ',
    libraryTitle: '図書館',
    libraryTagline: 'プラットフォーム · 執筆 · プロジェクト',
    archiveIntro: '文書保管庫 — これまでに得た実績、評価、リーダーシップ。',
    libraryIntro: '出荷デスク — bubblechickenlab のツール、リポジトリ、進行中のビルド。',
    librarianTitle: '館長',
    featuredRole: 'Founder · Developer · Creator',
    featuredBullets: [
      'bubblechickenlab 名義の独立スタジオ — ソフトウェアとストーリーテリング、クラフトが交わるプロダクト・ポートフォリオ・ツールを構築。',
      'アイデアから公開まで一貫して担当：デザイン、エンジニアリング、デプロイ、そして発表物をめぐるナラティブ。',
    ],
    publicationsTitle: '著作',
    publications: {
      nagi: {
        title: 'NAGI · Portfolio',
        description: '自前ホストの個人サイト — ポートフォリオと文章をひとまとめに。',
      },
      kata: {
        title: 'KATA · Résumé & Tracker',
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
    printResume: '履歴書を印刷',
    linkLabels: {
      email: 'Email',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      portfolio: 'Portfolio',
      kata: 'KATA.app',
    },
    copy: '© {year} Louis Li · Tower 0',
  },
  projects: {
    'unihack-2026': {
      title: 'UniHack 2026 — Your Rock Is Coming',
      hook: '48時間 MVP：地図探索 + 7日間天気予報。',
      role: 'チームリード & テクニカルディレクター',
      team: 'クロスファンクショナルハッカソンチーム',
    },
    'cloud-computing': {
      title: 'SUNishop — クラウド E コマース',
      hook: 'LAMP → MERN 移行、CI と AWS Academy デプロイ。',
      role: 'フルスタック開発者',
      course: '42904 (100 HD) · 42891 (95 HD)',
    },
    nlp: {
      title: 'Mock Interview Coach',
      hook: 'STT 模擬面接、STAR フレームワーク NLP フィードバック。',
      role: 'リード開発者',
      course: '42850 NLP アルゴリズム (94 HD)',
    },
    dl: {
      title: 'VTuber モーションパイプライン',
      hook: 'リアルタイム姿勢 → VRM アバター、MediaPipe + Kalidokit + CNN。',
      role: 'ソフトウェア開発 · 製品化',
      team: 'Ko-Chun Liao, Junjie Niu',
      course: '42028 深層学習 & CNN (95 HD)',
    },
    kata: {
      title: 'KATA — 履歴書 & 求人トラッカー',
      hook: '統合求人プラットフォーム：履歴書作成、PDF エクスポート、応募追跡。',
      role: '単独開発者',
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
      body: '2024/08 – 2026/08 修了。96 単位中 HD 9 科目。Cloud Computing & SaaS、Infrastructure for Cloud Computing、Fundamentals of Software Development で LAMP→MERN EC を AWS + CI/CD へデプロイ。NLP Algorithms、Deep Learning & CNN で ML パイプラインを GitHub 公開。Project Management と Industry Project でクロスファンクショナルな計画、ステークホルダーコミュニケーション、チームリーダーシップ、期限下での協働デリバリーを強化。',
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
        '副会長 & 秘書（2025/06 – 2026/06）：イベント運営、ボランティア調整、対外連携、内部コミュニケーション',
        'コンサルタント（2026）：ガバナンス継続、幹部引き継ぎ、次期チームの中長期計画',
      ],
    },
    acf: {
      title: 'ACF メンタリングプログラム',
      detail: 'メンティ · メンター: Howard C. · 主催: Peter Wei',
      body: '2026 年に Australia Career Forum (ACF) メンタリングプログラムに参加。Howard C. との定期セッションで、新卒就職戦略、履歴書改善、面接準備、豪州テック市場への適応 — 実際の応募に即した実践的なフィードバックを得た。メンターシップはキャリア術だけではなく、成長・失敗・再挑戦を当たり前にしてくれる存在 — 求職中の imposter syndrome に向き合う支援も含め、大きな意味を持った。',
      credit: 'Peter Wei — プログラムを組織し、メンターとメンティが学び合う場を創出。Howard C. — 履歴書レビュー、必要な時の新しい視点、継続的な励まし。',
    },
  },
  skillGroups: {
    Languages: '言語',
    Frontend: 'フロントエンド',
    'Backend & Data': 'バックエンド & データ',
    'Cloud & DevOps': 'クラウド & DevOps',
    'ML / AI': 'ML / AI',
  },
  platformApps: {
    nagi: { name: 'nagi', hook: 'ポートフォリオ即建築 — bubblechickenlab.com 多言語 CMS。' },
    'kata-editor': { name: 'KATA エディター', hook: '履歴書バリアントのライブプレビューと PDF エクスポート。' },
    'kata-tracker': { name: 'KATA トラッカー', hook: 'ローカルファーストの求人応募トラッカー。' },
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
