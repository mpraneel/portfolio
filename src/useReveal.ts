import { useEffect, useRef } from 'react'

/*
  Attaches an IntersectionObserver to a section and toggles the
  .is-visible class on every descendant with the .reveal class.
  Elements animate in when scrolled into view and reset once they
  leave, so the choreography replays in both scroll directions.
  Direction variants come from reveal--left, reveal--right, and
  reveal--zoom. Stagger comes from an inline --reveal-delay.
*/
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const targets = root.querySelectorAll<HTMLElement>('.reveal')
    if (targets.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          } else if (entry.boundingClientRect.top > 0) {
            // Reset only when the element falls below the viewport,
            // so content above the fold does not blink while reading
            entry.target.classList.remove('is-visible')
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return ref
}
