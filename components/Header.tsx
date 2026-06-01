'use client'

import { Icon } from '@/components/Icon'
import { Link, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { site } from '@/lib/site'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function Header() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/', label: t('home') },
    { href: '/#apartman', label: t('about') },
    { href: '/#kontakt', label: t('contact') },
  ]

  const onDark = !scrolled && !open
  const barColor = onDark ? 'text-white' : 'text-foreground'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'bg-background/95 py-3 shadow-[var(--shadow-nav)] backdrop-blur'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-[var(--container-max)] items-center justify-between px-5 md:px-16">
        <div className={`flex items-center gap-4 ${barColor}`}>
          <div className="hidden gap-2 sm:flex">
            {site.social.instagram && (
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="transition-colors hover:text-accent">
                <Icon name="instagram" className="h-5 w-5" />
              </a>
            )}
            {site.social.facebook && (
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="transition-colors hover:text-accent">
                <Icon name="facebook" className="h-5 w-5" />
              </a>
            )}
          </div>
          <Link href="/" aria-label={site.name} className="block">
            <Image
              src={scrolled || open ? '/logo-dark.png' : '/logo.png'}
              alt={site.name}
              width={150}
              height={70}
              priority
              className="h-11 w-auto"
            />
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className={`hidden items-center gap-8 md:flex ${barColor}`}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="label-eyebrow transition-colors hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
          {routing.locales.length > 1 && <LocaleSwitcher current={locale} dark={onDark} />}
        </nav>

        {/* Mobile toggle */}
        <button
          className={`md:hidden ${barColor}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={t('menu')}
          aria-expanded={open}
        >
          <Icon name={open ? 'close' : 'menu'} className="h-7 w-7" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-border px-5 py-4 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="label-eyebrow block py-3 text-foreground"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          {routing.locales.length > 1 && (
            <div className="pt-2">
              <LocaleSwitcher current={locale} dark={false} />
            </div>
          )}
        </nav>
      )}
    </header>
  )
}

function LocaleSwitcher({ current, dark }: { current: string; dark: boolean }) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className={`flex items-center gap-2 ${dark ? 'text-white' : 'text-muted-foreground'}`}>
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-2">
          {i > 0 && <span className="opacity-40">/</span>}
          <button
            onClick={() => router.replace(`/${loc}${pathname === '/' ? '' : pathname}`)}
            className={`text-xs font-semibold uppercase transition-colors hover:text-accent ${
              loc === current ? (dark ? 'text-accent' : 'text-accent-ink') : ''
            }`}
            aria-current={loc === current ? 'true' : undefined}
          >
            {loc}
          </button>
        </span>
      ))}
    </div>
  )
}
