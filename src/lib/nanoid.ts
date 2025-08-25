import { customAlphabet } from 'nanoid'

const defaultAlphabet = '123456789'
const defaultLength = 6

interface generateAuthCodeParams {
  alphabet?: string
  length?: number
}

export function generateAuthCode({
  alphabet = defaultAlphabet,
  length = defaultLength,
}: generateAuthCodeParams) {
  const code = customAlphabet(alphabet, length)()
  return Number.parseInt(code)
}
