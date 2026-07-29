import { useEffect, useId, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface MobileDrawerProps {
  side: 'left' | 'right'
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function MobileDrawer({ side, open, onClose, title, children }: MobileDrawerProps) {
  const titleId = useId()
  const panelRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        onClose()
      }
    }
    window.addEventListener('keydown', onKeyDown, true)
    return () => window.removeEventListener('keydown', onKeyDown, true)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    panelRef.current?.focus()
  }, [open])

  if (!open) return null

  return (
    <div className={`tower-drawer tower-drawer--${side}`} data-reduced-motion={reducedMotion || undefined}>
      <button type="button" className="tower-drawer__backdrop" aria-label="Close panel" onClick={onClose} />
      <aside
        ref={panelRef}
        className="tower-drawer__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <header className="tower-drawer__bar">
          <h2 id={titleId} className="tower-drawer__title">
            {title}
          </h2>
          <button type="button" className="tower-drawer__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>
        <div className="tower-drawer__body">{children}</div>
      </aside>
    </div>
  )
}
