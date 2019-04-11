import ChainInterface from './ChainInterface'
import StoreProviderInterface from '../store/ProviderInterface'

class Evt implements ChainInterface {
  storeProvider: StoreProviderInterface
  constructor(storeProvider: StoreProviderInterface) {
    this.storeProvider = storeProvider
  }
  getName = () => 'everitoken'
}

export default Evt
