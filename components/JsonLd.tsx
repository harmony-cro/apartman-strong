import { site } from '@/lib/site'

/**
 * LodgingBusiness + Apartment structured data for the homepage.
 * Rendered as a <script type="application/ld+json"> tag.
 */
export function JsonLd({ description }: { description: string }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': `${site.url}/#lodging`,
    name: site.name,
    description,
    url: site.url,
    telephone: site.phone.tel,
    email: site.email,
    image: [
      `${site.url}/images/gallery/full/strong-10-1.webp`,
      `${site.url}/images/gallery/full/strong-13.webp`,
      `${site.url}/images/gallery/full/strong-05.webp`,
      `${site.url}/images/gallery/full/strong-22.webp`,
    ],
    priceRange: '€€',
    starRating: { '@type': 'Rating', ratingValue: '5' },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Naselje Andrije Hebranga 2/6',
      addressLocality: 'Slavonski Brod',
      postalCode: '35000',
      addressCountry: 'HR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    sameAs: [site.social.instagram, site.social.facebook].filter(Boolean),
    containsPlace: [
      { '@type': 'Apartment', name: 'Apartman Strong 1', numberOfRooms: 1 },
      { '@type': 'Apartment', name: 'Apartman Strong 2', numberOfRooms: 1 },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
