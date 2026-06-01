import { Gallery } from '@/components/Gallery'
import { getTranslations, setRequestLocale } from 'next-intl/server'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return {
    title: t('galleryTitle'),
    description: t('galleryDescription'),
  }
}

export default async function GalleryPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'gallery' })

  return (
    <section className="bg-surface px-5 pb-24 pt-32 md:px-16">
      <div className="mx-auto max-w-[var(--container-max)]">
        <div className="mb-12 max-w-2xl">
          <p className="label-eyebrow text-accent">{t('eyebrow')}</p>
          <h1 className="mt-3 text-4xl text-foreground md:text-5xl">{t('title')}</h1>
          <p className="mt-4 text-muted-foreground">{t('intro')}</p>
        </div>
        <Gallery />
      </div>
    </section>
  )
}
