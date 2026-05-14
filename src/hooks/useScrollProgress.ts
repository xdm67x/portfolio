import { useEffect, useState } from 'react'

export function useScrollProgress(distance: number) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReducedMotion) return

    let ticking = false

    function update() {
      const scrollY = window.scrollY
      const p = Math.min(1, Math.max(0, scrollY / distance))
      setProgress(p)
      ticking = false
    }

    function onScroll() {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update()

    return () => window.removeEventListener('scroll', onScroll)
  }, [distance])

  return progress
}
