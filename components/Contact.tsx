import { Icon } from '@/components/Icon'
import { site } from '@/lib/site'
import { useTranslations } from 'next-intl'

export function Contact() {
  const t = useTranslations('contact')
  const mapQuery = encodeURIComponent(site.address)

  return (
    <section id="kontakt" className="scroll-mt-24 bg-surface px-5 py-24 md:px-16">
      <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div data-reveal className="space-y-8">
          <div>
            <p className="label-eyebrow text-accent-ink">{t('eyebrow')}</p>
            <h2 className="mt-3 text-3xl text-foreground md:text-4xl">{t('title')}</h2>
          </div>
          <p className="max-w-md text-muted-foreground">{t('intro')}</p>
          <ul className="space-y-5">
            <li className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-container text-accent-ink">
                <Icon name="phone" className="h-5 w-5" />
              </span>
              <span>
                <span className="label-eyebrow block text-muted-foreground">{t('phone')}</span>
                <a href={`tel:${site.phone.tel}`} className="text-lg transition-colors hover:text-accent-ink">{site.phone.display}</a>
              </span>
            </li>
            <li className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-container text-accent-ink">
                <Icon name="mail" className="h-5 w-5" />
              </span>
              <span>
                <span className="label-eyebrow block text-muted-foreground">{t('email')}</span>
                <a href={`mailto:${site.email}`} className="text-lg transition-colors hover:text-accent-ink">{site.email}</a>
              </span>
            </li>
            <li className="flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-container text-accent-ink">
                <Icon name="location" className="h-5 w-5" />
              </span>
              <span>
                <span className="label-eyebrow block text-muted-foreground">{t('address')}</span>
                <span className="text-lg">{site.address}</span>
              </span>
            </li>
          </ul>
        </div>

        <div data-reveal className="h-[380px] overflow-hidden rounded-xl shadow-[var(--shadow-card)] lg:h-[460px]" style={{ transitionDelay: '150ms' }}>
          <iframe
            title={t('mapTitle')}
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
