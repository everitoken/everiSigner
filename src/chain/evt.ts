import ChainInterface from './ChainInterface'
import StoreProviderInterface from '../store/ProviderInterface'

class Evt implements ChainInterface {
  storeProvider: StoreProviderInterface
  constructor(storeProvider: StoreProviderInterface) {
    this.storeProvider = storeProvider
  }
  getName = () => 'everitoken'
  generateSeedPrivateKey = () => {
    // get seed
    return 'seed'
  }
  getPublicKeyFromPrivateKey = (publicKey: string) => {
    return `publicKey ${publicKey}`
  }

  randomPrivateKey = () => {
    return 'random'
  }

  signHashByPublicKey = (hash: string, publicKey: string) => {
    return `signed ${hash} - ${publicKey}`
  }
}

export default Evt
