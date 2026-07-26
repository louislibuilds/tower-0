export type Locale = 'en' | 'zh-TW' | 'zh-CN'
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
    selectArea: string
    allAreas: string
    overview: string
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
    hero: string
    heroSub: string
    archiveTitle: string
    libraryTitle: string
    archiveIntro: string
    libraryIntro: string
    selectRoom: string
    experienceTitle: string
  }
  roof: {
    site: string
    footer: string
    copy: string
  }
  projects: Record<
    string,
    { title: string; hook: string; role: string; team?: string; course?: string }
  >
  credentials: Record<string, { title: string; detail?: string }>
  skillGroups: Record<string, string>
  platformApps: Record<string, { name: string; hook: string }>
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
    rollingDrawing: 'Rolling drawing…',
    fallback: '2D plan view',
    floors: 'FLOORS',
    hint: 'Select a room on the model',
    themeDark: 'Night',
    themeLight: 'Day',
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
      exhibitTitle: 'Roof · Contact',
      exhibitHook: 'Identity plate under open sky.',
    },
  },
  lobby: {
    welcome: 'Welcome to',
    thesis: 'Software is not written. It is constructed.',
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
    selectArea: 'Select a production line (Area 01–04) on the model or rail.',
    allAreas: 'All production lines',
    overview: 'Four semester lines run parallel — click an area to zoom in.',
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
    hero: 'Archive & Library',
    heroSub: 'Master of Information Technology · UTS · WAM 86.9',
    archiveTitle: 'Archive',
    libraryTitle: 'Library',
    archiveIntro: 'Plan chest of credentials — degrees, dean\'s list, leadership, certificates.',
    libraryIntro: 'Reading desk — bubblechickenlab platform, writing, and side projects.',
    selectRoom: 'Select Archive or Library on the model or rail.',
    experienceTitle: 'Leadership & Platform',
  },
  roof: {
    site: 'SITE · TOWER 0',
    footer: 'Software is not written. It is constructed.',
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
    'deans-list': { title: "Dean's List 2026", detail: 'UTS Faculty of Engineering & IT' },
    degree: { title: 'Master of Information Technology', detail: 'C04295 · 96 CP · WAM 86.9' },
    techfest: { title: 'TechFest AI Showcase Nominee', detail: 'VTuber Motion Pipeline' },
    'tsa-founder': { title: 'UTS TSA — Co-founder', detail: '1,000+ followers' },
    'tsa-vp': { title: 'Vice President & Secretary', detail: 'Jun 2025 – Jun 2026' },
    'tsa-consultant': { title: 'Consultant', detail: 'UTS TSA advisory' },
    acf: { title: 'ACF Mentoring Program', detail: 'Australia Career Forum · 2026' },
  },
  skillGroups: {
    Languages: 'Languages',
    Frontend: 'Frontend',
    'Backend & Data': 'Backend & Data',
    'Cloud & DevOps': 'Cloud & DevOps',
    'ML / AI': 'ML / AI',
  },
  platformApps: {
    nagi: { name: 'nagi', hook: 'Portfolio-as-architecture — trilingual CMS on bubblechickenlab.com.' },
    'kata-editor': { name: 'KATA Editor', hook: 'Résumé variants with live preview and PDF export.' },
    'kata-tracker': { name: 'KATA Tracker', hook: 'Local-first job application tracker.' },
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
    rollingDrawing: '收圖中…',
    fallback: '2D 平面圖',
    floors: '樓層',
    hint: '在模型上選擇一個房間',
    themeDark: '夜間',
    themeLight: '日間',
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
      exhibitTitle: '屋頂 · 聯絡',
      exhibitHook: '開闊天空下的身份铭牌。',
    },
  },
  lobby: {
    welcome: '歡迎來到',
    thesis: '軟體不是寫出來的，是建造出來的。',
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
    selectArea: '在模型或左側面板選擇產線（Area 01–04）。',
    allAreas: '全部產線',
    overview: '四條學期產線並行 — 點選區域以拉近檢視。',
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
    hero: '檔案室 & 圖書館',
    heroSub: '資訊科技碩士 · UTS · WAM 86.9',
    archiveTitle: '檔案室',
    libraryTitle: '圖書館',
    archiveIntro: '證書抽屜 — 學位、院長榮譽榜、領導經歷、證照。',
    libraryIntro: '閱讀桌 — bubblechickenlab 平台、寫作與 side projects。',
    selectRoom: '在模型或左側面板選擇檔案室或圖書館。',
    experienceTitle: '領導 & 平台',
  },
  roof: {
    site: 'SITE · TOWER 0',
    footer: '軟體不是寫出來的，是建造出來的。',
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
    'deans-list': { title: '院長榮譽榜 2026', detail: 'UTS 工程與資訊科技學院' },
    degree: { title: '資訊科技碩士', detail: 'C04295 · 96 學分 · WAM 86.9' },
    techfest: { title: 'TechFest AI 展示提名', detail: 'VTuber 動作管線專案' },
    'tsa-founder': { title: 'UTS 台灣學生會 — 共同創辦人', detail: '1,000+ 追蹤者' },
    'tsa-vp': { title: '副會長 & 秘書', detail: '2025/06 – 2026/06' },
    'tsa-consultant': { title: '顧問', detail: 'UTS TSA 營運諮詢' },
    acf: { title: 'ACF 導師計畫', detail: 'Australia Career Forum · 2026' },
  },
  skillGroups: {
    Languages: '程式語言',
    Frontend: '前端',
    'Backend & Data': '後端 & 資料',
    'Cloud & DevOps': '雲端 & DevOps',
    'ML / AI': '機器學習 / AI',
  },
  platformApps: {
    nagi: { name: 'nagi', hook: '作品集即建築 — bubblechickenlab.com 三語 CMS。' },
    'kata-editor': { name: 'KATA 編輯器', hook: '履歷變體即時預覽與 PDF 匯出。' },
    'kata-tracker': { name: 'KATA 追蹤器', hook: '本地優先的求職申請追蹤。' },
  },
}

