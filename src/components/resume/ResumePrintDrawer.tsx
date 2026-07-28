import { useEffect } from 'react'
import { useSite } from '../../context/SiteContext'
import { resumeLocaleForSite } from '../../data/resumePrint'
import { profile } from '../../data/profile'
import { ResumePdfPreview } from './ResumePdfPreview'

export function ResumePrintDrawer() {
  const { locale, strings, resumePreviewOpen, closeResumePreview, printResume } = useSite()
  const resumeLocale = resumeLocaleForSite(locale)
  const t = strings.resumePrint

  useEffect(() => {
    if (!resumePreviewOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        closeResumePreview()
      }
    }
    window.addEventListener('keydown', onKeyDown, true)
    return () => window.removeEventListener('keydown', onKeyDown, true)
  }, [resumePreviewOpen, closeResumePreview])

  if (!resumePreviewOpen) return null

  return (
    <div className="tower-resume-drawer" role="dialog" aria-modal="true" aria-label={t.drawerTitle}>
      <div className="tower-resume-drawer__bar">
        <div className="tower-resume-drawer__stamp">
          <span className="tower-resume-drawer__site">{profile.brand} · {profile.siteCode}</span>
          <span className="tower-resume-drawer__doc">{t.drawerDoc}</span>
        </div>
        <div className="tower-resume-drawer__actions">
          <button type="button" className="tower-resume-drawer__btn" onClick={printResume}>
            {t.printNow}
          </button>
          <button type="button" className="tower-resume-drawer__btn tower-resume-drawer__btn--ghost" onClick={closeResumePreview}>
            {t.close}
          </button>
        </div>
      </div>
      <div className="tower-resume-drawer__body">
        <ResumePdfPreview resumeLocale={resumeLocale} />
      </div>
    </div>
  )
}
