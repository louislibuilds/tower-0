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

import { SITE_COPY } from '@site-content/i18n/copy'
import type { SiteCopy } from './copyTypes'

function mergeSiteCopy(
  base: Omit<LocaleStrings, 'projects' | 'credentials'>,
  copy: SiteCopy,
): LocaleStrings {
  return {
    ...base,
    site: { ...base.site, siteCode: copy.site.siteCode, architectName: copy.site.architectName },
    stamp: copy.stamp,
    lobby: { ...base.lobby, motto: copy.lobby.motto, floorIntro: copy.lobby.floorIntro },
    factory: {
      ...base.factory,
      panelTitle: copy.factory.panelTitle,
      completionLabel: copy.factory.completionLabel,
      tsaCertTitle: copy.factory.tsaCertTitle,
      deansListCertTitle: copy.factory.deansListCertTitle,
      degreeCertTitle: copy.factory.degreeCertTitle,
    },
    infra: { ...base.infra, softSkillGroups: copy.infra.softSkillGroups },
    library: {
      ...base.library,
      featuredRole: copy.library.featuredRole,
      featuredBullets: copy.library.featuredBullets,
      publications: copy.library.publications,
    },
    projects: copy.projects,
    credentials: copy.credentials,
  }
}

const enBase = {
  site: {
    siteTitle: 'The Tower of STEM, Zone 0',
    siteCode: 'your-brand · Your Name present',
    architectName: 'Your Name',
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
    name: 'YOUR NAME',
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
    motto: 'Your motto — one line that sets the tone.',
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
    floorIntro: 'Your positioning paragraph — how you describe what you build.',
    panelTitle: 'Your University · Your Degree',
    panelFloor: 'Factory · 23F',
    selectArea: 'Select a line on the model or rail — Area 01–04.',
    allAreas: 'All production lines',
    overview: 'Four semester lines run parallel — click an area to zoom in.',
    completionLabel: 'PROGRAM COMPLETE',
    tsaCertTitle: 'Certificate · Recognition',
    deansListCertTitle: 'Certificate · Academic Honor',
    degreeCertTitle: 'Certificate · Degree',
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
    featuredRole: 'Your Role Title',
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
  focus: {
    panelHint: 'Focus detail · side panel',
    back: 'Back to room',
    backToArchive: 'Back to Archive',
    backToLibrary: 'Back to Library',
    bookOpen: 'Open link ↗',
    credentialEyebrow: 'Archive · credential',
  },
} satisfies Omit<LocaleStrings, 'projects' | 'credentials'>

const zhTWBase = {
  site: {
    siteTitle: 'The Tower of STEM, Zone 0',
    siteCode: 'your-brand · Your Name present',
    architectName: 'Your Name',
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
    name: 'YOUR NAME',
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
    motto: 'Your motto — one line that sets the tone.',
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
    floorIntro: 'Your positioning paragraph — how you describe what you build.',
    panelTitle: 'Your University · Your Degree',
    panelFloor: '工廠 · 23F',
    selectArea: '在模型或左側導覽選擇產線 — Area 01–04。',
    allAreas: '全部產線',
    overview: '四條學期產線並行 — 點選區域以拉近檢視。',
    completionLabel: 'PROGRAM COMPLETE',
    tsaCertTitle: 'Certificate · Recognition',
    deansListCertTitle: 'Certificate · Academic Honor',
    degreeCertTitle: 'Certificate · Degree',
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
    featuredRole: 'Your Role Title',
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
  focus: {
    panelHint: '特寫詳情 · 右側面板',
    back: '返回房間',
    backToArchive: '返回檔案室',
    backToLibrary: '返回圖書館',
    bookOpen: '開啟連結 ↗',
    credentialEyebrow: '檔案室 · 證書',
  },
} satisfies Omit<LocaleStrings, 'projects' | 'credentials'>

const jaBase = {
  site: {
    siteTitle: 'The Tower of STEM, Zone 0',
    siteCode: 'your-brand · Your Name present',
    architectName: 'Your Name',
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
    name: 'YOUR NAME',
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
    motto: 'Your motto — one line that sets the tone.',
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
    floorIntro: 'Your positioning paragraph — how you describe what you build.',
    panelTitle: 'Your University · Your Degree',
    panelFloor: 'ファクトリー · 23F',
    selectArea: 'モデルまたはレールでラインを選択 — Area 01–04。',
    allAreas: 'すべての生産ライン',
    overview: '4学期のラインが並行 — エリアをクリックしてズーム。',
    completionLabel: 'PROGRAM COMPLETE',
    tsaCertTitle: 'Certificate · Recognition',
    deansListCertTitle: 'Certificate · Academic Honor',
    degreeCertTitle: 'Certificate · Degree',
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
    featuredRole: 'Your Role Title',
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
  focus: {
    panelHint: 'フォーカス詳細 · サイドパネル',
    back: 'ルームに戻る',
    backToArchive: 'アーカイブに戻る',
    backToLibrary: '図書館に戻る',
    bookOpen: 'リンクを開く ↗',
    credentialEyebrow: 'アーカイブ · 資格',
  },
} satisfies Omit<LocaleStrings, 'projects' | 'credentials'>

const en = mergeSiteCopy(enBase, SITE_COPY.en)
const zhTW = mergeSiteCopy(zhTWBase, SITE_COPY['zh-TW'])
const ja = mergeSiteCopy(jaBase, SITE_COPY.ja)

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
