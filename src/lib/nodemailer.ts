import { env } from '@/env'
import { type SendMailOptions, createTransport } from 'nodemailer'

const transporter = createTransport({
  service: 'gmail',
  port: 587,
  secure: false,
  auth: {
    user: env.GMAIL_USER,
    pass: env.GMAIL_PASS,
  },
})

transporter.verify()

export async function sendMail(options: SendMailOptions) {
  const mailOptions = {
    from: `Pizza Stars <${env.GMAIL_USER}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
    ...options,
  }

  const email = await transporter.sendMail(mailOptions)
  return email
}
