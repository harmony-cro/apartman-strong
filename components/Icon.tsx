import type { SVGProps } from 'react'

/**
 * Thin-line (1px) icon set, stroke = currentColor — matches the stitch
 * "Material Symbols Outlined" look without loading the icon font.
 */
const paths: Record<string, React.ReactNode> = {
  location: (
    <>
      <path d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  phone: (
    <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 4.5 5.5a2 2 0 0 1 2-2Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <path d="M14.5 8.5V6.8c0-.8.3-1.3 1.4-1.3H17V2.6c-.4 0-1.3-.1-2.3-.1-2.3 0-3.7 1.4-3.7 3.9v2.1H8.5v3h2.5V21h3.5v-9.5H17l.5-3h-3Z" />
  ),
  login: (
    <>
      <path d="M14 3.5h4a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5h-4" />
      <path d="M10 8l4 4-4 4M14 12H3.5" />
    </>
  ),
  logout: (
    <>
      <path d="M10 3.5H6A1.5 1.5 0 0 0 4.5 5v14A1.5 1.5 0 0 0 6 20.5h4" />
      <path d="M16 8l4 4-4 4M20 12H9.5" />
    </>
  ),
  calendarOff: (
    <>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M3.5 9.5h17M8 3v3M16 3v3M9.5 14l5 4M14.5 14l-5 4" />
    </>
  ),
  payments: (
    <>
      <rect x="2.5" y="6.5" width="15" height="10" rx="1.5" />
      <circle cx="10" cy="11.5" r="2.2" />
      <path d="M6.5 19.5h13a2 2 0 0 0 2-2v-7" />
    </>
  ),
  pets: (
    <>
      <circle cx="6" cy="9" r="1.6" />
      <circle cx="10" cy="6" r="1.6" />
      <circle cx="14" cy="6" r="1.6" />
      <circle cx="18" cy="9" r="1.6" />
      <path d="M12 11c-2.2 0-4 1.8-4 3.6 0 1.6 1.2 2.4 2.6 2.4.7 0 1-.3 1.4-.3s.7.3 1.4.3c1.4 0 2.6-.8 2.6-2.4 0-1.8-1.8-3.6-4-3.6Z" />
    </>
  ),
  smokeFree: (
    <>
      <rect x="3" y="13" width="13" height="3.5" rx="0.5" />
      <path d="M18.5 13v3.5M21 13v3.5M4 4l16 16" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  arrowLeft: <path d="M15 5l-7 7 7 7" />,
  arrowRight: <path d="M9 5l7 7-7 7" />,
  home: (
    <path d="M4 11.5 12 4l8 7.5M6 10v9.5h12V10" />
  ),
}

type Props = SVGProps<SVGSVGElement> & { name: keyof typeof paths }

export function Icon({ name, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  )
}
