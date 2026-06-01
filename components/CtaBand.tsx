import { site } from '@/lib/site'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export function CtaBand() {
  const t = useTranslations('ctaBand')

  return (
    <section className="relative overflow-hidden bg-primary px-5 py-28 text-white md:px-16">
      <Image
        src="/images/cta-bg.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-20"
      />
      <div data-reveal className="relative z-10 mx-auto max-w-3xl space-y-8 text-center">
        <h2 className="font-heading text-3xl font-light italic md:text-4xl">{t('title')}</h2>
        <p className="leading-relaxed text-white/90">{t('body')}</p>
        <div className="pt-2">
          <a
            href={`tel:${site.phone.tel}`}
            className="label-eyebrow inline-block rounded bg-accent px-10 py-4 tracking-[0.15em] text-primary-dark shadow-md transition-opacity hover:opacity-90"
          >
            {t('cta')}
          </a>
        </div>
      </div>
    </section>
  )
}
