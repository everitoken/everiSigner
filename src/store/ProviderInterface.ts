import { AppState } from './reducer'

export default interface StoreProviderInterface {
  readonly state: AppState
  getPrivateKeyByPublicKey(publicKey: string): Promise<string>
}
