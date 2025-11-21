import type { AuthCodesRepository } from '@/repositories/auth-codes-repository'
import type { UsersRepository } from '@/repositories/users-repository'
import { CodeGeneratedRecentlyError } from '../errors/code-generated-recently-error'
import { UserNotExistsError } from '../errors/user-not-exists-error'

import { generateAuthCode } from '@/lib/nanoid'
import { resend } from '@/lib/resend'
import dayjs from 'dayjs'
import { UnableToSendEmailError } from '../errors/unable-to-send-email-error'

interface SendCodeServiceRequest {
  email: string
}

export class SendCodeService {
  constructor(
    private usersRepository: UsersRepository,
    private authCodesRepository: AuthCodesRepository,
  ) {}

  async execute({ email }: SendCodeServiceRequest) {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new UserNotExistsError()
    }

    const lastCodeFromUser = await this.authCodesRepository.getLastCodeByUser(
      user.id,
    )

    const date = dayjs().diff(
      lastCodeFromUser?.createdAt || null,
      'milliseconds',
    )

    const dateInMinutes = date / 1000 / 60
    const isCodeGeneratedInFiveMinutes = dateInMinutes <= 5

    if (isCodeGeneratedInFiveMinutes) {
      throw new CodeGeneratedRecentlyError()
    }

    const code = generateAuthCode({})

    await this.authCodesRepository.create({
      code,
      user: {
        connect: {
          id: user.id,
        },
      },
    })

    const emailSent = await resend.emails.send({
      from: 'Pizza Stars <suporte@pizzastars.com>',
      to: email,
      subject: `Seu código Pizza Stars é ${code}`,
      text: `Aqui está seu código: ${code}`,
      // TODO: improve this email html, put it on a the email folder
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              background-color: #ff6b35;
              color: white;
              padding: 30px;
              text-align: center;
            }
            .content {
              padding: 40px 30px;
              text-align: center;
            }
            .code {
              background-color: #f8f9fa;
              border: 2px dashed #dee2e6;
              border-radius: 6px;
              font-size: 24px;
              font-weight: bold;
              letter-spacing: 4px;
              padding: 20px;
              margin: 30px 0;
              color: #495057;
            }
            .footer {
              background-color: #f8f9fa;
              padding: 20px;
              text-align: center;
              font-size: 14px;
              color: #6c757d;
            }
            .warning {
              background-color: #fff3cd;
              border: 1px solid #ffeaa7;
              border-radius: 4px;
              padding: 15px;
              margin: 20px 0;
              color: #856404;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🍕 Pizza Stars</h1>
              <p>Password Reset Request</p>
            </div>
            <div class="content">
              <h2>Reset Your Password</h2>
              <p>We received a request to reset your password. Use the code below to proceed:</p>

              <div class="code">
                ${code}
              </div>

              <div class="warning">
                ⚠️ This code will expire in 30 minutes for security reasons.
              </div>

              <p>If you didn't request this password reset, please ignore this email or contact our support team.</p>
            </div>
            <div class="footer">
              <p>© 2025 Pizza Stars. All rights reserved.</p>
              <p>This is an automated message, please do not reply.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (emailSent.error) {
      throw new UnableToSendEmailError()
    }

    return { messageId: emailSent.data.id }
  }
}
