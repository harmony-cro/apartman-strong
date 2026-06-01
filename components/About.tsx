import { Link } from '@/i18n/navigation'
import { site } from '@/lib/site'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export function About() {
  const t = useTranslations('about')

  return (
    <section id="apartman" className="scroll-mt-24 bg-surface px-5 py-24 md:px-16">
      <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 items-center gap-8 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-5 lg:pr-12">
          <p className="label-eyebrow text-accent-ink">{t('eyebrow')}</p>
          <h2 className="text-3xl text-foreground md:text-4xl">{t('title')}</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>{t('p1')}</p>
            <p>{t('p2')}</p>
            <p>{t('p3')}</p>
          </div>
          <Link
            href={`mailto:${site.email}`}
            className="label-eyebrow inline-block rounded border border-accent px-8 py-3 text-accent-ink transition-colors hover:bg-accent hover:text-white"
          >
            {t('cta')}
          </Link>
        </div>

        <div className="lg:col-span-7">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-lg shadow-[var(--shadow-card)]">
              <Image src="/images/about-1.webp" alt="" fill sizes="(max-width: 1024px) 45vw, 320px" className="object-cover transition-transform duration-700 hover:scale-105" />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-[var(--shadow-card)]">
              <Image src="/images/about-2.webp" alt="" fill sizes="(max-width: 1024px) 45vw, 320px" className="object-cover transition-transform duration-700 hover:scale-105" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
