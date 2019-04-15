import * as bcrypt from 'bcryptjs'
import * as bip39 from 'bip39'
import englishWords from '../asset/wordlist/english'
import ChineseSimplifiedWords from '../asset/wordlist/chinese_simplified'
import { AccountStateType } from '../store/reducer/accounts'
import * as sjcl from 'sjcl'

type SupportedWordlist = 'english' | 'chinese_simplified'

const wordlists: { [key in SupportedWordlist]: string[] } = {
  chinese_simplified: ChineseSimplifiedWords,
  english: englishWords,
}

export const isPasswordValid = (password?: string, passwordRepeat?: string) => {
  if (!password || !passwordRepeat) {
    return {
      success: false,
      payload: 'Password can not be empty',
    }
  }

  if (password.length < 8) {
    return {
      success: false,
      payload: 'Password needs to be at least 8 chars.',
    }
  }

  if (password !== passwordRepeat) {
    return {
      success: false,
      payload: "Passwords don't match, please check again.",
    }
  }
  return {
    success: true,
    payload: null,
  }
}

export const hashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

export const verifyPassword = (password: string, hash: string): boolean =>
  bcrypt.compareSync(password, hash)

export const encrypt = (password: string, payload: string): string => {
  const { iv, salt, ct } = JSON.parse(
    sjcl.encrypt(password, payload, { mode: 'gcm' })
  )

  return JSON.stringify({ iv, salt, ct })
}

export const decrypt = (password: string, raw: string) => {
  const payload = JSON.stringify(
    Object.assign(JSON.parse(raw), { mode: 'gcm' })
  )

  try {
    return {
      success: true,
      data: sjcl.decrypt(password, payload),
    }
  } catch (e) {
    return {
      success: false,
      data: e.message,
    }
  }
}

export const sha256 = (input: string): string => {
  return sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(input))
}

export const generateMnemonicWords = (
  password: string,
  wordlist: SupportedWordlist
): string => {
  const digest = sha256(hashPassword(password))
  return bip39.entropyToMnemonic(digest, wordlists[wordlist])
}

export const mnemonicToSeed = (words: string) =>
  bip39.mnemonicToSeedSync(words, '')

export const encryptAccount = (
  password: string,
  account: AccountStateType
): AccountStateType => ({
  ...account,
  words: encrypt(password, account.words),
  privateKey: encrypt(password, account.privateKey),
})

export const decryptAccount = (
  password: string,
  account: AccountStateType
): AccountStateType => {
  const wordsDecrypted = decrypt(password, account.words)
  const privateKeyDecrypted = decrypt(password, account.privateKey)

  return {
    ...account,
    words: wordsDecrypted.success ? wordsDecrypted.data : '',
    privateKey: privateKeyDecrypted.success ? wordsDecrypted.data : '',
  }
}
