import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'

type Layer = {
  speed: number // positive moves slower than scroll (parallax depth)
  children: ReactNode
  className?: string
}

type Props = {
  height?: number // in px
  layers: Layer[]
}

export default function Parallax({ height = 280, layers }: Props) {
  const prefersReduced = useMemo(() => {
    return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])
  const ref = useRef<HTMLDivElement | null>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (prefersReduced) return
    const onScroll = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const progress = Math.min(1, Math.max(0, 1 - rect.top / (rect.height || 1)))
      setOffset(progress * 100) // arbitrary scalar for transform
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [prefersReduced])

  return (
    <div ref={ref} className="relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800" style={{ height }}>
      {layers.map((layer, i) => {
        const translate = prefersReduced ? 0 : offset * layer.speed
        return (
          <div
            key={i}
            className={`absolute inset-0 will-change-transform ${layer.className ?? ''}`}
            style={{ transform: `translateY(${translate}px)` }}
            aria-hidden
          >
            {layer.children}
          </div>
        )
      })}
    </div>
  )
}
