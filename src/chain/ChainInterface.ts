import StoreProviderInterface from '../store/ProviderInterface'

export default interface ChainInterface {
  storeProvider: StoreProviderInterface
  getName(): string
}
