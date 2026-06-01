'use client'

import { sendEnquiry, type EnquiryState } from '@/app/actions/enquiry'
import { useTranslations } from 'next-intl'
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

const initial: EnquiryState = { ok: false }

export function EnquiryForm() {
  const t = useTranslations('form')
  const [state, formAction] = useActionState(sendEnquiry, initial)

  const inputClass =
    'w-full border-0 border-b border-outline bg-transparent px-0 py-2 text-foreground transition-colors focus:border-accent focus:outline-none focus:ring-0'
  const labelClass = 'label-eyebrow mb-2 block text-muted-foreground'

  if (state.ok) {
    return (
      <div className="rounded border border-white/20 bg-surface/95 p-8 text-center shadow-[var(--shadow-float)] backdrop-blur-sm">
        <p className="font-heading text-xl text-primary">{t('success')}</p>
      </div>
    )
  }

  return (
    <form
      action={formAction}
      className="rounded border border-white/20 bg-surface/95 p-8 shadow-[var(--shadow-float)] backdrop-blur-sm"
    >
      <p className="label-eyebrow mb-6 text-accent-ink">{t('eyebrow')}</p>

      {/* Honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="space-y-6">
        <div>
          <label htmlFor="email" className={labelClass}>{t('email')}</label>
          <input id="email" name="email" type="email" required placeholder={t('emailPlaceholder')} className={inputClass} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="checkIn" className={labelClass}>{t('checkIn')}</label>
            <input id="checkIn" name="checkIn" type="date" className={inputClass} />
          </div>
          <div>
            <label htmlFor="checkOut" className={labelClass}>{t('checkOut')}</label>
            <input id="checkOut" name="checkOut" type="date" className={inputClass} />
          </div>
        </div>
        <div>
          <label htmlFor="message" className={labelClass}>{t('message')}</label>
          <textarea id="message" name="message" rows={2} placeholder={t('messagePlaceholder')} className={`${inputClass} resize-none`} />
        </div>
      </div>

      {state.error && (
        <p className="mt-4 text-sm text-[var(--error)]" role="alert">
          {state.error === 'invalidEmail' ? t('invalidEmail') : t('error')}
        </p>
      )}

      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const t = useTranslations('form')
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-6 w-full rounded bg-primary py-4 text-white transition-colors hover:bg-primary-dark disabled:opacity-60 label-eyebrow tracking-[0.15em]"
    >
      {pending ? t('sending') : t('submit')}
    </button>
  )
}
