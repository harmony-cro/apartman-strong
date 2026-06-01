import { routing } from '@/i18n/routing'
import { site } from '@/lib/site'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['']
  const entries: MetadataRoute.Sitemap = []

  for (const path of paths) {
    for (const locale of routing.locales) {
      const prefix = locale === routing.defaultLocale ? '' : `/${locale}`
      entries.push({
        url: `${site.url}${prefix}${path}`,
        changeFrequency: 'monthly',
        priority: path === '' ? 1 : 0.8,
      })
    }
  }

  return entries
}
