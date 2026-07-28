import { useEffect, useMemo, useRef, useState } from 'react'
import { getDocument, type PDFDocumentProxy, type PDFPageProxy } from 'pdfjs-dist'
import '../../lib/pdfjs'
import { resumePdfUrl, type ResumeLocale } from '../../data/resumePrint'

interface ResumePdfPreviewProps {
  resumeLocale: ResumeLocale
  /** B10 exhibit — smaller pages in a two-up grid. */
  compact?: boolean
  className?: string
}

interface LinkBox {
  href: string
  left: number
  top: number
  width: number
  height: number
}

function usePdfDocument(resumeLocale: ResumeLocale) {
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setDoc(null)
    setError(null)

    const task = getDocument({ url: resumePdfUrl(resumeLocale) })
    task.promise
      .then((pdf) => {
        if (!cancelled) setDoc(pdf)
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load PDF')
      })

    return () => {
      cancelled = true
      void task.destroy()
    }
  }, [resumeLocale])

  return { doc, error }
}

function PdfPageView({ page, cssWidth }: { page: PDFPageProxy; cssWidth: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [links, setLinks] = useState<LinkBox[]>([])
  const [height, setHeight] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function render() {
      const canvas = canvasRef.current
      if (!canvas || cssWidth <= 0) return

      const base = page.getViewport({ scale: 1 })
      const scale = cssWidth / base.width
      const viewport = page.getViewport({ scale })
      const dpr = window.devicePixelRatio || 1

      canvas.width = Math.floor(viewport.width * dpr)
      canvas.height = Math.floor(viewport.height * dpr)
      canvas.style.width = `${viewport.width}px`
      canvas.style.height = `${viewport.height}px`
      setHeight(viewport.height)

      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      await page.render({ canvas, canvasContext: ctx, viewport }).promise
      if (cancelled) return

      const annotations = await page.getAnnotations({ intent: 'display' })
      if (cancelled) return

      const nextLinks: LinkBox[] = []
      for (const ann of annotations) {
        if (ann.subtype !== 'Link') continue
        const href = (ann.url ?? ann.unsafeUrl) as string | undefined
        if (!href) continue
        const [x1, y1, x2, y2] = ann.rect as [number, number, number, number]
        const [vx1, vy1] = viewport.convertToViewportPoint(x1, y1)
        const [vx2, vy2] = viewport.convertToViewportPoint(x2, y2)
        const left = Math.min(vx1, vx2)
        const top = Math.min(vy1, vy2)
        const width = Math.abs(vx2 - vx1)
        const heightPx = Math.abs(vy2 - vy1)
        if (width < 2 || heightPx < 2) continue
        nextLinks.push({ href, left, top, width, height: heightPx })
      }
      setLinks(nextLinks)
    }

    void render()
    return () => {
      cancelled = true
    }
  }, [page, cssWidth])

  return (
    <figure className="resume-preview__page">
      <div className="resume-preview__canvas-wrap" style={{ width: cssWidth, height: height || undefined }}>
        <canvas ref={canvasRef} className="resume-preview__canvas" />
        <div className="resume-preview__links" aria-hidden={links.length === 0}>
          {links.map((link) => (
            <a
              key={`${link.href}-${link.left}-${link.top}`}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                left: link.left,
                top: link.top,
                width: link.width,
                height: link.height,
              }}
              tabIndex={-1}
            />
          ))}
        </div>
      </div>
    </figure>
  )
}

export function ResumePdfPreview({ resumeLocale, compact = false, className }: ResumePdfPreviewProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [rootWidth, setRootWidth] = useState(compact ? 320 : 820)
  const { doc, error } = usePdfDocument(resumeLocale)

  useEffect(() => {
    if (compact) {
      setRootWidth(320)
      return
    }
    const el = rootRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setRootWidth(Math.min(820, Math.floor(entry.contentRect.width)))
    })
    ro.observe(el)
    setRootWidth(Math.min(820, Math.floor(el.clientWidth)))
    return () => ro.disconnect()
  }, [compact])

  const pageWidth = compact ? Math.floor((rootWidth - 8) / 2) : rootWidth
  const pageNumbers = useMemo(
    () => (doc ? Array.from({ length: doc.numPages }, (_, i) => i + 1) : []),
    [doc],
  )

  return (
    <div
      ref={rootRef}
      className={[compact ? 'resume-preview resume-preview--compact' : 'resume-preview', className]
        .filter(Boolean)
        .join(' ')}
    >
      {error && <p className="resume-preview__error">{error}</p>}
      {!doc && !error && <p className="resume-preview__loading">Loading PDF…</p>}
      {doc &&
        pageNumbers.map((num) => (
          <PdfPageLoader key={num} doc={doc} pageNumber={num} cssWidth={pageWidth} />
        ))}
    </div>
  )
}

function PdfPageLoader({
  doc,
  pageNumber,
  cssWidth,
}: {
  doc: PDFDocumentProxy
  pageNumber: number
  cssWidth: number
}) {
  const [page, setPage] = useState<PDFPageProxy | null>(null)

  useEffect(() => {
    let cancelled = false
    void doc.getPage(pageNumber).then((p) => {
      if (!cancelled) setPage(p)
    })
    return () => {
      cancelled = true
    }
  }, [doc, pageNumber])

  if (!page) return <div className="resume-preview__page resume-preview__page--loading" style={{ width: cssWidth }} />
  return <PdfPageView page={page} cssWidth={cssWidth} />
}
