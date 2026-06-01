'use client'

import { EnquiryForm } from '@/components/EnquiryForm'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useState } from 'react'

// A small, curated rotation of room shots pulled from the gallery.
const SLIDES = [
  '/images/gallery/full/strong-08.webp', // living room
  '/images/gallery/full/strong-13.webp', // bedroom
  '/images/gallery/full/strong-05.webp', // dining
  '/images/gallery/full/strong-22.webp', // kitchen / dining
]

export function Hero() {
  const t = useTranslations('hero')
  const [idx, setIdx] = useState(0)
  // Only slide 0 is server-rendered (priority LCP image); the rest mount after
  // hydration so the browser doesn't fetch 4 full-size hero images up front.
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Mount the remaining slides after first paint.
    const raf = requestAnimationFrame(() => setReady(true))
    let id: ReturnType<typeof setInterval> | undefined
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      id = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), 6000)
    }
    return () => {
      cancelAnimationFrame(raf)
      if (id) clearInterval(id)
    }
  }, [])

  return (
    <header className="relative flex min-h-screen items-center px-5 pb-12 pt-28 md:px-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-kenburns absolute inset-0">
          {SLIDES.map((src, i) =>
            i === 0 || ready ? (
              <Image
                key={src}
                src={src}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className={`object-cover transition-opacity duration-[1800ms] ease-in-out ${
                  i === idx ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ) : null,
          )}
        </div>
      </div>
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="relative z-10 mx-auto grid w-full max-w-[var(--container-max)] grid-cols-1 items-center gap-8 lg:grid-cols-12">
        <div className="space-y-6 text-white lg:col-span-7">
          <h1 className="animate-fade-up font-heading text-5xl font-bold uppercase leading-[1.05] tracking-tight drop-shadow-md md:text-7xl">
            Apartman<br />Strong
          </h1>
          <p
            className="animate-fade-up font-heading text-2xl font-light italic opacity-90 drop-shadow-sm md:text-3xl"
            style={{ animationDelay: '150ms' }}
          >
            {t('tagline')}
          </p>
        </div>
        <div className="animate-fade-up lg:col-span-5" style={{ animationDelay: '300ms' }}>
          <EnquiryForm />
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2.5">
        {SLIDES.map((src, i) => (
          <button
            key={src}
            onClick={() => setIdx(i)}
            aria-label={`${i + 1}`}
            aria-current={i === idx}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === idx ? 'w-6 bg-accent' : 'w-2 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </header>
  )
}
