import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().min(1000).max(9999).default(3333),
  NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
  JWT_SECRET: z.string(),
  GMAIL_USER: z.string().email(),
  GMAIL_PASS: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
