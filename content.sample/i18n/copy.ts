import type { SiteCopyLocales } from '../../src/i18n/copyTypes'

/**
 * Public fork template — author credit on site/stamp; B10/Roof contact via profile.ts.
 * Everything else is placeholder copy with suggested writing patterns.
 * Replace via `npm run content:init` → edit content/i18n/copy.ts
 */
export const SITE_COPY: SiteCopyLocales = {
  en: {
    site: { siteCode: 'bubblechickenlab · Louis Li present', architectName: 'Louis Li' },
    stamp: { code: 'TOWER 0', name: 'LOUIS LI' },
    lobby: {
      motto: 'Replace in content/i18n/copy.ts — a short motto for the Lobby wall.',
      floorIntro:
        'Suggested: one sentence on how you build — structure first, then the story. Example pattern: "I build systems like architects build towers — load-bearing boundaries, then rooms that tell the story."',
    },
    factory: {
      panelTitle: 'Your University · Your Program',
      completionLabel: 'PROGRAM COMPLETE',
      tsaCertTitle: 'Certificate · Leadership / Service',
      deansListCertTitle: 'Certificate · Academic Honor',
      degreeCertTitle: 'Certificate · Degree',
      highlights: [
        { project: 'Sample Course H — your latest semester theme', takeaway: 'One takeaway — what you learned or built' },
        { project: 'Sample Course E/F — mid-program focus', takeaway: 'Edit in content/i18n/copy.ts → factory.highlights' },
        { project: 'Sample Course C/D — foundations', takeaway: 'Suggested: course cluster + skill gained' },
        { project: 'Sample Course A/B — first semester', takeaway: 'How you started the program' },
      ],
    },
    infra: {
      softSkillGroups: [
        {
          category: 'Communication',
          items: ['English', 'Your other languages', 'Technical writing — edit in content/i18n/copy.ts'],
        },
        {
          category: 'Delivery',
          items: ['End-to-end ownership', 'Agile / deadline-driven delivery'],
        },
      ],
    },
    library: {
      featuredRole: 'Your headline role · e.g. Developer · Designer',
      featuredBullets: [
        'Bullet 1 — what you publish or maintain (portfolio, blog, open source).',
        'Bullet 2 — scope you own: design → ship → iterate.',
      ],
      publications: {
        portfolio: {
          title: 'Portfolio',
          description: 'Link title & one-line blurb — edit in content/i18n/copy.ts',
        },
        github: {
          title: 'GitHub',
          description: 'your-handle',
        },
        linkedin: {
          title: 'LinkedIn',
          description: 'linkedin.com/in/your-handle',
        },
      },
    },
    projects: {
      'sample-project': {
        title: 'Sample Project',
        hook: 'One-line hook — problem, stack, or outcome.',
        body: 'Suggested structure:\n\n1. Context — who had the problem and why it mattered.\n2. What you built — architecture, stack, key decisions.\n3. Outcome — metric, demo, or lesson learned.\n\nReplace this block in content/i18n/copy.ts. Keep course marks private in content/ if you prefer.',
        role: 'Your Role',
        team: 'Optional — teammate names & roles',
        course: 'Optional — course code if academic project',
        credit: 'Optional — teammates, advisors, open-source credits.',
      },
      'tower-zero': {
        title: 'Tower Zero',
        hook: 'Walk-in 3D portfolio template — each floor is one résumé chapter.',
        body: 'G Lobby — intro. B2 Infrastructure — skills. 23 Factory — education. 52 Laboratory — projects. 99 Library & Archive — credentials & publications. B10 Tech Centre — social links. R Roof — contact.\n\nFork this repo, run `npm run content:init`, then fill content/ with your data and copy.',
        role: 'Template by Louis Li',
        credit: 'salieri009/resume2 (SITE 009) — navigation & HUD patterns. Visual system original to Tower Zero.',
      },
    },
    credentials: {
      degree: {
        title: 'Your Degree',
        detail: 'Program · credit points · optional public WAM/GPA',
        body: 'Graduation summary — themes, highlights, skills gained. Do not commit cert scans to the public repo; use content/assets/factory/ in your private deploy.',
      },
      'certificate-a': {
        title: 'Your Certificate or Honor',
        detail: 'Issuing body · year',
        body: 'Describe what this credential represents. Add matching PNG/PDF in content/assets/factory/ (gitignored).',
        bullets: ['Optional bullet for multi-line achievements.'],
      },
      'certificate-b': {
        title: 'Another Certificate (optional)',
        detail: 'e.g. leadership · service · competition',
        body: 'Add or remove credential keys to match content/data/credentials.ts.',
      },
    },
  },
  'zh-TW': {
    site: { siteCode: 'bubblechickenlab · Louis Li present', architectName: 'Louis Li' },
    stamp: { code: 'TOWER 0', name: 'LOUIS LI' },
    lobby: {
      motto: '請在 content/i18n/copy.ts 替換 — 大廳牆上的短標語。',
      floorIntro:
        '建議寫法：一句話描述你怎麼做軟體。例：「我用蓋樓的方式寫程式 — 先承重結構，再讓每層有自己的故事。」',
    },
    factory: {
      panelTitle: '你的學校 · 你的科系',
      completionLabel: 'PROGRAM COMPLETE',
      tsaCertTitle: '證書 · 領導／服務',
      deansListCertTitle: '證書 · 學術榮譽',
      degreeCertTitle: '證書 · 學位',
      highlights: [
        { project: '這裡放最新學期主題課程', takeaway: '一句 takeaway — 你學到了什麼' },
        { project: '這裡放中期學期課程群', takeaway: '在 content/i18n/copy.ts → factory.highlights 編輯' },
        { project: '這裡放基礎學期課程', takeaway: '建議：課程組合 + 能力收穫' },
        { project: '這裡放入學第一學期', takeaway: '你如何開始這段學程' },
      ],
    },
    infra: {
      softSkillGroups: [
        {
          category: '溝通',
          items: ['英語', '其他語言', '技術寫作 — 在 content/i18n/copy.ts 編輯'],
        },
        {
          category: '交付',
          items: ['端到端負責', '敏捷／期限導向交付'],
        },
      ],
    },
    library: {
      featuredRole: '你的標題角色 · 例：開發者 · 設計師',
      featuredBullets: [
        '要點 1 — 你維護或發佈的內容（作品集、部落格、開源）。',
        '要點 2 — 你負責的範圍：設計 → 上線 → 迭代。',
      ],
      publications: {
        portfolio: {
          title: '作品集',
          description: '連結標題與一行描述 — 在 content/i18n/copy.ts 編輯',
        },
        github: {
          title: 'GitHub',
          description: 'your-handle',
        },
        linkedin: {
          title: 'LinkedIn',
          description: 'linkedin.com/in/your-handle',
        },
      },
    },
    projects: {
      'sample-project': {
        title: '範例專案',
        hook: '一行 hook — 問題、技術棧或成果。',
        body: '建議結構：\n\n1. 背景 — 誰有什麼問題、為什麼重要。\n2. 你做了什麼 — 架構、技術選型、關鍵決策。\n3. 成果 — 數據、demo 或學到的教訓。\n\n在 content/i18n/copy.ts 替換此段。成績細節建議放在 gitignored 的 content/。',
        role: '你的角色',
        team: '選填 — 隊友姓名與分工',
        course: '選填 — 若為課程專案可填課號',
        credit: '選填 — 隊友、指導老師、開源致謝。',
      },
      'tower-zero': {
        title: 'Tower Zero',
        hook: '可走進去的 3D 履歷模板 — 每層對應履歷的一章。',
        body: 'G 大廳 — 簡介。B2 基礎設施 — 技能。23F 工廠 — 學歷。52F 實驗室 — 專案。99F 圖書館 — 證書與出版。B10 科技中心 — 社群連結。R 屋頂 — 聯絡方式。\n\nFork 後執行 `npm run content:init`，在 content/ 填入你的資料與文案。',
        role: '模板作者 Louis Li',
        credit: 'salieri009/resume2（SITE 009）— 導覽與 HUD 模式。視覺系統為 Tower Zero 原創。',
      },
    },
    credentials: {
      degree: {
        title: '你的學位',
        detail: '學程 · 學分 · 若要公開可填 WAM/GPA',
        body: '畢業摘要 — 修課主軸、亮點、能力。證書掃描勿 commit 到公開 repo；放在 gitignored 的 content/assets/factory/。',
      },
      'certificate-a': {
        title: '這裡放你的證書標題',
        detail: '頒發單位 · 年份',
        body: '描述這張證書代表什麼。PNG/PDF 放在 content/assets/factory/（不進公開 repo）。',
        bullets: ['選填 — 多行成就或職責。'],
      },
      'certificate-b': {
        title: '另一張證書（選填）',
        detail: '例：領導 · 服務 · 競賽',
        body: '增刪 credential 鍵值，與 content/data/credentials.ts 對齊。',
      },
    },
  },
  ja: {
    site: { siteCode: 'bubblechickenlab · Louis Li present', architectName: 'Louis Li' },
    stamp: { code: 'TOWER 0', name: 'LOUIS LI' },
    lobby: {
      motto: 'content/i18n/copy.ts で差し替え — ロビー壁の短いモットー。',
      floorIntro:
        '推奨：ソフトウェアの作り方を一文で。例：「建築のように — 構造を先に、物語を語る部屋を後に。」',
    },
    factory: {
      panelTitle: '大学名 · プログラム名',
      completionLabel: 'PROGRAM COMPLETE',
      tsaCertTitle: '証書 · リーダーシップ／サービス',
      deansListCertTitle: '証書 · 学術表彰',
      degreeCertTitle: '証書 · 学位',
      highlights: [
        { project: '最新学期のテーマ科目をここに', takeaway: '一言 takeaway — 学んだこと' },
        { project: '中期学期の科目群', takeaway: 'content/i18n/copy.ts → factory.highlights で編集' },
        { project: '基礎学期の科目', takeaway: '推奨：科目クラスタ + 身につけたスキル' },
        { project: '入学最初の学期', takeaway: 'プログラムの始め方' },
      ],
    },
    infra: {
      softSkillGroups: [
        {
          category: 'コミュニケーション',
          items: ['英語', 'その他の言語', '技術文書 — content/i18n/copy.ts で編集'],
        },
        {
          category: 'デリバリー',
          items: ['エンドツーエンドのオーナーシップ', 'アジャイル／納期遵守'],
        },
      ],
    },
    library: {
      featuredRole: '見出しロール · 例：開発者 · デザイナー',
      featuredBullets: [
        '要点1 — 公開・維持しているもの（ポートフォリオ、ブログ、OSS）。',
        '要点2 — 担当範囲：設計 → リリース → 改善。',
      ],
      publications: {
        portfolio: {
          title: 'ポートフォリオ',
          description: 'リンクタイトルと一行説明 — content/i18n/copy.ts で編集',
        },
        github: {
          title: 'GitHub',
          description: 'your-handle',
        },
        linkedin: {
          title: 'LinkedIn',
          description: 'linkedin.com/in/your-handle',
        },
      },
    },
    projects: {
      'sample-project': {
        title: 'サンプルプロジェクト',
        hook: '一行 hook — 課題、スタック、成果。',
        body: '推奨構成：\n\n1. 背景 — 誰のどんな課題か。\n2. 構築内容 — アーキテクチャ、技術選定。\n3. 成果 — 指標、デモ、学び。\n\ncontent/i18n/copy.ts で差し替え。成績の詳細は gitignored の content/ へ。',
        role: 'あなたの役割',
        team: '任意 — チームメンバーと役割',
        course: '任意 — 学術プロジェクトなら科目コード',
        credit: '任意 — チーム、指導者、OSS クレジット。',
      },
      'tower-zero': {
        title: 'Tower Zero',
        hook: 'Walk-in 3D ポートフォリオテンプレート — 各フロアが履歴書の一章。',
        body: 'G Lobby — 紹介。B2 — スキル。23 Factory — 学歴。52 Laboratory — プロジェクト。99 Library — 資格と出版物。B10 — SNS。R Roof — 連絡先。\n\nFork 後 `npm run content:init` → content/ にデータと文案を入力。',
        role: 'テンプレート作者 Louis Li',
        credit: 'salieri009/resume2（SITE 009）— ナビ・HUD パターン。ビジュアルは Tower Zero オリジナル。',
      },
    },
    credentials: {
      degree: {
        title: '学位名',
        detail: 'プログラム · 単位 · 公開する場合の WAM/GPA',
        body: '卒業サマリー — 履修テーマとスキル。証書スキャンは公開 repo に commit せず content/assets/factory/ へ。',
      },
      'certificate-a': {
        title: 'ここに証書タイトル',
        detail: '授与機関 · 年',
        body: 'この資格の意味を記述。PNG/PDF は content/assets/factory/（gitignore）。',
        bullets: ['任意 — 複数行の実績。'],
      },
      'certificate-b': {
        title: '別の証書（任意）',
        detail: '例：リーダーシップ · サービス · 競技',
        body: 'content/data/credentials.ts とキーを揃える。',
      },
    },
  },
}
