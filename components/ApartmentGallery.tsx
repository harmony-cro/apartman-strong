'use client'

import { Icon } from '@/components/Icon'
import galleryData from '@/data/gallery.json'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type Shot = { slug: string; apartment: number; full: string; thumb: string; width: number; height: number }
const allShots = galleryData as Shot[]

type Props = {
  /** which apartment's photos to show */
  apartment: number
  /** apartment name, shown in the lightbox header */
  label: string
  /** text for the trigger button */
  triggerLabel: string
}

export function ApartmentGallery({ apartment, label, triggerLabel }: Props) {
  const t = useTranslations('gallery')
  const shots = allShots.filter((s) => s.apartment === apartment)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const stripRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => setOpen(false), [])
  const move = useCallback(
    (dir: number) => setActive((i) => (i + dir + shots.length) % shots.length),
    [shots.length],
  )

  // Keyboard nav + body scroll lock while the lightbox is open
  useEffect(() => {
    if (!open) return
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
  }, [open, close, move])

  // Keep the active thumbnail scrolled into view in the filmstrip
  useEffect(() => {
    if (!open) return
    const el = stripRef.current?.children[active] as HTMLElement | undefined
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [active, open])

  if (shots.length === 0) return null

  const current = shots[active]

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setActive(0)
          setOpen(true)
        }}
        className="label-eyebrow inline-flex items-center gap-2 rounded border border-accent px-6 py-3 text-accent-ink transition-colors hover:bg-accent hover:text-white"
      >
        <Icon name="image" className="h-5 w-5" />
        {triggerLabel}
        <span className="opacity-70">({shots.length})</span>
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex flex-col bg-black/92 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={label}
          >
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between px-4 py-4 text-white md:px-8">
            <p className="font-heading text-lg md:text-xl">
              {label}
              <span className="ml-3 text-sm text-white/60">
                {active + 1} / {shots.length}
              </span>
            </p>
            <button
              onClick={close}
              aria-label={t('close')}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <Icon name="close" className="h-6 w-6" />
            </button>
          </div>

          {/* Selected image */}
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-16">
            <button
              onClick={() => move(-1)}
              aria-label={t('prev')}
              className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:left-6"
            >
              <Icon name="arrowLeft" className="h-7 w-7" />
            </button>
            <Image
              key={current.slug}
              src={current.full}
              alt={`${label} — ${t('imageAlt')} ${active + 1}`}
              width={current.width}
              height={current.height}
              sizes="100vw"
              priority
              className="max-h-full w-auto rounded-lg object-contain"
            />
            <button
              onClick={() => move(1)}
              aria-label={t('next')}
              className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 md:right-6"
            >
              <Icon name="arrowRight" className="h-7 w-7" />
            </button>
          </div>

          {/* Filmstrip */}
          <div
            ref={stripRef}
            className="flex shrink-0 gap-2 overflow-x-auto px-4 py-4 md:px-8"
          >
            {shots.map((s, i) => (
              <button
                key={s.slug}
                onClick={() => setActive(i)}
                aria-label={`${t('imageAlt')} ${i + 1}`}
                aria-current={i === active}
                className={`relative h-16 w-24 shrink-0 overflow-hidden rounded transition-all md:h-20 md:w-28 ${
                  i === active
                    ? 'ring-2 ring-accent'
                    : 'opacity-55 hover:opacity-100'
                }`}
              >
                <Image
                  src={s.thumb}
                  alt=""
                  fill
                  sizes="112px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
          </div>,
          document.body,
        )}
    </>
  )
}
