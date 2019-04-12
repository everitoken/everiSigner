import StoreProviderInterface from '../store/ProviderInterface'

export default interface ChainInterface {
  storeProvider: StoreProviderInterface
  getName(): string
  generateSeedPrivateKey(): string
  getPublicKeyFromPrivateKey(key: string): string
  randomPrivateKey(): string
  signHashByPublicKey(hash: string, publicKey: string): string
}
