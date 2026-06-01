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
    <section id="pravila" className="scroll-mt-24 border-y border-surface-variant bg-ivory px-5 py-24 md:px-16">
      <div className="mx-auto max-w-[var(--container-max)]">
        <div className="mb-16 text-center">
          <p className="label-eyebrow text-accent-ink">{t('eyebrow')}</p>
          <h2 className="mt-3 text-3xl text-foreground md:text-4xl">{t('title')}</h2>
          <div className="mx-auto mt-6 h-1 w-16 bg-accent" />
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {RULES.map((r) => (
            <div
              key={r.key}
              className="flex flex-col items-center rounded-xl border border-outline/20 bg-surface p-8 text-center shadow-[var(--shadow-card)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-surface-container text-accent-ink">
                <Icon name={r.icon} className="h-8 w-8" />
              </div>
              <h3 className="mb-2 font-heading text-xl text-foreground">{t(`${r.key}.title`)}</h3>
              <p className="text-muted-foreground">{t(`${r.key}.text`)}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-center text-sm text-muted-foreground/80">{t('note')}</p>
      </div>
    </section>
  )
}
