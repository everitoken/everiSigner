import StoreProviderInterface from './ProviderInterface'
import {
  getPassword,
  getAccountByPublicKey,
  getAccountById,
  getDefaultAccount,
} from './getter'
import {
  decrypt,
  mnemonicToSeed,
  decryptAccount,
} from '../service/PasswordService'
import { AppState } from './reducer/index'
import { Store } from 'redux'

let provider: null | StoreProvider = null

class StoreProvider implements StoreProviderInterface {
  store: Store<AppState>
  constructor(store: Store<AppState>) {
    this.store = store
  }

  private getPassword = () => {
    const password = getPassword(this.store.getState())

    if (!password) {
      return Promise.reject('Unable to get password to decrypt the app.')
    }

    return Promise.resolve(password)
  }
  getDefaultAccount = async () => {
    const account = getDefaultAccount(this.store.getState())

    if (!account) {
      return Promise.reject('Default account is not found')
    }

    const password = await this.getPassword()

    return Promise.resolve(decryptAccount(password, account))
  }

  getAccountByPublicKey = async (publicKey: string) => {
    const password = await this.getPassword()
    const account = getAccountByPublicKey(this.store.getState(), { publicKey })

    if (!account) {
      return Promise.reject(
        `Account with public key "${publicKey} is not found."`
      )
    }

    return Promise.resolve(decryptAccount(password, account))
  }

  getAccountByAccountId = (id: string) => {
    const account = getAccountById(this.store.getState(), { id })

    if (!account) {
      return Promise.reject(`Account with id "${id} is not found."`)
    }

    return Promise.resolve(account)
  }

  getPrivateKeyByPublicKey = async (publicKey: string) => {
    // get account by public key
    const account = await this.getAccountByPublicKey(publicKey)

    return Promise.resolve(account.privateKey)
  }
  getSeedByAccountId = async (id: string) => {
    // first get the password, there is no password, throw error
    const password = await this.getPassword()

    // get words of account
    const account = await this.getAccountByAccountId(id)

    const { success, data } = decrypt(password, account.words)
    if (!success) {
      return Promise.reject('Unable to decrypt words with password')
    }

    // get seed in hex
    return Promise.resolve(mnemonicToSeed(data).toString('hex'))
  }
}

export default {
  get() {
    return provider
  },

  init(store: Store<AppState>): void {
    provider = new StoreProvider(store)
  },
}
