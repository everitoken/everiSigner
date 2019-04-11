import { AppState } from './reducer'
import StoreProviderInterface from './ProviderInterface'

class StoreProvider implements StoreProviderInterface {
  state: AppState
  constructor(state: AppState) {
    this.state = state
  }

  getPrivateKeyByPublicKey = (publicKey: string) => Promise.resolve(publicKey)
}

export default StoreProvider