const zhCN: LocaleStrings = {
  ...zhTW,
  site: {
    ...zhTW.site,
    siteTitle: 'The Tower of STEM, Zone 0',
    architectRole: '信息技术硕士 · 全栈开发',
    hint: '在模型上选择一个房间',
  },
  floors: {
    B10: { title: '科技中心', subtitle: 'GitHub · 打印简历', exhibitTitle: '科技中心 · B10', exhibitHook: '源代码、部署产物、可打印简历。' },
    B2: { title: '基础设施', subtitle: '技能 · 课程 · 链接', exhibitTitle: '基础设施 · B2', exhibitHook: '塔楼下的管线、机电井与电路板。' },
    G: { title: '大厅', subtitle: '欢迎 · 关于', exhibitTitle: '大厅 · 地面', exhibitHook: '论述墙与地面层的身份铭牌。' },
    '23': { title: '工厂', subtitle: '产线 · 成绩', exhibitTitle: '工厂 · 23F', exhibitHook: '四条学期产线 — 成绩、等级、里程碑。' },
    '52': { title: '实验室', subtitle: '团队项目', exhibitTitle: '实验室 · 52F', exhibitHook: '五间项目房 — 从黑客松到研究管线。' },
    '99': { title: '图书馆 & 档案室', subtitle: '奖项 · 证书', exhibitTitle: '图书馆 · 99F', exhibitHook: '学位、院长荣誉榜、领导经历、证书。' },
    roof: { title: '屋顶', subtitle: '联系', exhibitTitle: '屋顶 · 联系', exhibitHook: '开阔天空下的身份铭牌。' },
  },
  lobby: {
    ...zhTW.lobby,
    thesis: '软件不是写出来的，是建造出来的。',
    bio: '全栈开发者 · UTS 信息技术硕士 · 悉尼。',
    hint: '从楼层导览选择 — 这座塔就是你的地图。',
    deansList: '院长荣誉榜',
    experienceTitle: '经历',
  },
  factory: { ...zhTW.factory, selectArea: '在模型或左侧面板选择产线（Area 01–04）。', allAreas: '全部产线', overview: '四条学期产线并行 — 点击区域以拉近查看。' },
  lab: { intro: '本层五间项目房。', selectRoom: '在模型或左侧面板选择一间房。', role: '角色', team: '团队', course: '课程' },
  infra: { skillsTitle: '技能 — 管线与机电', coursesTitle: '课程链接 → 项目', viewProject: '查看项目 ↗' },
  tech: {
    ...zhTW.tech,
    intro: '地下科技中心 — 代码库、导出、部署。',
    print: '打印简历',
    printDesc: '打印身份铭牌或使用 KATA 完整版',
    openProfile: '打开 GitHub ↗',
    openNagi: '打开网站 ↗',
    printNow: '立即打印',
  },
  library: {
    ...zhTW.library,
    archiveTitle: '档案室',
    libraryTitle: '图书馆',
    archiveIntro: '证书抽屉 — 学位、院长荣誉榜、领导经历、证照。',
    libraryIntro: '阅读桌 — bubblechickenlab 平台、写作与 side projects。',
    selectRoom: '在模型或左侧面板选择档案室或图书馆。',
    experienceTitle: '领导 & 平台',
  },
  roof: { ...zhTW.roof, footer: '软件不是写出来的，是建造出来的。' },
  projects: {
    'unihack-2026': { ...zhTW.projects['unihack-2026'], hook: '48 小时 MVP：地图探索 + 7 日天气预报。', role: '队长 & 技术总监', team: '跨领域黑客松团队' },
    'cloud-computing': { ...zhTW.projects['cloud-computing'], title: 'SUNishop — 云端电商', hook: 'LAMP → MERN 迁移，CI 与 AWS Academy 部署。', role: '全端开发' },
    nlp: { ...zhTW.projects.nlp, hook: 'STT 模拟面试，STAR 框架 NLP 评分反馈。', role: '主要开发', course: '42850 NLP 算法 (94 HD)' },
    dl: { ...zhTW.projects.dl, title: 'VTuber 动作管线', hook: '实时姿态 → VRM 虚拟角色，MediaPipe + Kalidokit + CNN。', role: '软件开发 · 产品化' },
    kata: { ...zhTW.projects.kata, title: 'KATA — 简历 & 求职追踪', hook: '统一求职平台：撰写简历、导出 PDF、追踪申请。', role: '独立开发' },
  },
  credentials: {
    'deans-list': { title: '院长荣誉榜 2026', detail: 'UTS 工程与信息技术学院' },
    degree: { title: '信息技术硕士', detail: 'C04295 · 96 学分 · WAM 86.9' },
    techfest: { title: 'TechFest AI 展示提名', detail: 'VTuber 动作管线项目' },
    'tsa-founder': { title: 'UTS 台湾学生会 — 共同创办人', detail: '1,000+ 追踪者' },
    'tsa-vp': { title: '副会长 & 秘书', detail: '2025/06 – 2026/06' },
    'tsa-consultant': { title: '顾问', detail: 'UTS TSA 运营咨询' },
    acf: { title: 'ACF 导师计划', detail: 'Australia Career Forum · 2026' },
  },
  skillGroups: {
    Languages: '编程语言',
    Frontend: '前端',
    'Backend & Data': '后端 & 数据',
    'Cloud & DevOps': '云端 & DevOps',
    'ML / AI': '机器学习 / AI',
  },
  platformApps: {
    nagi: { name: 'nagi', hook: '作品集即建筑 — bubblechickenlab.com 三语 CMS。' },
    'kata-editor': { name: 'KATA 编辑器', hook: '简历变体即时预览与 PDF 导出。' },
    'kata-tracker': { name: 'KATA 追踪器', hook: '本地优先的求职申请追踪。' },
  },
}

export const STRINGS: Record<Locale, LocaleStrings> = { en, 'zh-TW': zhTW, 'zh-CN': zhCN }

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'EN',
  'zh-TW': '繁',
  'zh-CN': '简',
}
