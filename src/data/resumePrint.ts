import type { Locale } from '../i18n/strings'

export type ResumeLocale = 'en' | 'zh-TW'

/** Site UI locale → résumé sheet language (EN for en/ja, zh-TW for zh-TW). */
export function resumeLocaleForSite(locale: Locale): ResumeLocale {
  return locale === 'zh-TW' ? 'zh-TW' : 'en'
}

export function resumePdfUrl(resumeLocale: ResumeLocale): string {
  const base = import.meta.env.BASE_URL
  return `${base}resume/${resumeLocale}/resume.pdf`
}

/**
 * Print the PDF in a new tab so the browser's native PDF engine handles
 * links (hidden 0×0 iframes often fall back to printing the visible page).
 */
export function printResumePdf(resumeLocale: ResumeLocale): void {
  const url = resumePdfUrl(resumeLocale)
  const win = window.open(url, '_blank', 'noopener,noreferrer')
  if (!win) return

  const trigger = () => {
    try {
      win.focus()
      win.print()
    } catch {
      /* Native PDF tab — user can print manually if auto-print is blocked. */
    }
  }

  win.addEventListener('load', () => window.setTimeout(trigger, 600))
  window.setTimeout(trigger, 1500)
}
