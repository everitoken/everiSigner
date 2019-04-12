import { AppState } from './reducer'
import StoreProviderInterface from './ProviderInterface'
import { getPassword, getAccountByPublicKey, getAccountById } from './getter'
import { decrypt, mnemonicToSeed } from '../service/PasswordService'
class StoreProvider implements StoreProviderInterface {
  state: AppState
  constructor(state: AppState) {
    this.state = state
  }

  getAccountByPublicKey = (publicKey: string) => {
    const account = getAccountByPublicKey(this.state, { publicKey })

    if (!account) {
      return Promise.reject(
        `Account with public key "${publicKey} is not found."`
      )
    }

    return Promise.resolve(account)
  }

  getAccountByAccountId = (id: string) => {
    const account = getAccountById(this.state, { id })

    if (!account) {
      return Promise.reject(`Account with id "${id} is not found."`)
    }

    return Promise.resolve(account)
  }

  getPrivateKeyByPublicKey = async (publicKey: string) => {
    // first get the password, there is no password, throw error
    const password = getPassword(this.state)

    if (!password) {
      return Promise.reject('Unable to get password to decrypt the app.')
    }

    try {
      // get account by public key
      const account = await this.getAccountByPublicKey(publicKey)

      // decrypt with password
      const { success, data } = decrypt(password, account.privateKey)

      if (!success) {
        return Promise.reject('unable to decrypt private key with password')
      }

      return Promise.resolve(data)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  getSeedByAccountId = async (id: string) => {
    // first get the password, there is no password, throw error
    const password = getPassword(this.state)

    if (!password) {
      return Promise.reject('Unable to get password to decrypt the app.')
    }

    try {
      // get words of account
      const account = await this.getAccountByAccountId(id)

      const { success, data } = decrypt(password, account.words)
      if (!success) {
        return Promise.reject('Unable to decrypt words with password')
      }

      // get seed in hex
      return Promise.resolve(mnemonicToSeed(data).toString('hex'))
    } catch (err) {
      return Promise.reject('error')
    }
  }
}

export default StoreProvider
