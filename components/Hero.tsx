import { EnquiryForm } from '@/components/EnquiryForm'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export function Hero() {
  const t = useTranslations('hero')

  return (
    <header className="relative flex min-h-screen items-center px-5 pb-12 pt-28 md:px-16">
      <Image
        src="/images/hero.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      <div className="relative z-10 mx-auto grid w-full max-w-[var(--container-max)] grid-cols-1 items-center gap-8 lg:grid-cols-12">
        <div className="space-y-6 text-white lg:col-span-7">
          <h1 className="font-heading text-5xl font-bold uppercase leading-[1.05] tracking-tight drop-shadow-md md:text-7xl">
            Apartman<br />Strong
          </h1>
          <p className="font-heading text-2xl font-light italic opacity-90 drop-shadow-sm md:text-3xl">
            {t('tagline')}
          </p>
        </div>
        <div className="lg:col-span-5">
          <EnquiryForm />
        </div>
      </div>
    </header>
  )
}
