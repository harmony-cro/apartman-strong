import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  // Add locales here. Single locale = no URL prefix. Two locales = /hr/... and /en/...
  locales: ['hr', 'en'],
  defaultLocale: 'hr',
  // 'as-needed': prefix only for non-default locales (recommended for most sites)
  // 'always': always prefix (e.g. /hr/..., /en/...)
  // 'never': no prefix at all (single language sites)
  localePrefix: 'as-needed',
})
