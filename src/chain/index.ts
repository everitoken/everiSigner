import Evt from './evt'
import ChainInterface from './ChainInterface'
import StoreProviderInterface from '../store/ProviderInterface'

class ChainApi {
  private chains: ChainInterface[]
  constructor(storeProvider: StoreProviderInterface, network: {}) {
    this.chains = [new Evt(storeProvider, network)]
  }
  getSupportedChains = () => this.chains.map(chain => chain.getName())

  getChain = (chainName: string) => {
    const chain = this.chains.find(c => c.getName() === chainName)
    if (chain) {
      return Promise.resolve(chain)
    }
    return Promise.reject(`Chain "${chainName}" is not supported.`)
  }
}

export default ChainApi
