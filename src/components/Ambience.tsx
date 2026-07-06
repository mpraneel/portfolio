import { useEffect } from 'react'

/*
  Site-wide ambience: a film grain overlay plus pointer tracking for
  the card spotlights. Purely decorative, never intercepts input,
  and skipped on touch devices and under reduced motion.
*/
export default function Ambience() {
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || reduced.matches) return

    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element).closest?.('.spot') as HTMLElement | null
      if (el) {
        const r = el.getBoundingClientRect()
        el.style.setProperty('--spot-x', `${e.clientX - r.left}px`)
        el.style.setProperty('--spot-y', `${e.clientY - r.top}px`)
      }
    }

    document.addEventListener('pointermove', onMove, { passive: true })
    return () => document.removeEventListener('pointermove', onMove)
  }, [])

  return <div className="grain" aria-hidden="true" />
}
