import { Icon } from '@/components/Icon'
import { site } from '@/lib/site'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export function Footer() {
  const t = useTranslations('footer')
  // Static year — avoids new Date() (deterministic build); bump on rollover.
  const year = 2026

  return (
    <footer className="bg-primary px-5 pb-8 pt-16 text-white md:px-16">
      <div className="mx-auto grid max-w-[var(--container-max)] gap-12 md:grid-cols-3">
        {/* Brand */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <Image
            src="/logo.png"
            alt={site.name}
            width={150}
            height={70}
            className="mb-4 h-16 w-auto"
          />
          <p className="max-w-xs text-sm text-white/80">{t('tagline')}</p>
        </div>

        {/* Contact */}
        <div className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
          <h3 className="label-eyebrow mb-1 text-accent">{t('contact')}</h3>
          <a href={`tel:${site.phone.tel}`} className="flex items-center gap-2 text-sm transition-colors hover:text-accent">
            <Icon name="phone" className="h-4 w-4 text-accent" /> {site.phone.display}
          </a>
          <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-sm transition-colors hover:text-accent">
            <Icon name="mail" className="h-4 w-4 text-accent" /> {site.email}
          </a>
          <span className="flex items-center gap-2 text-sm">
            <Icon name="location" className="h-4 w-4 shrink-0 text-accent" /> {site.address}
          </span>
        </div>

        {/* Social */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <h3 className="label-eyebrow mb-6 text-accent">{t('follow')}</h3>
          <div className="flex gap-4">
            {site.social.instagram && (
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 transition-colors hover:border-accent hover:bg-accent hover:text-primary">
                <Icon name="instagram" className="h-5 w-5" />
              </a>
            )}
            {site.social.facebook && (
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 transition-colors hover:border-accent hover:bg-accent hover:text-primary">
                <Icon name="facebook" className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-[var(--container-max)] flex-col items-center justify-between gap-3 border-t border-white/20 pt-8 text-sm text-white/60 md:flex-row">
        <p>© {year} {site.name} — {t('rights')}</p>
        <p>
          {t('builtBy')}{' '}
          <a href="https://harmony.com.hr" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">
            Harmony.com.hr
          </a>
        </p>
      </div>
    </footer>
  )
}
