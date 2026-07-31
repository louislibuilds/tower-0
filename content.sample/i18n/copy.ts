import type { SiteCopyLocales } from '../../src/i18n/copyTypes'

/**
 * Public sample — Louis Li author identity & contact; no real grades, cert scans,
 * or mark-heavy credential narrative (those live in gitignored content/).
 */
export const SITE_COPY: SiteCopyLocales = {
  'en': {
    site: { siteCode: 'bubblechickenlab · Louis Li present', architectName: 'Louis Li' },
    stamp: {
    code: 'TOWER 0',
    name: 'LOUIS LI',
  },
    lobby: { motto: 'Rome wasn\'t built in a day — neither is good software.', floorIntro: 'I build systems the way architects build towers — structure first, then the rooms that tell the story.' },
    factory: {
      panelTitle: 'University of Technology Sydney · Master of Information Technology',
      completionLabel: 'PROGRAM COMPLETE',
      tsaCertTitle: 'Certificate · Leadership / Service',
      deansListCertTitle: 'Certificate · Academic Honor',
      degreeCertTitle: 'Certificate · Degree',
    },
    infra: { softSkillGroups: [
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
    ] },
    library: {
      featuredRole: 'Founder · Developer · Creator',
      featuredBullets: [
      'Independent practice under bubblechickenlab — products, portfolios, and tools where software meets storytelling and craft.',
      'Full-stack ownership from idea to ship: design, engineering, deployment, and the narrative around what gets published.',
    ],
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
      role: 'Full-stack Developer'
    },
    nlp: {
      title: 'Mock Interview Coach',
      hook: 'STT → structured STAR scoring → feedback. Hybrid LLM + deterministic mock so demos always run.',
      body: 'Self-practice interviews lack immediate, structured feedback — STAR evidence, fluency, filler words. Recording and replaying is slow and hard to quantify.\n\nWizard flow: record → faster-whisper STT → preprocess → /v1/score. With OPENAI_API_KEY, LLM JSON scoring; otherwise deterministic NLP mock (keywords, structure, fluency, evidence). LLM failures fall back to mock so demos stay reproducible.\n\nBuilt end-to-end: FastAPI + faster-whisper, NLP mock engine, React wizard with score breakdown UI, EN/zh-TW docs. (NLP Algorithms, 42850). The lesson that stuck: measure, validate, document — not just pick a model.',
      role: 'Lead Developer'
    },
    dl: {
      title: 'VTuber MoCap',
      hook: 'Browser VTuber motion capture: webcam → MediaPipe → Kalidokit → VRM. TechFest 2026 showcase · .',
      body: 'Deep Learning & CNN (42028) — real-time pose capture driving a VRM avatar entirely in the browser. Open localhost, allow camera, run the full pipeline.\n\nWebcam → MediaPipe Holistic → Kalidokit (head, arms, finger curl) → three.js + @pixiv/three-vrm retarget. Optional gesture CNN (ONNX) for throttled browser classification.\n\nOwned browser pipeline productization: ESM import maps, CDN deps, camera permissions, EN/zh-TW docs for a stable TechFest demo. Final grade: . Nominated to UTS TechFest 2026 AI Showcase (Dr. Nabin Sharma). CV pipelines fail quietly before models fail loudly — smoothing and browser constraints matter as much as the network.',
      role: 'Software Dev · Productization · Team Coordination (Team of 3)',
      team: 'Ko-Chun Liao (concept & framework), Junjie Niu (experiments)'
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
      degree: {
        title: 'Master of Information Technology',
        detail: 'Program · credit points · add public summary if desired',
        body: 'Graduation summary — coursework themes and skills gained. Detailed marks and cert scans belong in gitignored content/.',
      },
      award: {
        title: 'Sample Honor or Award',
        detail: 'Issuer · year',
        body: 'Public-safe credential blurb — replace when forking.',
      },
    },
  },
  'zh-TW': {
    site: { siteCode: 'bubblechickenlab · Louis Li present', architectName: 'Louis Li' },
    stamp: {
    code: 'TOWER 0',
    name: 'LOUIS LI',
  },
    lobby: { motto: '萬丈高樓平地起 — 一磚一瓦，皆為根基。', floorIntro: '我用蓋樓的方式寫軟體——先承重結構，再讓每層有自己的故事。' },
    factory: {
      panelTitle: 'University of Technology Sydney · Master of Information Technology',
      completionLabel: 'PROGRAM COMPLETE',
      tsaCertTitle: 'Certificate · Leadership / Service',
      deansListCertTitle: 'Certificate · Academic Honor',
      degreeCertTitle: 'Certificate · Degree',
    },
    infra: { softSkillGroups: [
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
    ] },
    library: {
      featuredRole: '創辦人 · 開發者 · 創作者',
      featuredBullets: [
      '以 bubblechickenlab 為名的獨立工作室 — 在軟體、敘事與工藝的交會處，打造產品、作品集與工具。',
      '從構想到上線全責：設計、工程、部署，以及圍繞每次發佈的敘事與迭代。',
    ],
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
      role: '全端開發'
    },
    nlp: {
      title: 'Mock Interview Coach',
      hook: 'STT → STAR 結構化評分 → 回饋。LLM + 離線 mock 混合，demo 永遠跑得通。',
      body: '自練面試缺的不是題庫，而是講完之後立刻知道哪裡弱——STAR 結構、證據、語速與填充詞。錄影回放 feedback 慢，也難量化。\n\nWizard 流程：錄音 → faster-whisper STT → 前處理 → /v1/score。有 OPENAI_API_KEY 走 LLM JSON 評分；否則 deterministic NLP mock（keywords、structure、fluency、evidence）。LLM 失敗自動 fallback mock，demo 可重現。\n\nEnd-to-end：FastAPI + faster-whisper、NLP mock engine、React wizard 與 score breakdown UI，EN/zh-TW 文件。Assessment 3 最終 （NLP Algorithms, 42850）。這門課教我的：NLP 落地要先能 measure、validate、document。',
      role: '主要開發'
    },
    dl: {
      title: 'VTuber MoCap',
      hook: '瀏覽器 VTuber 動捕：webcam → MediaPipe → Kalidokit → VRM。TechFest 2026 展示 · 。',
      body: 'Deep Learning & CNN（42028）——在瀏覽器內完成即時動作捕捉並驅動 VRM 虛擬角色。打開 localhost、允許相機，就能 demo 完整 pipeline。\n\nWebcam → MediaPipe Holistic → Kalidokit（頭、手臂、手指 curl）→ three.js + @pixiv/three-vrm retarget。可選手勢 CNN（ONNX）在瀏覽器做 throttled 分類。\n\n負責 browser pipeline 產品化：ESM import map、CDN 依賴、相機權限、EN/zh-TW 文件，讓 TechFest 當天穩定展示。最終 ；獲 Dr. Nabin Sharma 提名 UTS TechFest 2026 AI Showcase。CV pipeline 常常比模型更早、更安靜地壞掉——smoothing 與瀏覽器限制和網路一樣重要。',
      role: '軟體開發 · 產品化 · 團隊協調（三人團隊）',
      team: 'Ko-Chun Liao（構想與框架）、Junjie Niu（實驗設計）'
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
      degree: {
        title: '資訊科技碩士',
        detail: '學程 · 學分 · 可填公開摘要',
        body: '畢業摘要 — 修課主軸與能力。詳細成績與證書掃描請放在 gitignored 的 content/。',
      },
      award: {
        title: '範例榮譽或獎項',
        detail: '頒發單位 · 年份',
        body: '可公開的證照摘要 — fork 時請替換成你自己的內容。',
      },
    },
  },
  'ja': {
    site: { siteCode: 'bubblechickenlab · Louis Li present', architectName: 'Louis Li' },
    stamp: {
    code: 'TOWER 0',
    name: 'LOUIS LI',
  },
    lobby: { motto: '高い塔は、一階から。良いソフトウェアも、一行から。', floorIntro: '建築のようにシステムを組み立てる — 構造を先に、物語を語る部屋を後に。' },
    factory: {
      panelTitle: 'University of Technology Sydney · Master of Information Technology',
      completionLabel: 'PROGRAM COMPLETE',
      tsaCertTitle: 'Certificate · Leadership / Service',
      deansListCertTitle: 'Certificate · Academic Honor',
      degreeCertTitle: 'Certificate · Degree',
    },
    infra: { softSkillGroups: [
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
    ] },
    library: {
      featuredRole: '創設者 · 開発者 · クリエイター',
      featuredBullets: [
      'bubblechickenlab 名義の独立スタジオ — ソフトウェアとストーリーテリング、クラフトが交わるプロダクト・ポートフォリオ・ツールを構築。',
      'アイデアから公開まで一貫して担当：デザイン、エンジニアリング、デプロイ、そして発表物をめぐるナラティブ。',
    ],
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
      role: 'フルスタック開発者'
    },
    nlp: {
      title: 'Mock Interview Coach',
      hook: 'STT → STAR 構造化スコア → フィードバック。LLM + オフライン mock でデモは常に再現可能。',
      body: '独学面接に足りないのは題集ではなく、話した直後の構造化フィードバック — STAR 証拠、流暢さ、フィラー語。録画の再生は遅く、定量化も難しい。\n\nWizard：録音 → faster-whisper STT → 前処理 → /v1/score。OPENAI_API_KEY があれば LLM JSON 採点、なければ deterministic NLP mock。LLM 失敗時は mock に fallback。\n\nFastAPI + faster-whisper、NLP mock engine、React wizard、EN/zh-TW ドキュメントを end-to-end で構築。Assessment 3：（NLP Algorithms, 42850）。measure、validate、document — モデル選び以上に残った教訓。',
      role: 'リード開発者'
    },
    dl: {
      title: 'VTuber MoCap',
      hook: 'ブラウザ VTuber モーキャプ：webcam → MediaPipe → Kalidokit → VRM。TechFest 2026 · 。',
      body: 'Deep Learning & CNN（42028）— ブラウザ内リアルタイム pose capture で VRM アバターを駆動。localhost を開き、カメラ許可で pipeline 全体を demo。\n\nWebcam → MediaPipe Holistic → Kalidokit → three.js + @pixiv/three-vrm。任意で gesture CNN（ONNX）をブラウザで throttled 分類。\n\nbrowser pipeline の製品化：ESM import map、CDN、カメラ権限、TechFest 向け EN/zh-TW ドキュメント。最終 。UTS TechFest 2026 AI Showcase ノミネート（Dr. Nabin Sharma）。CV pipeline はモデルより先に、静かに壊れる — smoothing とブラウザ制約が同じくらい重要。',
      role: 'ソフトウェア開発 · 製品化 · チーム調整（3名）',
      team: 'Ko-Chun Liao（構想・フレームワーク）、Junjie Niu（実験設計）'
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
      degree: {
        title: '情報工学修士',
        detail: 'プログラム · 単位 · 公開する場合は概要のみ',
        body: '卒業サマリー — 履修テーマとスキル。詳細な成績と証書スキャンは gitignored の content/ へ。',
      },
      award: {
        title: 'サンプル表彰・受賞',
        detail: '授与機関 · 年',
        body: '公開してよい資格の概要 — fork 時に差し替え。',
      },
    },
  },
}
