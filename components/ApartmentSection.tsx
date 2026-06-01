import { Icon } from '@/components/Icon'
import { Link } from '@/i18n/navigation'
import { site } from '@/lib/site'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

type Props = {
  which: 'one' | 'two'
  image: string
  /** true = text on the left, image on the right (mirrored) */
  reversed?: boolean
}

export function ApartmentSection({ which, image, reversed = false }: Props) {
  const t = useTranslations('apartments')
  const paragraphs = [t(`${which}.p1`), t(`${which}.p2`), t(`${which}.p3`)].filter(Boolean)

  const imageBlock = (
    <div className={`relative h-[440px] overflow-hidden rounded-lg shadow-[var(--shadow-card)] md:h-[500px] ${reversed ? 'lg:order-2' : 'lg:order-1'}`}>
      <Image src={image} alt={t(`${which}.name`)} fill sizes="(max-width: 1024px) 100vw, 600px" className="object-cover transition-transform duration-700 hover:scale-105" />
    </div>
  )

  const textBlock = (
    <div className={`space-y-7 rounded-2xl bg-surface-low p-8 md:p-12 ${reversed ? 'lg:order-1' : 'lg:order-2'}`}>
      <h3 className="font-heading text-2xl text-foreground md:text-3xl">{t(`${which}.name`)}</h3>
      <div className="space-y-4 text-muted-foreground">
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <ul className="space-y-3 border-t border-outline/30 pt-5 text-foreground">
        <li className="flex items-start gap-3">
          <Icon name="location" className="mt-0.5 h-5 w-5 shrink-0 text-accent-ink" />
          <span>{site.address}</span>
        </li>
        <li className="flex items-center gap-3">
          <Icon name="phone" className="h-5 w-5 shrink-0 text-accent-ink" />
          <a href={`tel:${site.phone.tel}`} className="transition-colors hover:text-accent-ink">{site.phone.display}</a>
        </li>
      </ul>
      <div className="flex flex-wrap gap-4 pt-2">
        <a href={`mailto:${site.email}`} className="label-eyebrow rounded bg-primary px-6 py-3 text-white transition-colors hover:bg-primary-dark">
          {t('book')}
        </a>
        <Link href="/galerija" className="label-eyebrow rounded border border-accent px-6 py-3 text-accent-ink transition-colors hover:bg-accent hover:text-white">
          {t('viewGallery')}
        </Link>
      </div>
    </div>
  )

  return (
    <section className="bg-surface px-5 py-12 first:pt-24 md:px-16">
      <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {reversed ? (
          <>
            {textBlock}
            {imageBlock}
          </>
        ) : (
          <>
            {imageBlock}
            {textBlock}
          </>
        )}
      </div>
    </section>
  )
}
