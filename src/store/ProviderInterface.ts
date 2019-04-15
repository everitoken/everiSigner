import { AppState } from './reducer'
import { AccountStateType } from './reducer/accounts'
import { Store } from 'redux'

export default interface StoreProviderInterface {
  readonly store: Store<AppState>
  getAccountByPublicKey(publicKey: string): Promise<AccountStateType>
  getAccountByAccountId(id: string): Promise<AccountStateType>
  getDefaultAccount(): Promise<AccountStateType>
  getPrivateKeyByPublicKey(publicKey: string): Promise<string>
  getSeedByAccountId(id: string): Promise<string>
}
