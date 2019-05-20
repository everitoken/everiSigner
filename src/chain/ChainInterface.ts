import StoreProviderInterface from '../store/ProviderInterface'

export default interface ChainInterface {
  storeProvider: StoreProviderInterface
  getName(): string
  getVersion(): string
  generateSeedPrivateKey(
    getSeed: (provider: StoreProviderInterface) => Promise<string>
  ): Promise<string>
  getPublicKeyFromPrivateKey(key: string): Promise<string>
  randomPrivateKey(): Promise<string>
  signHash(
    hash: Buffer,
    getPrivateKey: (provider: StoreProviderInterface) => Promise<string>
  ): Promise<string>
  sign(
    data: string,
    getPrivateKey: (provider: StoreProviderInterface) => Promise<string>
  ): Promise<string>
  getBalancesByPublicKey(publicKey: string): Promise<Array<string>>
  getFungibleDetail(id: number): Promise<any>
  setNetwork(network: {}): void
}
