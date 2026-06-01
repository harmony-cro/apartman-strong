import './../../app/globals.css'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { routing } from '@/i18n/routing'
import { site } from '@/lib/site'
import { hasLocale, NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { Libre_Caslon_Text, Work_Sans } from 'next/font/google'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

const libreCaslon = Libre_Caslon_Text({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
})
const workSans = Work_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
})

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return {
    metadataBase: new URL(site.url),
    title: { default: t('homeTitle'), template: `%s | ${t('siteName')}` },
    description: t('homeDescription'),
    icons: { icon: '/favicon.png', apple: '/favicon.png' },
    // Per-route canonical/alternates/og:url are set in each page's
    // generateMetadata (a deeper segment doesn't reliably override these here).
    openGraph: {
      type: 'website',
      siteName: t('siteName'),
      title: t('homeTitle'),
      description: t('homeDescription'),
      locale: locale === 'hr' ? 'hr_HR' : 'en_US',
      images: [{ url: '/og.jpg', width: 1200, height: 630, alt: t('siteName') }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('homeTitle'),
      description: t('homeDescription'),
      images: ['/og.jpg'],
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale} className={`${libreCaslon.variable} ${workSans.variable} h-full scroll-smooth`}>
      <body className="flex min-h-full flex-col antialiased bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
