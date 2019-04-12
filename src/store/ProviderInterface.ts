import { AppState } from './reducer'
import { AccountStateType } from './reducer/accounts'

export default interface StoreProviderInterface {
  readonly state: AppState
  getAccountByPublicKey(publicKey: string): Promise<AccountStateType>
  getAccountByAccountId(id: string): Promise<AccountStateType>
  getPrivateKeyByPublicKey(publicKey: string): Promise<string>
  getSeedByAccountId(id: string): Promise<string>
}
