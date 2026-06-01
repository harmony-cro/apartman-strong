'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Mounted once in the layout. Watches every `[data-reveal]` element and adds
 * `is-visible` as it scrolls into view (one-shot — unobserved after reveal).
 * Re-scans on route change so freshly mounted pages animate too. Respects
 * `prefers-reduced-motion` by revealing everything immediately.
 */
export function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-visible)')
    if (els.length === 0) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])

  return null
}
