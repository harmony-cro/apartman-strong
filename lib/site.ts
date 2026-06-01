// ─── Site config ────────────────────────────────────────────────────────────
// Update these values for each client site.

export const site = {
  name: 'Apartman Strong',
  tagline: 'Pružamo dodatnu notu odmora!',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://apartmanstrong.hr',
  phone: { display: '091 893 5340', tel: '+385918935340' },
  email: 'sb.dejan@gmail.com',
  address: 'Naselje Andrije Hebranga 2/6, 35000 Slavonski Brod',
  geo: { lat: 45.16, lng: 18.01 }, // Slavonski Brod — refine before go-live
  // Social links — set to '' to hide
  social: {
    facebook: 'https://web.facebook.com/profile.php?id=100093560640507',
    instagram: 'https://www.instagram.com/apartmanstrong/',
    linkedin: '',
  },
} as const
