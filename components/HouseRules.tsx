import { Icon } from '@/components/Icon'
import { useTranslations } from 'next-intl'

const RULES = [
  { key: 'checkIn', icon: 'login' },
  { key: 'checkOut', icon: 'logout' },
  { key: 'cancellation', icon: 'calendarOff' },
  { key: 'payment', icon: 'payments' },
  { key: 'pets', icon: 'pets' },
  { key: 'smoking', icon: 'smokeFree' },
] as const

export function HouseRules() {
  const t = useTranslations('houseRules')

  return (
    <section id="pravila" className="scroll-mt-24 border-y border-surface-variant bg-ivory px-5 py-14 md:px-16 md:py-20">
      <div className="mx-auto max-w-[var(--container-max)]">
        <div data-reveal className="mb-9 text-center md:mb-12">
          <p className="label-eyebrow text-accent-ink">{t('eyebrow')}</p>
          <h2 className="mt-3 text-2xl text-foreground md:text-4xl">{t('title')}</h2>
          <div className="mx-auto mt-4 h-1 w-16 bg-accent" />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {RULES.map((r, i) => (
            <div key={r.key} data-reveal style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="flex h-full flex-col items-center rounded-xl border border-outline/20 bg-surface p-4 text-center shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-1 sm:p-6">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-surface-container text-accent-ink sm:mb-4 sm:h-14 sm:w-14">
                  <Icon name={r.icon} className="h-5 w-5 sm:h-7 sm:w-7" />
                </div>
                <h3 className="mb-1 font-heading text-base text-foreground sm:text-lg">{t(`${r.key}.title`)}</h3>
                <p className="text-sm text-muted-foreground">{t(`${r.key}.text`)}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground/80 md:mt-10">{t('note')}</p>
      </div>
    </section>
  )
}
