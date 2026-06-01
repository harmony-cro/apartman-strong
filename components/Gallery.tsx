'use client'

import { Icon } from '@/components/Icon'
import galleryData from '@/data/gallery.json'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

type Shot = { slug: string; full: string; thumb: string; width: number; height: number }
const shots = galleryData as Shot[]

export function Gallery() {
  const t = useTranslations('gallery')
  const [active, setActive] = useState<number | null>(null)

  const close = useCallback(() => setActive(null), [])
  const move = useCallback(
    (dir: number) => setActive((i) => (i === null ? i : (i + dir + shots.length) % shots.length)),
    [],
  )

  useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') move(1)
      if (e.key === 'ArrowLeft') move(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [active, close, move])

  return (
    <>
      <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
        {shots.map((s, i) => (
          <button
            key={s.slug}
            onClick={() => setActive(i)}
            className="group block w-full overflow-hidden rounded-lg shadow-[var(--shadow-card)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={`${t('imageAlt')} ${i + 1}`}
          >
            <Image
              src={s.thumb}
              alt={`${t('imageAlt')} ${i + 1}`}
              width={s.width}
              height={s.height}
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <button onClick={close} aria-label={t('close')} className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
            <Icon name="close" className="h-6 w-6" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); move(-1) }} aria-label={t('prev')} className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-6">
            <Icon name="arrowLeft" className="h-7 w-7" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); move(1) }} aria-label={t('next')} className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6">
            <Icon name="arrowRight" className="h-7 w-7" />
          </button>
          <div className="relative max-h-[88vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={shots[active].full}
              alt={`${t('imageAlt')} ${active + 1}`}
              width={shots[active].width}
              height={shots[active].height}
              sizes="100vw"
              className="mx-auto max-h-[88vh] w-auto rounded-lg object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  )
}
