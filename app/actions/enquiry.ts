'use server'

import { site } from '@/lib/site'
import nodemailer from 'nodemailer'

export type EnquiryState = { ok: boolean; error?: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function sanitize(s: string, max = 500): string {
  return s.replace(/[\r\n\t]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max)
}

/**
 * Hero enquiry form handler. Delivers via Brevo SMTP (nodemailer) — same setup
 * as autoskola-ezra. Recipient = ENQUIRY_TO (defaults to the site email,
 * sb.dejan@gmail.com). MAIL_FROM must be a Brevo-verified sender and is kept
 * distinct from SMTP_USER (Brevo's login is a service identity, not a sender).
 *
 * Production env (set on Vercel before the form delivers):
 *   SMTP_HOST=smtp-relay.brevo.com  SMTP_PORT=465
 *   SMTP_USER=<account>@smtp-brevo.com  SMTP_PASS=<Brevo SMTP key>
 *   MAIL_FROM=noreply@apartmanstrong.hr  ENQUIRY_TO=sb.dejan@gmail.com
 * Without SMTP_HOST the action dry-runs (logs + returns ok) — safe for staging.
 */
export async function sendEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  // Honeypot — bots fill this hidden field; drop silently with fake success.
  if (String(formData.get('company') ?? '').trim() !== '') return { ok: true }

  const email = sanitize(String(formData.get('email') ?? ''), 200)
  const checkIn = sanitize(String(formData.get('checkIn') ?? ''), 20)
  const checkOut = sanitize(String(formData.get('checkOut') ?? ''), 20)
  const message = sanitize(String(formData.get('message') ?? ''), 1500)

  if (!EMAIL_RE.test(email)) return { ok: false, error: 'invalidEmail' }

  const recipient = process.env.ENQUIRY_TO ?? site.email
  const fromAddr = process.env.MAIL_FROM ?? process.env.SMTP_USER ?? 'noreply@apartmanstrong.hr'

  const textBody = [
    `Novi upit s web stranice — Apartman Strong`,
    `------------------------------------------`,
    `Email gosta:  ${email}`,
    `Dolazak:      ${checkIn || '—'}`,
    `Odlazak:      ${checkOut || '—'}`,
    ``,
    `Poruka:`,
    message || '—',
  ].join('\n')

  // Dev / no-SMTP: log and succeed (safe for staging/QA).
  if (process.env.NODE_ENV !== 'production' || !process.env.SMTP_HOST) {
    console.log('[enquiry] (dry-run) message body:\n' + textBody)
    return { ok: true }
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: true,
      auth: {
        user: process.env.SMTP_USER ?? '',
        pass: (process.env.SMTP_PASS ?? '').replace(/\\(.)/g, '$1'),
      },
    })

    await transporter.sendMail({
      from: `"Apartman Strong — web" <${fromAddr}>`,
      to: recipient,
      replyTo: email,
      subject: `Upit za rezervaciju — ${checkIn || '?'} → ${checkOut || '?'}`,
      text: textBody,
    })

    return { ok: true }
  } catch (err) {
    console.error('[enquiry] sendMail error:', err)
    return { ok: false, error: 'error' }
  }
}
