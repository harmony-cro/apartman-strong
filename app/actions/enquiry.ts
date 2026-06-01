'use server'

import { site } from '@/lib/site'

export type EnquiryState = { ok: boolean; error?: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Hero enquiry form handler. Delivers to CONTACT_TO (defaults to the site
 * email). Uses the Resend HTTP API when RESEND_API_KEY is set; otherwise logs
 * to the server (staging fallback) and still returns ok so the UX can be tested.
 * SMTP/provider wiring is finalised by the `smtp-setup` skill.
 */
export async function sendEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const email = String(formData.get('email') ?? '').trim()
  const checkIn = String(formData.get('checkIn') ?? '').trim()
  const checkOut = String(formData.get('checkOut') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()
  // Honeypot — bots fill this hidden field.
  if (String(formData.get('company') ?? '').trim() !== '') return { ok: true }

  if (!EMAIL_RE.test(email)) return { ok: false, error: 'invalidEmail' }

  const to = process.env.CONTACT_TO || site.email
  const from = process.env.CONTACT_FROM || `Apartman Strong <noreply@apartmanstrong.hr>`
  const apiKey = process.env.RESEND_API_KEY

  const text = [
    `Novi upit s web stranice Apartman Strong`,
    ``,
    `Email gosta: ${email}`,
    `Dolazak: ${checkIn || '—'}`,
    `Odlazak: ${checkOut || '—'}`,
    ``,
    `Poruka:`,
    message || '—',
  ].join('\n')

  if (!apiKey) {
    console.warn('[enquiry] RESEND_API_KEY not set — enquiry not emailed:', { email, checkIn, checkOut })
    return { ok: true }
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Upit za rezervaciju — ${checkIn || '?'} → ${checkOut || '?'}`,
        text,
      }),
    })
    if (!res.ok) {
      console.error('[enquiry] Resend error', res.status, await res.text())
      return { ok: false, error: 'error' }
    }
    return { ok: true }
  } catch (err) {
    console.error('[enquiry] send failed', err)
    return { ok: false, error: 'error' }
  }
}
