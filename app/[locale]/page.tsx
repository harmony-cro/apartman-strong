import { About } from '@/components/About'
import { ApartmentSection } from '@/components/ApartmentSection'
import { Contact } from '@/components/Contact'
import { CtaBand } from '@/components/CtaBand'
import { Hero } from '@/components/Hero'
import { HouseRules } from '@/components/HouseRules'
import { JsonLd } from '@/components/JsonLd'
import { getTranslations, setRequestLocale } from 'next-intl/server'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  return {
    alternates: {
      canonical: locale === 'hr' ? '/' : `/${locale}`,
      languages: { hr: '/', en: '/en', 'x-default': '/' },
    },
    openGraph: { url: locale === 'hr' ? '/' : `/${locale}` },
  }
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'meta' })

  return (
    <>
      <JsonLd description={t('homeDescription')} />
      <Hero />
      <About />
      <CtaBand />
      <ApartmentSection which="one" image="/images/apartman-1.webp" />
      <ApartmentSection which="two" image="/images/apartman-2.webp" reversed />
      <HouseRules />
      <Contact />
    </>
  )
}
